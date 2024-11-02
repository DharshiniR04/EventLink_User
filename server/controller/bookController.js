const Book = require('../models/book');
const Users = require('../models/users');
const { sendEventBookConfirmationEmail } = require('../services/emailService');

const bookEvent = async (req, res) => {
    const { data } = req.body;

    try {
        if (!data) {
            return res.status(400).json({ message: "No data provided" });
        }

        let recipients = data.events?.teammembers?.map((member) => {
            return member.email;
        });
        recipients.push(data.email);
        const nonExistentUsers = [];
        for (const email of recipients) {
            const user = await Users.findOne({ email });
            if (!user) {
                nonExistentUsers.push(email);
            }
        }

        if (nonExistentUsers.length > 0) {
            return res.status(200).json({ message: "Users does not exist", emails: nonExistentUsers.join(", ") });
        }

        const userExist = await Book.findOne({ email: data.email, registereddepartment: data.registereddepartment });

        if (userExist) {

            const events = userExist.events || [];
            for (const event of events) {
                if (event.eventname === data.events.eventname) {
                    return res.status(200).json({ message: "Already Booked" });
                }
            }
            events.push(data.events);

            const newData = {
                name: data.name,
                email: data.email,
                college: data.college,
                image: data.image,
                events: events
            };

            await Book.updateOne({ email: data.email }, { $set: newData });
        } else {
            await Book.insertMany(data);
        }
        recipients = (recipients.length === 0) ? data.email : recipients;
        await sendEventBookConfirmationEmail(recipients, data.name, data.email, data.events.eventname);
        res.status(200).json({ message: "Event booked successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getBookedEvent = async (req, res) => {
    const { email } = req.query;
    try {
        const bookedEvents = await Book.find({ email });
        const notPayedEvents = bookedEvents.filter(data => data.paymentstatus === "Not Done");
        const PayedEvents = bookedEvents.filter(data => data.paymentstatus === "Done");
        res.status(200).json({ message: "Booked event fetched successfully", notPayedevents: notPayedEvents, payedEvents: PayedEvents });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}


const deleteBookedEvent = async (req, res) => {
    const { email, eventname, registereddepartment } = req.query;

    try {
        const user = await Book.findOne({ email, registereddepartment });

        if (!user) {
            return res.status(404).json({ message: 'Event not found' });
        }
        const eventToDelete = user.events.find(event => event.eventname === eventname);

        if (!eventToDelete) {
            return res.status(404).json({ message: 'Event not found' });
        }

        user.events = user.events.filter(event => event.eventname !== eventname);

        await user.save();

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { bookEvent, getBookedEvent, deleteBookedEvent };

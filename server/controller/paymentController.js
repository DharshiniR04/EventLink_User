const Book = require('../models/book');
const bcrypt = require('bcrypt');

const getPaymentDetail = async (req, res) => {
    const { email } = req.query;

    try {
        const user = await Book.find({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const departmentEvent = user
            .filter(data => data.paymentstatus === "Not Done")
            .flatMap(data => data.events || []);


        const departmentEvents = departmentEvent.reduce((acc, event) => {

            if (!acc[event.eventdepartment]) {
                acc[event.eventdepartment] = {
                    technical: [],
                    nonTechnical: [],
                    workshop: [],
                    totalCost: 0
                };
            }
            if (event.category === 'technical') {
                acc[event.eventdepartment].technical.push(event);
            } else if (event.category === 'non-technical') {
                acc[event.eventdepartment].nonTechnical.push(event);
            } else if (event.category === 'workshop') {
                acc[event.eventdepartment].workshop.push(event);
            }

            return acc;
        }, {});

        for (let department in departmentEvents) {
            const categories = departmentEvents[department];

            const joinedCategories = [
                categories.technical.length > 0,
                categories.nonTechnical.length > 0,
                categories.workshop.length > 0
            ].filter(Boolean).length;

            if (joinedCategories === 1) {
                departmentEvents[department].totalCost = 150;
            } else if (joinedCategories === 2) {
                departmentEvents[department].totalCost = 250;
            } else if (joinedCategories === 3) {
                departmentEvents[department].totalCost = 400;
            }
        }

        res.status(200).json({
            message: 'Payment Detail',
            departmentPayments: departmentEvents
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const storePayment = async (req, res) => {
    const { data, email, department, timestamp } = req.body;

    try {
        const user = await Book.findOne({ email: email, registereddepartment: department });
        if (user.paymentstatus === "Done") {
            return res.status(200).json({ message: 'Payment Already Done' });
        }
        const hashedData = await bcrypt.hash(data + email + timestamp, 10);
        await user.updateOne({ $set: { paymentstatus: "Done", paymentqr: hashedData } })

        res.json({ message: "Payment Detail Stored Successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const getPayedEvents = async (req, res) => {
    const { email } = req.query;
    try {
        const bookedEvents = await Book.find({ email });
        const PayedEvents = bookedEvents.filter(data => data.paymentstatus === "Done");
        res.status(200).json({ message: "Booked event fetched successfully", events: PayedEvents });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const fetchQR=async(req,res)=>{
    const{email}=req.query;
    try{
        const bookedEvents = await Book.find({ email });
        const PayedEventsQR = bookedEvents.filter(data => data.paymentstatus === "Done");
         res.status(200).json({ message: "QR fetched successfully", events: PayedEventsQR });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = { getPaymentDetail, storePayment, getPayedEvents ,fetchQR};

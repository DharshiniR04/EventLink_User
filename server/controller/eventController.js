const Event = require('../models/event');

const getEvents = async (req, res) => {
    const { event } = req.query;
    const eve = event.toLowerCase();

    try {
        const events = await Event.find({ category: eve });
        res.status(200).json({ message: "Event detail fetched Succesfully", event: events });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({ message: "Event detail fetched Succesfully", event: events });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}



module.exports = { getEvents, getAllEvents };
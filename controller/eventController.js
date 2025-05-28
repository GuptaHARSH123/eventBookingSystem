const Event = require("../models/Event")
const createEvnet = async(req , res)=>{
    try{
          const { title, description, dateTime, location, totalSeats } = req.body;

    const newEvent = new Event({
      title,
      description,
      dateTime,
      location,
      totalSeats,
      availableSeats: totalSeats
    });

    await newEvent.save();
    res.status(201).json(newEvent);
    }
    catch(err){
        res.status(400).send({
            message:err.message
        })

    }


}

const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
}

module.exports = {
   createEvnet,
    deleteEvent,
    getAllEvents
}
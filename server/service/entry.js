const Staff = require('../models/staff'); 
const User = require('../models/user'); 
const Event = require('../models/event'); 
const Booking = require('../models/Booking');

async function getTotalStaff() {
  try {
    const count = await Staff.countDocuments();
    return count
  } catch (err) {
    console.error('Error counting documents:', err);
  }
}

async function getTotalUsers() {
    try {
      const count = await User.countDocuments();
      return count
    } catch (err) {
      console.error('Error counting documents:', err);
    }
  }

  async function getTotalEvents() {
    try {
      const count = await Event.countDocuments();
      return count
    } catch (err) {
      console.error('Error counting documents:', err);
    }
  }

  async function remaningSeats(name){
    const event = Event.find({evName:name})
    const totalSeat = await event.countDocuments();
    const bookings = Event.find({event:name});
    const ocupied = await bookings.countDocuments();
    return totalSeat-ocupied;
  }

module.exports={
    getTotalStaff,
    getTotalUsers,
    getTotalEvents,
    remaningSeats,
}


const { Meeting, Room, Document, Agenda, User } = require('../models');

exports.createMeeting = async (req, res) => {
  try {
    const { title, date, time, location, roomId, notes, status_name, is_publish } = req.body;
    const user = await User.findByPk(req.decoded.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const newMeeting = await Meeting.create({ title, date, time, location, notes, status_name, is_publish });
    const room = await Room.findByPk(roomId);
    await newMeeting.setRoom(room);
    res.status(201).json({ message: 'Meeting created successfully', data: newMeeting });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateMeeting = async (req, res) => {
  try {
    const meetingId = req.params.id;
    const { title, date, time, location, roomId, notes, status_name, is_publish } = req.body;
    const meeting = await Meeting.findByPk(meetingId);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    const user = await User.findByPk(req.decoded.id);
    if (user.role !== 'admin' && user.id !== meeting.created_by) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    meeting.title = title || meeting.title;
    meeting.date = date || meeting.date;
    meeting.start_time = start_time || meeting.start_time;
    meeting.end_time = end_time || meeting.end_time;
    meeting.location = location || meeting.location;
    meeting.notes = notes || meeting.notes;
    meeting.status_name = status_name || meeting.status_name;
    meeting.is_publish = is_publish || meeting.is_publish;
    const room = await Room.findByPk(roomId);
    await meeting.setRoom(room);
    await meeting.save();
    res.status(200).json({ message: 'Meeting updated successfully', data: meeting });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteMeeting = async (req, res) => {
  try {
    const meetingId = req.params.id;
    const meeting = await Meeting.findByPk(meetingId);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }
    const user = await User.findByPk(req.decoded.id);
    if (user.role !== 'admin' && user.id !== meeting.created_by) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await meeting.destroy();
    res.status(200).json({ message: 'Meeting deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
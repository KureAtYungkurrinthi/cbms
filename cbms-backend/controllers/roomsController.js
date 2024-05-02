const Room = require('../models/Room');

const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.findAll({
            attributes: {exclude: ['createdAt', 'updatedAt']}
        });
        if (rooms.length > 0) {
            return res.json(rooms);
        } else {
            return res.status(404).json({message: 'No rooms found'});
        }
    } catch (error) {
        console.error('Error fetching rooms:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

const getRoomById = async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id);
        if (room) {
            return res.json(room);
        } else {
            return res.status(404).json({message: 'Room not found'});
        }
    } catch (error) {
        console.error('Error fetching room by ID:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

const createRoom = async (req, res) => {
    try {
        const {name, location, capacity} = req.body;
        if (!name || !location || !capacity) return res.status(400).json({message: 'Name, location and capacity are required'});
        if (req.decoded.role !== 'admin') return res.status(403).json({message: 'Only admins can create rooms'});

        const [room, created] = await Room.findOrCreate({
            where: {name: name}, defaults: {location: location, capacity: capacity}
        });
        if (!created) return res.status(409).json({message: 'Room name is already registered'});

        return res.status(201).json(room);
    } catch (error) {
        console.error('Error creating room:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

const updateRoom = async (req, res) => {
    try {
        const {name, location, capacity} = req.body;
        if (!name && !location && !capacity) return res.status(400).json({message: 'Name, location or capacity is required'});
        if (req.decoded.role !== 'admin') return res.status(403).json({message: 'Only admins can update room details'});

        const room = await Room.findByPk(req.params.id);
        if (!room) return res.status(404).json({message: 'Room not found'});

        if (name) room.name = name;
        if (location) room.location = location;
        if (capacity) room.capacity = capacity;
        await room.save();

        return res.json(room);
    } catch (error) {
        console.error('Error updating room:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

const deleteRoom = async (req, res) => {
    try {
        if (req.decoded.role !== 'admin') return res.status(403).json({message: 'Only admins can delete rooms'});
        const room = await Room.findByPk(req.params.id);
        if (!room) return res.status(404).json({message: 'Room not found'});

        // Delete the room
        await room.destroy();
        return res.json(room);
    } catch (error) {
        console.error('Error deleting room:', error);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};

module.exports = {getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom};
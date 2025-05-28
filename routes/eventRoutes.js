 
const express = require('express');

const router = express.Router();
 const {
    createEvnet,
    deleteEvent,
    getAllEvents
 } = require('../controller/eventController');
const { isAdmin } = require('../middleware/authMiddleware');

router.get('/', getAllEvents);

 
router.post('/', isAdmin, createEvnet);

router.delete('/:id', isAdmin, deleteEvent);


module.exports = router;

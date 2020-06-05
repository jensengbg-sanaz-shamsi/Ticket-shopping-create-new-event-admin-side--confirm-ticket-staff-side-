const { Router } = require('express');
const router = new Router();


const { admin } = require('../middleware/auth');
const { getAllEvents, addEvent } = require('../models/db-functions');



router.get('/admin', admin, (req, res) => {
    res.send(JSON.stringify({ success: true, message: 'Admin account!'}));
});


router.get('/showevents', async (req, res) => {
    let resObj = {
        success: false
    }
    
    const events = await getAllEvents();
    
    if (events) {
        resObj.success = true;
        resObj.events = events;
    }
    
    res.send(JSON.stringify(resObj));
});


router.post('/addevent', async (req, res) => {
    const body = req.body;

    let createEvent = await addEvent(body);

    let resObj = {
        success: false
    }
    
    if (createEvent) {
        resObj.success = true;
        resObj.createEvent = createEvent
    }

    res.send(JSON.stringify(resObj));
});


module.exports = router;
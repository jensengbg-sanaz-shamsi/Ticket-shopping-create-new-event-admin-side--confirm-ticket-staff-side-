const { Router } = require('express');
const router = new Router();
const { getAllEvents } = require('../models/db-functions');

router.get('/getAllEvents', async (req, res) => {
    let resObj = {
        success: false
    }
    const events = await getAllEvents();
    if (events) {
        resObj.success = true;
        resObj.events = events
    }
    res.send(JSON.stringify(resObj));
});

module.exports = router;    
const { Router } = require('express');
const router = new Router();
const { getEventById } = require('../models/db-functions');

router.get('/:id', async (req, res) => {
    event = await getEventById(req.params.id);

    let resObj = {
        success: true,
        event: event,
    }

    res.send(JSON.stringify(resObj));
});

module.exports = router;
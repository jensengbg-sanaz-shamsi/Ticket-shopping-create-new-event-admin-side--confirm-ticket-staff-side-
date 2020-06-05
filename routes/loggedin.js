const jwt = require('jsonwebtoken');
const { Router } = require('express');
const router = new Router();

const { getUserName } = require('../models/db-functions');
const { matchPassword } = require('../models/db-functions');

//Check if the user is valid to login
router.post('/login', async (req, res) => {
    const body = req.body;

    const resObj = {
        success: false
    }
    
    const user = await getUserName(body);
    const match = await matchPassword(body.password, user.password);

    if (user && match) {
        const token = jwt.sign({ uuid: user.uuid }, 'hf7hTbdk', {
            expiresIn: 600,
        });

        resObj.success = true;
        resObj.token = token;
        resObj.role = user.role;
    } 

    res.send(JSON.stringify(resObj));
});

//Save a token when the user logges
router.get('/loggedin', async (req, res) => {
    const token = req.header('Authorization').replace('Bearer', '');

    let resObj = {
        loggedIn: false
    }

    if (token !== 'null') {
        const user = jwt.verify(token, 'hf7hTbdk');

        if (user) {
            resObj.loggedIn = true;
            resObj.user = user;
        }
    }
    res.send(JSON.stringify(resObj));
});

module.exports = router;
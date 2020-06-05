const { Router } = require('express');
const router = new Router();

const { staff } = require('../middleware/auth');

router.get('/staff', staff, (req, res) => {
    let resObj = {
        user: req.user.username,
        role: req.user.role,
        success: true
    }

    res.send(JSON.stringify(resObj));
});

router.get('/verify', async (req, res) => {

});


module.exports = router;
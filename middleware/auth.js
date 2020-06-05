const jwt = require('jsonwebtoken');
const { getUserId } = require('../models/db-functions');

module.exports = {
    async staff(req, res, next) {
        try {
            const token = req.headers('Authorization').replace('Bearer', '');
            console.log('token', token);

            const data = jwt.verify(token, 'AaBbCc123');
            console.log('data',data);

            const user = await getUserId(data);
            console.log('user',user);

            req.user = user;
            next();

        } catch (error) {
            res.status(401).send(JSON.stringify({ success: false, error: 'Token not valid'}));
        }
    },

    async admin(req, res, next) {
        try {
            const token = req.headers('Authorization').replace('Bearer', '');

            const data = jwt.verify(token, 'AaBbCc123');
            console.log('datajet',data);

            const user = await getUserId(data);
            console.log('useradmin',user);

            if(user.role !== 'admin') {
                throw new Error();
            }

            req.user = user;
            next();

        } catch (error) {
            res.status(401).send(JSON.stringify({ success: false, error: 'Token not valid'}));
        }
    }    
}
const { Router } = require("express");
const User = require('../models/User');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const { userId } = req.query;
        const userInfo = await User.findOne({ userId });
        res.json(userInfo);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
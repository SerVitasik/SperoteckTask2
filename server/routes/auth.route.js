const { Router } = require("express");
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
// const { createCheckSchema } = require("express-validator/src/middlewares/schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = Router();

router.post('/registration',
    [
        check('username', 'Empty username').notEmpty(),
        check('email', 'Invalid email').isEmail(),
        check('password', 'Invalid password').trim().isLength({ min: 8 }).matches(/[A-Z]/).matches(/\d/)
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array(), message: "Invalid data" });
            }
            const { username, email, password } = req.body;

            const isUsedEmail = await User.findOne({ email });
            const isUsedUsername = await User.findOne({ username });

            if (isUsedEmail) {
                return res.status(300).json({ message: "This email is already taken" });
            }
            if (isUsedUsername) {
                return res.status(300).json({ message: "This username is already taken" });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({
                username,
                email,
                password: hashedPassword
            });

            await user.save();

            res.status(200).json({ message: "The user was successfully created" })

        } catch (error) {
            console.log(error);
        }
    });

router.post('/login',
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Invalid password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array(), message: "Invalid data" });
            }
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            const isCorrectPassword = bcrypt.compare(password, user.password)

            if (!isCorrectPassword) {
                return res.status(400).json({ message: "Incorrect password" });
            }

            const jwtSecret = 'vitasiks123';

            const token = jwt.sign(
                { userId: user.id },
                jwtSecret,
                { expiresIn: '1h' }
            );

            res.json({ token, userId: user.id });

        } catch (error) {
            console.log(error);
        }
    });
router.get('/', async (req, res) => {
    try {
        const { userId } = req.query;
        const userInfo = await User.findOne({ _id: userId });
        console.log(userInfo);
        res.json(userInfo);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
const express = require('express');
const app = express();
const { DBConnection } = require('./database/db.js');
const User = require('./models/users.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/users');

// Enable CORS for all origins
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST'],
  credentials: true // Allow cookies to be sent
}));

require('dotenv').config();

// Middlewares
app.use('/users', userRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
DBConnection();

app.get("/", (req, res)=>{
    res.send("Welcome to the app!");
})

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];  // Check the authorization header for the token

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).send("Invalid token");
        }
        req.user = user;  // Store user info from token
        next();
    });
};

app.get("/home", (req, res)=>{
    res.send("welcome to home");
})

// registration page
app.post("/register", async (req, res) => {
    console.log('Received registration data:', req.body);
    try {
        const { firstname, lastname, email, password } = req.body;

        if (!firstname || !lastname || !email || !password) {
            console.error('Validation error: Missing required fields');
            return res.status(400).send("Please enter all the required fields");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.error('Validation error: User already exists');
            return res.status(400).send("User already exists!");
        }

        const hashPassword = bcrypt.hashSync(password, 10);
        console.log('Hashed password:', hashPassword);

        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword
        });

        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
            expiresIn: "1hr"
        });
        user.token = token;
        user.password = undefined;

        res.status(201).json({
            message: "You have successfully registered!",
            user,
            token
        });

    } catch (error) {
        console.error('Server error:', error.message);
        res.status(500).send("Internal Server Error");
    }
});

// signin page
app.post("/signin", async (req, res) => {
    try {
        //get all the user data
        const { email, password } = req.body;

        // check that all the data should exists
        if (!(email && password)) {
            return res.status(400).send("Please enter all the information");
        }

        //find the user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not found!");
        }

        //match the password
        const enteredPassword = await bcrypt.compare(password, user.password);
        if (!enteredPassword) {
            return res.status(401).send("Password is incorrect");
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        user.token = token;
        user.password = undefined;

        //store cookies
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true, 
        };

        //send the token
        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged in!",
            success: true,
            token,
        });
    } catch (error) {
        console.log(error.message);
    }
    
});

// Update Phone Number
app.put('/user/phone', authenticateToken, async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) return res.status(400).send('Phone number is required');

        const user = await User.findById(req.user.id);
        user.phone = phone;
        await user.save();

        res.status(200).json({ message: 'Phone number updated successfully!', phone });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Update Address
app.put('/user/address/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { type, value } = req.body;

        const user = await User.findById(req.user.id);
        const address = user.addresses.id(id); // Find address by ID
        if (!address) return res.status(404).send('Address not found');

        address.type = type || address.type; // Update only fields that are passed
        address.value = value || address.value;

        await user.save();
        res.status(200).json({ message: 'Address updated successfully!', address });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

// Delete Address
app.delete('/user/address/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user.id);
        const address = user.addresses.id(id); // Find address by ID
        if (!address) return res.status(404).send('Address not found');

        address.remove(); // Remove the address from the list
        await user.save();

        res.status(200).json({ message: 'Address deleted successfully!' });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const DBConnection = async () => {
    const MONGODB_URL = process.env.MONGODB_URL;
    
    if (!MONGODB_URL) {
        console.error('MONGODB_URL is not defined in the .env file');
        return;
    }

    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB connection established successfully!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        console.error('Error stack:', error.stack);
    }
};

module.exports = { DBConnection };
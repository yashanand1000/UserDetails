const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;
const User = require('./model/user');

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/userDetails', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});


// Routes
app.post('/api/users', async (req, res) => {
    const { name, email, age, place } = req.body;
    
    try {
        let user = await User.findOne({ email });
        

        if (user) {
            user.name = name;
            user.age = age;
            user.place = place;
            await user.save();
            res.send('User details updated successfully');
        } else {
            // Create new user
            user = new User({ name, email, age, place });
            await user.save();
            res.send('User is Created successfully');
        }
    } catch (error) {
        console.error('Error saving user details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

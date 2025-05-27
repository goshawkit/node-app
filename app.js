require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

const mongoose = require('mongoose');
const Contact = require('./models/Contact');

// MongoDB connection string from environment variable
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create new contact document
    const contact = new Contact({
      name,
      email,
      message
    });

    // Save to database
    await contact.save();

    console.log('Contact form data saved:', contact);

    // Send success response
    res.status(200).json({ 
      message: `Thanks, ${name}! We got your message.`,
      success: true 
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ 
      error: 'Failed to save your message. Please try again.',
      success: false 
    });
  }
});

// Route to view all contacts (for testing)
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

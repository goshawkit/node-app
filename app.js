const express = require('express');
const app = express();
const PORT = 3000;

const mongoose = require('mongoose');

// MongoDB connection string - replace with your actual connection string
const MONGODB_URI = 'mongodb+srv://goshawkitteam:jhfrDqANx4jarNHI@cluster0.4b5gxag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  console.log('Contact form data:', req.body);

  res.send(`Thanks, ${name}! We got your message.`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

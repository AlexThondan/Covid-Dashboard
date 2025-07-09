const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files (HTML, CSS, JS) from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Default Route - Redirect to Signup Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Serve Dashboard Page
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// API Routes for Signup and Login
app.use('/api/auth', userRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/covid_dashboard', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// Start Server
const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

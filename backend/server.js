const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const favoritesRouter = require('./routes/favorites');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use('/api/favorites', favoritesRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

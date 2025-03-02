require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());

// Log environment variables
console.log(`MONGO_URI: ${process.env.MONGODB_URI}`);
console.log(`PORT: ${process.env.PORT}`);

const PORT = process.env.PORT || 5000;
console.log(`Server running at http://localhost:${PORT}`);

// Connect to the database
connectDB();

// Routes
app.use("/api/users", require("./routes/userRoutes"));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

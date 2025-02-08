const express = require("express");
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 1234;

const allowedOrigins = [
  "http://localhost:1234",
  "http://localhost:3000",
  "http://localhost:56729",
  // "https://namaste-react-backend-tor8.onrender.com",
  // "https://calm-speculoos-49815c.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "CORS policy does not allow access from this origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Add your API routes here
// Example:
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// Start server
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
});

// Handle server shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server shutting down');
  });
});

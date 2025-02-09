const express = require("express");
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 1234;

<<<<<<< HEAD
// ✅ Allow only specific frontend origins (change as needed)
const allowedOrigins = ["http://localhost:61196", "http://localhost:3000"];
=======
const allowedOrigins = [
  "http://localhost:1234",
  "http://localhost:3000",
  "http://localhost:56729",
  // "https://namaste-react-backend-tor8.onrender.com",
  // "https://calm-speculoos-49815c.netlify.app",
];
>>>>>>> ee890efef48ed030c5247290c08d45a4991eeaf9

app.use(
  cors({
    origin: function (origin, callback) {
<<<<<<< HEAD
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
=======
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "CORS policy does not allow access from this origin.";
        return callback(new Error(msg), false);
>>>>>>> ee890efef48ed030c5247290c08d45a4991eeaf9
      }
    },
    credentials: true,
  })
);

<<<<<<< HEAD
// ✅ Fetch restaurant menu
app.get("/api/menu/:restaurantId", async (req, res) => {
  try {
    const { restaurantId } = req.params;
    console.log("Fetching menu for restaurant:", restaurantId);

    if (!restaurantId) {
      return res.status(400).json({ error: "Missing restaurantId" });
    }

    const swiggyAPI = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.0177989&lng=72.84781199999999&restaurantId=${restaurantId}`;

    const response = await fetch(swiggyAPI, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
      },
    });

    // ✅ If Swiggy API fails, send error
    if (!response.ok) {
      console.error(`Swiggy API error: ${response.status}`);
      return res.status(response.status).json({
        error: `Swiggy API returned status ${response.status}`,
      });
    }

    const text = await response.text(); // ✅ Get response as text
    try {
      const data = JSON.parse(text); // ✅ Parse JSON
      res.json(data);
    } catch (e) {
      console.error("Response was not JSON:", text.substring(0, 200)); // ✅ Log first 200 chars
      throw new Error("Invalid JSON response from Swiggy API");
    }
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({
      error: "Failed to fetch menu",
      details: error.message,
    });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
=======
// Health check route
app.get("/restaurants/:resId", (req, res) => {
   const { resId } = req.params;
    console.log(`Fetching restaurant data for ID: ${resId}`);
  res.send("Server is running");
});

// Add your API routes here
// Example:
app.get("/restaurants/:resId", (req, res) => {
   const { resId } = req.params;
    console.log(`Fetching restaurant data for ID: ${resId}`);
  res.send("Server is running");
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
>>>>>>> ee890efef48ed030c5247290c08d45a4991eeaf9
});

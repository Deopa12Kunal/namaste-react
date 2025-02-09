const express = require("express");
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 1234;

// ✅ Allow only specific frontend origins (change as needed)
const allowedOrigins = ["http://localhost:61196", "http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

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
});

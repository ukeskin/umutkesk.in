require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/bookmarks", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.raindrop.io/rest/v1/raindrops/0?perpage=50",
      {
        headers: {
          Authorization: `Bearer ${process.env.RAINDROP_CLIENT_SECRET}`,
        },
      }
    );
    const data = await response.json();
    res.json(data.items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookmarks" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

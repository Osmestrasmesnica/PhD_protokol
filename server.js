const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // Import the path module

const app = express();

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://WLQ_admin:password1234@wlq.tjsqmzy.mongodb.net/PhD_Aleksa", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Define a schema for the "PhD_protokoli" collection
const protokoliSchema = new mongoose.Schema({
  // Define your schema fields here based on your JSON structure
  fsNumber: String,
    date: Date,
    location: String,
    sublocation1: String,
    sublocation2: String,
    participants: String,
    lighting: String,
    threatFactor: String,
    note: String,
    fsSize: String,
    latitude: Number,
    longitude: Number,
    altitude: Number,
    exposure: String,
    slope: String,
    habitat: String,
    taxa: [
        {
            name: String,
            b: Number,
            p: Number,
            s: String,
        },
    ],
});

// Create a model for the "PhD_protokoli" collection
const Protokol = mongoose.model("PhD_protokoli", protokoliSchema, "protokol");

app.use(express.static());

// Define a route to serve the HTML form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Define a route to handle POST requests with JSON data
app.post("/saveData", async (req, res) => {
  try {
    const formData = req.body; // JSON data from the form

    // Create a new document based on the model and save it to the collection
    const newProtokol = new Protokol(formData);
    const savedData = await newProtokol.save();
    console.log("Data saved successfully:", savedData);
    res.status(200).json({ message: "Data saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error saving data" });
  }
});

// Serve static files (e.g., script.js)
app.use(express.static(__dirname));

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

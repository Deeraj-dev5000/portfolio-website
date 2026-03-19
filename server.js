const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Model
const Message = mongoose.model("Message", {
  name: String,
  email: String,
  message: String
});

// Routes

// Home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Save message
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const newMessage = new Message({ name, email, message });
  await newMessage.save();

  res.json({ success: true });
});

// Get messages
app.get("/messages", async (req, res) => {
  const data = await Message.find().sort({ _id: -1 });
  res.json(data);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
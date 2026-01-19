const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* 🔥 CORS FIX */
app.use(
  cors({
    origin: "https://gentle-gingersnap-adc1ca.netlify.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  })
);

app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const Registration = mongoose.model(
  "Registration",
  new mongoose.Schema({
    collegeName: String,
    email: String,
    sport: String,
    players: Array,
    paymentId: String
  })
);

app.post("/register", async (req, res) => {
  try {
    await Registration.create(req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.get("/", (req, res) => {
  res.send("CPL Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
app.get("/register", (req, res) => {
  res.send("Register endpoint reachable");
});

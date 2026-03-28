const express = require("express");
const app = express();
const mongoose=require("mongoose");
const cors = require("cors");
const Donation = require("./models/Donation");
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("API running ");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
mongoose.connect("mongodb+srv://srivastavaaryan3111_db_user:Aryan123@cluster0.w6awtbp.mongodb.net/donationDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.post("/donate", async (req, res) => {
  try {
    const { name,amount,message} = req.body;

    const donation = await Donation.create({ name,amount,message });

    res.json(donation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/donations", async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const User = require("./models/User");

// Signup
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
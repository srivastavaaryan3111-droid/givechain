const express = require("express");
const app = express();
const mongoose=require("mongoose");
const cors = require("cors");
const bcrypt   = require('bcryptjs');
require('dotenv').config();
const Donation = require("./models/Donation");
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST','PUT','DELETE'],
  credentials: true
}));
app.get("/", (req, res) => {
  res.send("API running ");
});
const NGO = require('./models/NGO');

// NGO Signup (admin creates NGO accounts)
app.post('/ngo-register', async (req, res) => {
  try {
    const { name, email, password, org } = req.body;
    const existing = await NGO.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const ngo = new NGO({ name, email, password: hashed, org, verified: true });
    await ngo.save();
    res.json({ message: 'NGO registered', name: ngo.name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// NGO Login
app.post('/ngo-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const ngo = await NGO.findOne({ email });
    if (!ngo) return res.status(400).json({ error: 'Invalid email or password' });
    const match = await bcrypt.compare(password, ngo.password);
    if (!match) return res.status(400).json({ error: 'Invalid email or password' });
    res.json({ message: 'Login successful', name: ngo.name, email: ngo.email, org: ngo.org });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const User=require('./models/user');
mongoose.connect("mongodb+srv://srivastavaaryan3111_db_user:Aryan123@cluster0.w6awtbp.mongodb.net/donationDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const txnSchema = new mongoose.Schema({
  name:    String,
  campaign: String,
  ngo:      String,
  acct:     String,
  hash:     String,
  amt:      String,
  amount:   Number,
  status:   { type: String, default: 'verified' },
  date:     { type: Date, default: Date.now },
});
const Transaction = mongoose.model('Transaction', txnSchema);
app.get("/transactions", async (req, res) => {
  try {
    const Donation = require("./models/Donation");

    const data = await Donation.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
app.get("/stats", async (req, res) => {
  try {
    const data = await Donation.find();

    const total = data.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );

    const count = data.length;

    const ngos = [...new Set(data.map(item => item.ngo).filter(Boolean))].length;

    res.json({
      total,
      count,
      ngos
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/donate", async (req, res) => {
  try {
    const { name,campaign,ngo,acct,hash,amt,amount,status,message} = req.body;

    const donation = await Donation.create({ 
      name, 
      campaign, 
      ngo, 
      acct, 
      hash, 
      amt, 
      amount, 
      status ,
      message
    });

    res.json(donation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/ngo-stats/:ngo", async (req, res) => {
  try {
    const ngo = req.params.ngo;

    const data = await Donation.find({ ngo });

    const total = data.reduce((sum, d) => sum + Number(d.amount || 0), 0);

    const donors = new Set(data.map(d => d.name)).size;

    res.json({
      total,
      donors,
      count: data.length
    });

  } catch (err) {
    res.status(500).json(err);
  }
});
// Signup
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Save user
    const user = new User({ name, email, password: hashed });
    await user.save();

    res.json({ message: 'Account created successfully', name: user.name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.listen(5000, () => {
  console.log("Server started on port 5000");
});



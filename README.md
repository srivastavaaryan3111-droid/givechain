# GiveChain

A blockchain-based transparent donation platform built using the MERN stack and Ethereum. GiveChain enables users to donate securely through MetaMask while ensuring every donation is publicly verifiable on the Sepolia Ethereum testnet.

## Features

- Secure user authentication
- NGO and donor dashboards
- Create and manage donation campaigns
- Donate using MetaMask wallet
- Smart contracts deployed on Ethereum Sepolia Testnet
- Transparent on-chain transaction verification
- Donation history and campaign tracking
- Responsive user interface

## Tech Stack

### Frontend
- React.js
- Bootstrap
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### Blockchain
- Solidity
- Ethereum (Sepolia Testnet)
- MetaMask
- Ethers.js

---

## Project Structure

```
GiveChain/
│── client/          # React frontend
│── server/          # Express backend
│── README.md
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/srivastavaaryan3111-droid/givechain.git
cd givechain
```

### Backend Setup

```bash
cd server
npm install
npm start
```

### Frontend Setup

```bash
cd client
npm install
npm start
```

---

## Environment Variables

Create a `.env` file inside the server folder.

Example:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

## Screenshots

Add screenshots of:

- Home Page
- Login / Signup
- Campaign Listing
- Donation Page
- MetaMask Transaction Popup
- Transaction History
- NGO Dashboard

Store them inside a `screenshots/` folder and reference them here.

---

## Future Improvements

- Razorpay integration
- Donation analytics dashboard
- NFT-based donation certificates
- Email notifications
- Multi-chain support

---

## Author

**Aryan Srivastava**
- GitHub: https://github.com/srivastavaaryan3111-droid

---

## License

This project is developed for educational and learning purposes.

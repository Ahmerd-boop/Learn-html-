require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET;

// Verify Payment
app.post('/verify-payment', async (req, res) => {
    const { reference } = req.body;

    try {
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` }
        });

        if (response.data.data.status === 'success') {
            return res.json({ success: true, message: "Payment verified successfully" });
        } else {
            return res.json({ success: false, message: "Payment failed" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error verifying payment" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
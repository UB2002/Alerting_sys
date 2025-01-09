const express = require('express');
const monitorRequests = require('../monitorRequests');
const FailedRequest = require('../Model/failrequest');
const IPTracking = require('../Model/IPTracking');

const router = express.Router();

// welcom message
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

// monitoring submit request 
router.post('/submit', monitorRequests, (req, res) => {
  res.status(200).json({ message: 'Request submitted successfully' });
});

// fetch all failed requests
router.get('/metrics/requests', async (req, res) => {
  const logs = await FailedRequest.find().sort({ timestamp: -1 });
  res.json(logs);
});

// fetch IP tracking metrics
router.get('/metrics/ip', async (req, res) => {
  const ipMetrics = await IPTracking.find().sort({ failedCount: -1 });
  res.json(ipMetrics);
});

module.exports = router;

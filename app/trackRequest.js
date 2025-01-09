const IPTracking = require('./Model/IPTracking');
const sendAlert = require('./SendMail/mail');

const trackFailedRequest = async (ip) => {
  const threshold = parseInt(process.env.ALERT_THRESHOLD, 10);
  const windowDuration = parseInt(process.env.WINDOW_DURATION, 10) * 60 * 1000;

  const now = new Date();
  
  const record = await IPTracking.findOne({ sourceIP: ip });

  if (!record) {
    // Create a new record for the IP
    await IPTracking.create({ sourceIP: ip, failedCount: 1, firstFailedAt: now });
  } else {
    const timeElapsed = now - record.firstFailedAt;

    if (timeElapsed > windowDuration) {
      // Reset the counter if the window has expired
      record.failedCount = 1;
      record.firstFailedAt = now;
    } else {
      // Increment the failed count
      record.failedCount += 1;
    }

    await record.save();

    // Trigger an alert if the threshold is breached
    if (record.failedCount >= threshold) {
      sendAlert('udaybhaskar0532@gmail.com', ip);
      console.log(`Alert: IP ${ip} has exceeded the failed request limit`);
    }
  }
};

module.exports = trackFailedRequest;

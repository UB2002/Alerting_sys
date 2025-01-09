const FailRequest = require('./Model/failrequest');
const trackFailedRequest = require('./trackRequest');

const monitorRequests = async (req, res, next) => {
    const token = req.headers['access-token'];
    const ip = req.ip;
    if (!token) {  
        await FailRequest.create({
            sourceIP: ip,
            timestamp: new Date(),
            reason: 'Missing token'
        });

        await trackFailedRequest(ip);
        console.log('res.status(401).json({ message: Access token is required})');
        return res.status(401).json({ message: 'Access token is required'});
    }

    // const contentType = req.headers['content-type'];
    //     if (!contentType) {
    //         // Log the failed request for missing Content-Type
    //         await FailRequest.create({
    //             sourceIP: ip,
    //             timestamp: new Date(),
    //             reason: 'Missing Content-Type header'
    //         });

    //         await trackFailedRequest(ip);

    //         return res.status(400).json({ message: 'Content-Type header is required' });
    //     }
    if (!token || token !== 'valid-token'){

        await FailRequest.create({
            sourceIP: ip,
            timestamp: new Date(),
            reason: 'Invalid token'
        });

        await trackFailedRequest(ip);
        return res.status(401).json({ message: 'Invalid access token'});
    }
    next();
};

module.exports = monitorRequests;
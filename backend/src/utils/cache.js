const NodeCache = require('node-cache');

// Default TTL: 5 minutes, check period: 10 minutes
const cache = new NodeCache({ stdTTL: 300, checkperiod: 600 });

module.exports = cache;

const app = require('../backend/server');

// Export the Express app directly — Vercel will treat this as a serverless function
module.exports = app;

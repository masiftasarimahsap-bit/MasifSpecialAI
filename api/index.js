module.exports = async function handler(req, res) {
  try {
    const Anthropic = require('@anthropic-ai/sdk');
    return res.status(200).json({ status: "OK", SDK_LOADED: true, timestamp: Date.now() });
  } catch (err) {
    return res.status(200).json({ status: "ERROR", message: err.message, stack: err.stack });
  }
}

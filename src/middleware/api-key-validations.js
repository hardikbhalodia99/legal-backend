const verifyV1APIKey = async (req, res, next) => {
  try {
    const x_api_key = req.headers['x-api-key'];
    if (x_api_key && x_api_key === process.env.V1_API_KEY) {
      next();
    } else {
      return res.status(403).set({ 'Access-Control-Allow-Origin': '*' }).json({
        message: 'Please use a valid api-key for authorization.'
      });
    }
  } catch (error) {
    console.log('Error at middleware/api-key-validations/verifyV1APIKey ==> Error : ', error);
    return res.status(403).set({ 'Access-Control-Allow-Origin': '*' }).json({
      message: 'Please use a valid api-key for authorization.'
    });
  }
};

module.exports.verifyV1APIKey = verifyV1APIKey;
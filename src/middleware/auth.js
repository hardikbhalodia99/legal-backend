const { getAuthUserFallbackCookie, getCookie, cookieConfig } = require('./cookies');
const { getUserAccount } = require('./appwrite');

const validateAuth = async (req, res) => {
  console.log('%c 🍰 req.headers.authorization', 'color:#7f2b82', req.headers.authorization);
  const fallbackCookieName = getAuthUserFallbackCookie();
  const reqConfig = {
    signed: cookieConfig.signed,
    keys: cookieConfig.keys,
    req: req,
    res: res,
    secure: cookieConfig.secure
  };
  let fallbackCookieVal = getCookie(fallbackCookieName, reqConfig);

  const data = await getUserAccount(req.headers.authorization, fallbackCookieVal, req, res);
  console.log('%c 🍡 data', 'color:#33a5ff', data);
  if (!data) {
    console.log('INVALID AUTH HEADERS');
    return { isValid: false };
  } else {
    console.log('VALID AUTH HEADERS');
    return {
      isValid: true,
      data: data
    };
  }
};


module.exports.validateAuth = validateAuth;

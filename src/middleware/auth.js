const { getAuthUserFallbackCookie, getCookie, adminCookieConfig,employeeCookieConfig,userCookieConfig } = require("./cookies");
const { getUserAccount } = require("./appwrite.js");

const validateUserAuth = async (req, res) => {
  console.log('%c 🍰 req.headers.authorization', 'color:#7f2b82', req.headers.authorization);
  const fallbackCookieName = getAuthUserFallbackCookie('user');
  const reqConfig = {
    signed: userCookieConfig.signed,
    keys: userCookieConfig.keys,
    req: req,
    res: res,
    secure: userCookieConfig.secure
  };
  let fallbackCookieVal = getCookie(fallbackCookieName, reqConfig);

  const data = await getUserAccount(req.headers.authorization, fallbackCookieVal, req, res,'user');
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

const validateAdminAuth = async (req, res) => {
  console.log('%c 🍰 req.headers.authorization', 'color:#7f2b82', req);
  const fallbackCookieName = getAuthUserFallbackCookie('admin');
  const reqConfig = {
    signed: adminCookieConfig.signed,
    keys: adminCookieConfig.keys,
    req: req,
    res: res,
    secure: adminCookieConfig.secure
  };
  let fallbackCookieVal = getCookie(fallbackCookieName, reqConfig);

  const data = await getUserAccount(req.headers.authorization, fallbackCookieVal, req, res,'admin');
  console.log('%c 🍡 data', 'color:#33a5ff', data);
  if (!data) {
    console.log('INVALID AUTH HEADERS');
    return { isValid: false };
  } else {
    console.log('VALID AUTH HEADERS');

    const role = data.prefs && data.prefs.role ? data.prefs.role : null
    if(!role || role !== "ADMIN"){
      return {
        isValid : false
      }
    }

    return {
      isValid: true,
      data: data
    };
  }
};

const validateEmployeeAuth = async (req, res) => {
  console.log('%c 🍰 req.headers.authorization', 'color:#7f2b82', req.headers.authorization);
  const fallbackCookieName = getAuthUserFallbackCookie('employee');
  const reqConfig = {
    signed: employeeCookieConfig.signed,
    keys: employeeCookieConfig.keys,
    req: req,
    res: res,
    secure: employeeCookieConfig.secure
  };
  let fallbackCookieVal = getCookie(fallbackCookieName, reqConfig);

  const data = await getUserAccount(req.headers.authorization, fallbackCookieVal, req, res,'employee');
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

module.exports.validateUserAuth = validateUserAuth;
module.exports.validateAdminAuth = validateAdminAuth;
module.exports.validateEmployeeAuth = validateEmployeeAuth;


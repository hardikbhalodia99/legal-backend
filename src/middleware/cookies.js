const Cookies = require('cookies');
const COOKIE_NAME = process.env.APP_ENV === 'prod' ? 'legal-user-dashboard' : 'legal-user-dashboard-staging';

const ONE_WEEK_IN_MS = 7 * 60 * 60 * 24 * 1000;
const TWO_WEEKS_IN_MS = 14 * 60 * 60 * 24 * 1000;
const ONE_YEAR_IN_MS = 365 * 60 * 60 * 24 * 1000;
const KEYS = ['sdfsdghfghfghfghgfhfghfghfghfg'];

const cookieConfig = {
  keys: KEYS,
  httpOnly: true,
  domain: process.env.NODE_ENV === 'development' ? '' : '',
  maxAge: ONE_YEAR_IN_MS, // one year
  overwrite: true,
  path: '/',
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'development' ? false : true,
  signed: true
};

const createCookieMgr = (CookieManagerRequest) => {
  // https://github.com/pillarjs/cookies

  const cookies = Cookies(CookieManagerRequest.req, CookieManagerRequest.res, {
    keys: CookieManagerRequest.keys,
    secure: CookieManagerRequest.secure
  });
  return cookies;
};

const getCookie = (name, CookieManagerRequest) => {
  if (CookieManagerRequest.signed && !CookieManagerRequest.keys) {
    throw new Error('The "keys" value must be provided when using signed cookies.');
  }
  const cookies = createCookieMgr(CookieManagerRequest);

  // https://github.com/pillarjs/cookies#cookiesget-name--options--
  const cookieVal = cookies.get(name, { signed: CookieManagerRequest.signed });
  return cookieVal ? decodeBase64(cookieVal).toString() : undefined;
};

const setCookie = (SetCookieRequest) => {
  const { Options, req, res, cookieVal, name } = SetCookieRequest;
  if (Options.signed && !Options.keys) {
    throw new Error('The "keys" value must be provided when using signed cookies.');
  }

  const cookies = createCookieMgr({
    req: req,
    res: res,
    keys: Options.keys,
    secure: Options.secure !== undefined ? Options.secure : false
  });

  // If the value is not defined, set the value to undefined
  // so that the cookie will be deleted.
  const valToSet = cookieVal == null ? undefined : encodeBase64(cookieVal);

  // https://github.com/pillarjs/cookies#cookiesset-name--value---options--
  cookies.set(name, valToSet, {
    domain: Options.domain,
    httpOnly: Options.httpOnly,
    maxAge: Options.maxAge,
    overwrite: Options.overwrite,
    path: Options.path,
    sameSite: Options.sameSite,
    secure: Options.secure,
    signed: Options.signed
  });
};

const getAuthUserFallbackCookie = () => {
  const baseAuthCookieName = COOKIE_NAME;
  return `${baseAuthCookieName}.AuthUserFallback`;
};

const getAuthUserTokensCookieName = () => {
  const baseAuthCookieName = COOKIE_NAME;
  return `${baseAuthCookieName}.AuthUserTokens`;
};

const getAuthUserCookieName = () => {
  const baseAuthCookieName = COOKIE_NAME;
  return `${baseAuthCookieName}.AuthUser`;
};

const deleteCookie = (name, req, res, Options) => {
  // "If the value is omitted, an outbound header with an expired
  // date is used to delete the cookie."
  // https://github.com/pillarjs/cookies#cookiesset-name--value---options--
  setCookie({
    name: name,
    cookieVal: undefined,
    req,
    res,
    Options
  });
};

const decodeBase64 = (string) => {
  const body = Buffer.from(string, 'base64').toString('utf8')
  return JSON.parse(body)
}


const encodeBase64 = (obj) => {
  const str = JSON.stringify(obj)
  return Buffer.from(str).toString('base64')
}

module.exports.getCookie = getCookie;
module.exports.getAuthUserFallbackCookie = getAuthUserFallbackCookie;
module.exports.getAuthUserTokensCookieName = getAuthUserTokensCookieName;
module.exports.getAuthUserCookieName = getAuthUserCookieName;
module.exports.setCookie = setCookie;
module.exports.cookieConfig = cookieConfig;
module.exports.deleteCookie = deleteCookie;

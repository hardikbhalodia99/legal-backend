import { getUserAccount } from './appwrite.js';
import { setCookie, getAuthUserFallbackCookie, getAuthUserTokensCookieName, getAuthUserCookieName, cookieConfig } from './cookies.js';

export const setCookieValues = async (token,fallbackToken,req, res) => {
    setCookie({
        name: getAuthUserFallbackCookie(),
        // Note: any change to cookie data structure needs to be
        // backwards-compatible.
        cookieVal: fallbackToken,
        req: req,
        res: res,
        Options: cookieConfig
      }
    )
    setCookie({
        name: getAuthUserTokensCookieName(),
        // Note: any change to cookie data structure needs to be
        // backwards-compatible.
        cookieVal: token,
        req: req,
        res: res,
        Options: cookieConfig
      }
    )
  
    const user = await getUserAccount(token,fallbackToken,req,res);
    setCookie({
        name: getAuthUserCookieName(),
        cookieVal: JSON.stringify(user),
        req: req,
        res: res,
        Options: cookieConfig
      }
    )
    return user;
  }
  
export const setAuthCookies = async (req, res) => {
  if (!(req.headers && req.headers.authorization)) {
    throw new Error('The request is missing an Authorization header value')
  }

  const token = req.headers.authorization
  const fallbackToken = req.headers['X-Fallback-Cookies']? req.headers['X-Fallback-Cookies'].toString() : req.headers['x-fallback-cookies']?.toString();

  const user = await setCookieValues(token,fallbackToken,req,res);
  return {
    token,
    user
  }
}

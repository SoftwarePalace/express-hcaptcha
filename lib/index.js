'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hcaptcha = require('hcaptcha');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var hcaptcha__default = /*#__PURE__*/_interopDefaultLegacy(hcaptcha);

// validate takes an hCaptcha secret and returns
// an express middleware function
const validate = secret => (req, res, next) => {
  // get token from the body
  // requires the body parser JSON middleware
  // on the app that uses this middleware
  const token = req.body && req.body.token;

  if (!token) {
    res.status(400).json({
      msg: "No token was privded in the body!"
    });
    return;
  } // verify the hcaptcha and continue on success


  return hcaptcha__default['default'].verify(secret, token).then(data => {
    res.locals.hcaptcha = data;

    if (data.success) {
      return next();
    }

    res.status(400).json({
      msg: data["error-codes"]
    });
    return;
  }).catch(next);
};

exports.validate = validate;

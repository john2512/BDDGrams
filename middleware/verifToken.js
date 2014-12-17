/*jslint node: true, nomen: true*/

var mongoose = require('mongoose');
var Token = mongoose.model('Token');
var TOKEN_LENGTH = 32;

//Constructor
var VerifToken = function () {
  'use strict';
};

//EXtract the token from the header of the request.
function extractTokenFromHeader(headers) {
  'use strict';
  var err,
    token;
  if (headers === undefined) {
    err = new Error('Autorization headers missing');
    err.name = 'BadCredential';
    throw err;
  }

  if (headers.authorization === undefined) {
    err = new Error('Autorization headers missing');
    err.name = 'BadCredential';
    throw err;
  }

  token = headers.authorization;

  if (token.length !== TOKEN_LENGTH * 2) {
    err = new Error('Token length is not the expected one');
    err.name = 'BadCredential';
    throw err;
  }
  return token;
}

//Verify the if the token exist in the database.
VerifToken.verify = function (req, res, next) {
  'use strict';
  var headers = req.headers,
    token,
    err;
  if (headers === undefined) {
    err = new Error('Autorization headers missing');
    err.name = 'BadCredential';
    return next(err);
  }

  try {
    token = extractTokenFromHeader(headers);
  } catch (e) {
    return next(e);
  }

  Token.findOne({token: token}, function (err, tokenInst) {
    if (err) {
      return next(err);
    }

    if (tokenInst === null) {
      err = new Error('Bad token');
      err.name = 'BadCredential';
      return next(err);
    }

    req._user = tokenInst;
    next();
  });
};

module.exports = VerifToken;

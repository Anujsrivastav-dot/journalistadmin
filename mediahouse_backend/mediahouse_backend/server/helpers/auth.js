//== require packages ====//
let jwt = require("jsonwebtoken");
// config function
let config = require("../helpers/config")();
var sendRes = require("../helpers/responseHandler");
const db = require("../dbConnection/dao");

module.exports.authenticateJournalist = function (req, res, next) {
  // Get authorication token in header
  let token = req.headers.authtoken;

  // if token exist then verify the token
  if (token) {
    jwt.verify(token, config.secretKey, function (err, journalist) {
      // if error occured that means token in not valid.
      if (err) {
        sendRes.toUser(req, res, 403, "Failed to authenticate token.");
      }
      // token verified then enter in else block
      else {
        // console.log('/------decoded token--------/');
        //console.log(journalist);

        db.journalist.findById(journalist._id).exec((err, success) => {
          if (err) {
            sendRes.toUser(req, res, 500, "Server error");
          } else if (!success) {
            sendRes.toUser(req, res, 403, "Invalid token");
          } else {
            if (success.status == 1) {
              req.journalist = success;
              next();
            } else {
              sendRes.toUser(req, res, 403, "Invalid token");
            }
          }
        });
      }
    });
  } else {
    sendRes.toUser(req, res, 403, "No token provided");
  }
};

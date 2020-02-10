const db = require("../../dbConnection/dao");
const sendResponse = require("../../helpers/responseHandler");
const encryptDecrypt = require("../../helpers/cryptoPassword");
const generateToken = require("../../helpers/generateAuthToken");
// var mailFunction = require("../../lib/mailer");
var randomOtp = require('random-number');
var nodemailer = require('nodemailer');
var random = require('random-number-generator')

randomOtp(); 

// const COUNTRIES =require("../../helpers/country");
const STATES = require("../../helpers/state");
const CITY = require("../../helpers/city");
module.exports = {

  // ==============================
  //   Journalist Signup API
  // ==============================

  personalInfo: async (req, res) => {

    try {
      var condition = {
        $or: [{
          emailId: req.body.emailId,
        }, {
          mobileNumber: req.body.mobileNumber
        }]
      };
      var success = await db.journalist.findOne(condition);
      if (success) {
        sendResponse.to_user(
          res,
          409,
          "DATA_ALREADY_EXIST",
          "Email id or mobile number already taken",
          null
        );
      } else {
        var fileArray=req.files;
        var profilePic;
        var shortVideo;
        var l=0;
        fileArray['profilePic'].forEach(img => {
            profilePic=img['filename'];
         l++;
       });
       var k=0;
       fileArray['shortVideo'].forEach(vid => {
        shortVideo=vid['filename'];
       k++;
       });
        req.body.password = encryptDecrypt.encrypt(req.body.password);
        req.body.profilePic=profilePic; 
        req.body.shortVideo=shortVideo; 
        console.log("====",req.body.shortVideo);
        var journalists = new db.journalist(req.body);
        await journalists.save();
        sendResponse.to_user(
          res,
          200,
          null,
          "Journalist registered successfully",
          journalists
        );
      }
    } catch (e) {
      console.log("err====", e);
      sendResponse.to_user(res, 400, e, "Something went wrong");
    }
  },

  
  // ==============================
  //   All State list API
  // ==============================
  state: async (req, res) => {
    try {
      var countryId = req.query.countryId;
      finalArray = [];
      const filteredStates = STATES.filter(state => {
        return state.country_id === countryId;
      });
      for (var i = 0; i < filteredStates.length; i++) {
        console.log(filteredStates.length);
        finalArray.push({ id: filteredStates[i].country_id, text: filteredStates[i].name, currencyName: filteredStates[i].currencyName })
      }
      sendResponse.to_user(res, 200, null, "State list found", finalArray);
    } catch (e) {
      console.log("err====", e);
      sendResponse.to_user(res, 400, e, "Something went wrong");
    }
  },


  // ==============================
  //   All City list API
  // ==============================
  city: async (req, res) => {
    try {
      var stateId = req.query.stateId;
      finalArray = [];
      const filteredCity = CITY.filter(city => {
        return city.state_id === stateId;
      });
      for (var i = 0; i < filteredCity.length; i++) {
        finalArray.push({ id: filteredCity[i].state_id, text: filteredCity[i].name })
      }
      sendResponse.to_user(res, 200, null, "City list found", filteredCity);
    } catch (e) {
      console.log("err====", e);
      sendResponse.to_user(res, 400, e, "Something went wrong");
    }
  },


  // ==============================
  //   Journalist Login API
  // ==============================
  journalistLogin: async (req, res) => {
    try {
      var condition = {
        emailId: req.body.emailId,
        password: encryptDecrypt.encrypt(req.body.password)
      };
      var journalistData = await db.journalist.findOne(condition);
      if (!journalistData) {
        sendResponse.to_user(
          res,
          400,
          null,
          "Email id or password is incorrect.",
          null
        );
      } else {
        authToken = generateToken.authToken({
          _id: journalistData._id
        });
        sendResponse.to_user(res, 200, null, "Login successfully", {
          journalistToken: authToken
        });
      }
    } catch (e) {
      console.log(e);
      sendResponse.to_user(res, 400, e, "Something went wrong");
    }
  },

  // ==============================
  //  Forgot password API
  // ==============================
  "forgotPassword": async (req, res) => {
    try {
      var condition = {
        emailId: req.body.emailId,
        // status: 1,
      }
      var journalistData = await db.journalist.findOne(condition);
      if (!journalistData) {
        sendResponse.to_user(res, 400, null, ' Email id does not exist.', null);
      } else {
        var otpGen = random(9999, 1111) // random integer between 10 and 50
        journalistData.otp = otpGen;
        await journalistData.save();
        var smtpTransport = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: "satyendra.designoweb@gmail.com",
            pass: "satyadesignoweb@123"
          }
        });

        var mail = {
          from: "satyendra.designoweb@gmail.com",
          to: "satyendra05cs@gmail.com",
          subject: "Recover your account",
          text: "Hey Please use the code",
          html: "<b>your Recover code is:</b>" + otpGen,
        }

        smtpTransport.sendMail(mail, function (error, response) {
          if (error) {
            console.log("err", error)
            //sendResponse.to_user(res, 400, error, "Something went wrong");
          } else {
            console.log("success", response)
            sendResponse.to_user(res, 200, null, 'OTP has been sent on your registered email.', null);
          }
          smtpTransport.close();
        });

      }
    } catch (e) {
      // console.log(e)
      sendResponse.to_user(res, 400, e, "Something went wrong");
    }

  },


  // ==============================
  //  Verify OTP API
  // ==============================

  "verifyOtp": async (req, res) => {
    try {
      var condition = {
        emailId: req.body.emailId
      }
      var journalistData = await db.journalist.findOne(condition);
      // console.log("==>>journalistData", journalistData.otp)
      if (!journalistData) {
        sendResponse.to_user(res, 400, null, ' Email id does not exist', null);
      }
      else if (journalistData.otp != req.body.otp) {
        sendResponse.to_user(res, 202, null, ' Invalid OTP', null);
      }
      else {
        console.log("==>>data", journalistData);
        journalistData.verifyOtp = true;
        await journalistData.save();
        authToken = generateToken.authToken({
          _id: journalistData._id
        });
        sendResponse.to_user(res, 200, null, 'OTP verified successfully, Please contact to admin', {
          journalistToken: authToken,
          _id: journalistData._id,
          otp: journalistData.otp
        });
      }
    } catch (e) {
      console.log(e)
      sendResponse.to_user(res, 400, e, "Something went wrong");
    }
  },

  // ==============================
  //  Reset password API
  // ==============================

  "resetPassword": async (req, res) => {
    try {
      if (req.body.newPassword == req.body.confirmPassword) {
        var success = await db.journalist.findOne({
          emailId: req.body.emailId,

        });
        if (!success) {
          sendResponse.to_user(res, 400, null, 'Email id does not exist', null);
        } else {
          await db.journalist.findOneAndUpdate({
            emailId: req.body.emailId,

          }, {
            $set: {
              "password": encryptDecrypt.encrypt(req.body.newPassword)
            }
          });
          sendResponse.to_user(res, 200, null, 'Password reset successfully', null);
        }
      } else {
        sendResponse.to_user(res, 400, null, "New password and confirm password doesn't match", null);
      }
    } catch (e) {
      // console.log(e)
      sendResponse.to_user(res, 400, e, "Something went wrong");
    }
  },





};

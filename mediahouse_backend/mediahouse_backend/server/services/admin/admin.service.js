const db = require("../../dbConnection/dao");
const sendResponse = require("../../helpers/responseHandler");
const generate = require("../../helpers/generateAuthToken");
const upload = require("../../helpers/uploadImage");
const encryptDecrypt = require("../../helpers/cryptoPassword");
const generateToken = require("../../helpers/generateAuthToken");
var sgTransport = require("nodemailer-sendgrid-transport")
// var moment = require('moment');
// var hourFromNow = function(){
//     return moment().add(5, 'seconds');
// };

var async = require('async');
var nodemailer = require("nodemailer");
//const adminschema = require("../../models/adminModel/admin")
 var images = require("../../../server/helpers/uploadImage");

adminInit = async (req,res) => {
    
    const success = new db.admin({
        
      adminName:"adminpanel",
      adminEmail:"anujsrivastav2601@gmail.com",
      password:"12345678",
      type:"ADMIN"
    })
     await db.admin.count({}, (err, result)=> {
      if (!result) {
        var admin = new db.admin(success)
     admin.save()
      } 
      else {
          console.log("already exist")
      }
    });
    }
    adminInit();
module.exports = {
    
    "getdata1" :async (req,res) => {
        console.log("tets")
        await db.admin.find({},function(err,result){
            console.log("otp>>>>>>>>>tyyt"+ result)
            if(result) {
            // res.json({data:result})
             sendResponse.to_user(res,200,null,"details are",result)

            }
            else { sendResponse.to_user(res,400,null,"some error occurs",err)
          }
    })
    },
    
   // validate.findByIdAndUpdate({ _id: user._id }, { reset_password_token: token, reset_password_expires: Date.now() + 36000000 }, { upsert: true, new: true }).exec(function(err, new_user)
       "forgot": async (req, res) => {
        try {
          var condition = {
            adminEmail:req.body.adminEmail,
            // status: 1,
          }
          var adminData = await db.admin.findOne(condition);
          if (!adminData) {
            sendResponse.to_user(res, 400, null, ' Email id does not exist.', null);
          } else {
           var digits = "0123456789"
           var OTP ="";
           for(let i=0;i < 4;i++) {
            OTP += digits[Math.floor(Math.random() * 10)]
            console.log("newotp>>>>>" + OTP)
            console.log("newofsdfsdftpdddddddddddddddddd>>>>>" + adminData._id)
           }
           db.admin.findByIdAndUpdate({ _id:adminData._id }, { OTP:OTP, reset_password_expires: Date.now()}, { upsert: true, new: true }).exec(function(err, new_user){
if(new_user) {
    console.log("this is>>>>" + new_user)
}
           })
            var smtpTransport =  nodemailer.createTransport({
              service: "Gmail",
              auth: {
                user: "ashoksrivastava2009@gmail.com",
                pass: "akshineha"
              }
            });
    
            var mail = {
              from: "ashoksrivastava2009@gmail.com",
              to: "anujsrivastav2601@gmail.com",
              subject: "Your OTP",
              text: "please check your email",
              html: "your otp is " + OTP,
            }
    
            smtpTransport.sendMail(mail, function (error, response) {
              if (error) {
                console.log("err", error)
                //sendResponse.to_user(res, 400, error, "Something went wrong");
              } else {
                console.log("success", response)
                sendResponse.to_user(res, 200, null, 'OTP has been sent on your registered email.', new_user);
              }
              smtpTransport.close();
            });
    
          }
        } catch (e) {
          // console.log(e)
          sendResponse.to_user(res, 400, e, "Something went wrong");
        }
    
      },
    
    
    

    
      "verifyOTP": async (req, res) => {
        //  console.log("data>>>>" + JSON.stringify(req.body.OTP))       
          await db.admin.findOne({OTP:req.body.OTP},function(err,result){
              console.log("otp>>>>>>>>>tyyt"+ req.body.OTP)
              if(!result) {
                sendResponse.to_user(res,400,null,"Password OTP is invalid or has expired")
              }
              else {  sendResponse.to_user(res, 200, null, 'OTP has been Verified successfully2.', null);
            //   sendResponse.to_user(res,400,null,"Password OTP is invalid or has expired")
            }
 })
          },
      "newpassword":async (req,res) => {
       var outputdata = await db.admin.findOne({})
        if(!outputdata) {
            sendResponse.to_user(res,200,null,"something went wrong")
        }
        else {
            outputdata.password=req.body.password;
            outputdata.OTP = undefined;
            outputdata.reset_password_expires = undefined;
            outputdata.save()
            sendResponse.to_user(res,200,null,"password updated successfully",outputdata)
            console.log('password' + outputdata.password  + 'and the user is' + outputdata.adminEmail)
        }
        },
        "resend": async (req, res) => {
            try {
              var condition = {
                adminEmail:"anujsrivastav2601@gmail.com",
                // status: 1,
              }
              var adminData = await db.admin.findOne(condition);
              if (!adminData) {
                sendResponse.to_user(res, 400, null, ' Email id does not exist.', null);
              } else {
               var digits = "0123456789"
               var OTP ="";
               for(let i=0;i < 4;i++) {
                OTP += digits[Math.floor(Math.random() * 10)]
                console.log("newotp>>>>>" + OTP)
                console.log("newofsdfsdftpdddddddddddddddddd>>>>>" + adminData._id)
               }
               db.admin.findByIdAndUpdate({ _id: adminData._id }, { OTP:OTP,reset_password_expires:Date.now()+20000}, { upsert: true, new: true }).exec(function(err, new_user){
    if(new_user) {
        console.log("this is>>>>" + new_user)
    }
               })
                var smtpTransport =  nodemailer.createTransport({
                  service: "Gmail",
                  auth: {
                    user: "ashoksrivastava2009@gmail.com",
                    pass: "akshineha"
                  }
                });
        
                var mail = {
                  from: "ashoksrivastava2009@gmail.com",
                  to: "anujsrivastav2601@gmail.com",
                  subject: "Your OTP",
                  text: "please check your email ",
                  html: "your otp is " + OTP,
                }
        
                smtpTransport.sendMail(mail, function (error, response) {
                  if (error) {
                    console.log("err", error)
                    //sendResponse.to_user(res, 400, error, "Something went wrong");
                  } else {
                    console.log("success", response)
                    sendResponse.to_user(res, 200, null, 'OTP has been sent on your registered email.', new_user);
                  }
                  smtpTransport.close();
                });
        
              }
            } catch (e) {
              // console.log(e)
              sendResponse.to_user(res, 400, e, "Something went wrong");
            }
        
          },

          "journalistdata":async (req,res) => {
            const journalistdetails = await db.journalist.find({});
            if(!journalistdetails) {
                sendResponse.to_user(res,400,null,"no list exists",null)
            }
            else {
            
    
            sendResponse.to_user(res,200,null,"user details are",journalistdetails)
}
          },

    // api for desigantion(add,delete,update,get)    
 "add": async (req, res) => {
        try {
            //  var imageArray=req.files;
            //  var image=[];
            //  var video=[];
            //  imageArray['video'].forEach(vid => {
            //     video.push(vid['filename']); 
            // });
            // imageArray['file'].forEach(vid => {
            //     image.push(vid['filename']); 
            // });
            // var obj = new db.admin({
            //      file:image,
            //      video:video
            // });
            req.body.password = encryptDecrypt.encrypt(req.body.password);
            var obj = new db.admin(req.body);
            await obj.save();
            sendResponse.to_user(res, 200, null, "admin added successfully", obj);

        } catch (e) {
            console.log(e)
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "get": async (req, res) => {
        try {
            var obj = await db.admin.find({ status: 1 });

            if (obj != '') {
                sendResponse.to_user(res, 200, null, "Designation get successfully", obj);
            } else {
                sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable", null);
            }
        } catch (e) {
            // console.log(e)
            sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
        }
    },
    adminLogin: async (req, res) => {
        try {
            var condition = {
                adminEmail: req.body.adminEmail,
                password: encryptDecrypt.encrypt(req.body.password)
            };
            var adminData = await db.admin.findOne(condition);
            if (!adminData) {
                sendResponse.to_user(
                    res,
                    400,
                    null,
                    "Email id or password is incorrect.",
                    null
                );
            } else {
                authToken = generateToken.authToken({
                    _id: adminData._id
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

    "editprofile":async (req,res) => {
       
        
        var email = req.body.email;
        console.log("filename>>>>>>>>>>" + req.file)
       await db.admin.findByIdAndUpdate({_id:req.params.id},({email:email,file:req.file.filename}),{upsert:true,new:true}).exec(function(err, new_user){
          console.log("email>>>>>>>>" + req.body.email)
          console.log("email>>>>>>>>" + JSON.stringify(req.file))
          console.log("filename>>>>>>>>>>" + req.file)
          sendResponse.to_user(res, 200, null, "Successfully update",new_user);
        })
     } ,

    // await db.admin.find({},function(err,result){
    //     console.log("otp>>>>>>>>>tyyt"+ result)
    //     if(result) {
    //     // res.json({data:result})
    //      sendResponse.to_user(res,200,null,"details are",result)

    //     }
    //     else { sendResponse.to_user(res,400,null,"some error occurs",err)
    //   }
    // api for desigantion(add,delete,update,get)    
    "addDesignation": async (req, res) => {
        try {
            var condition = {
                designationName: {
                    $regex: ".*" + req.body.designationName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var success = await db.designation.findOne(condition);
            if (success) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Designation already taken", null);
            } else {
                var obj = new db.designation(req.body);
                await obj.save();
                sendResponse.to_user(res, 200, null, "Designation added successfully", obj);
            }
        } catch (e) {
            console.log(e)
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "getDesignation": async (req, res) => {
        try {
            finalArray = [];
            var obj = await db.designation.find({ status: 1 }, { designationName: 1, status: 1, _id: 1 });
            for (var i = 0; i < obj.length; i++) {
                finalArray.push({ id: obj[i]._id, text: obj[i].designationName })
            }
            if (obj != '') {
                sendResponse.to_user(res, 200, null, "Designation get successfully", finalArray);
            } else {
                sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable", null);
            }
        } catch (e) {
            console.log(e)
            sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
        }
    },

    "updateDesignation": async (req, res) => {
        try {
            const filter = { _id: req.body.id };
            const update = { designationName: req.body.designationName };
            var condition = {
                designationName: {
                    $regex: ".*" + req.body.designationName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var check = await db.designation.findOne(condition);
            if (check) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Designation already taken", null);
            }
            else {
                var success = await db.designation.findByIdAndUpdate(filter, update, {
                    new: true
                })
                if (!success) {
                    sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Designation Not Found With Id", null);
                }
                else {
                    sendResponse.to_user(res, 200, null, "Designation Updated Successfully", success);
                }
            }
        } catch (e) {

            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "deleteDesignation": async (req, res) => {
        try {
            const filter = { _id: req.body.id };

            var success = await db.designation.findByIdAndRemove(filter)
            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Designation Not Found With Id", null);
            }
            else {
                sendResponse.to_user(res, 200, null, "Designation Deleted Successfully", success);
            }
        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    /// api for platform benefit(add,delete,update,get)  
    "addBenefit": async (req, res) => {
        try {
            var condition = {
                benefitName: {
                    $regex: ".*" + req.body.benefitName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var success = await db.benefit.findOne(condition);
            if (success) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Benefit already taken", null);
            } else {
                var obj = new db.benefit(req.body);
                await obj.save();
                sendResponse.to_user(res, 200, null, "Benefit added successfully", obj);
            }
        } catch (e) {

            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "getBenefit": async (req, res) => {
        try {
            var obj = await db.benefit.find({ status: 1 }, { benefitName: 1, status: 1, _id: 1 });
            if (obj != '') {
                sendResponse.to_user(res, 200, null, "Benefit get successfully", obj);
            } else {
                sendResponse.to_user(res, 200, "NO_CONTENT", "No Data Avilable", null);
            }
        } catch (e) {

            sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
        }
    },

    "updateBenefit": async (req, res) => {
        try {
            const filter = { _id: req.body.id };
            const update = { benefitName: req.body.benefitName };
            var condition = {
                benefitName: {
                    $regex: ".*" + req.body.benefitName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var check = await db.benefit.findOne(condition);
            if (check) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Benefit already taken", null);
            }
            else {
                var success = await db.benefit.findByIdAndUpdate(filter, update, {
                    new: true
                })
                if (!success) {
                    sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Benefit Not Found With Id", null);
                }
                else {
                    sendResponse.to_user(res, 200, null, "Benefit Updated Successfully", success);
                }
            }
        } catch (e) {

            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "deleteBenefit": async (req, res) => {
        try {
            const filter = { _id: req.body.id };

            var success = await db.benefit.findByIdAndRemove(filter)
            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Benefit Not Found With Id", null);
            }
            else {
                sendResponse.to_user(res, 200, null, "Benefit Deleted Successfully", success);
            }
        } catch (e) {

            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    /// api for platform category(add,delete,update,get)  
    "addCategory": async (req, res) => {
        try {
            var condition = {
                categoryName: {
                    $regex: ".*" + req.body.categoryName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var success = await db.category.findOne(condition);
            if (success) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Category already taken", null);
            } else {
                var obj = new db.category(req.body);
                await obj.save();
                sendResponse.to_user(res, 200, null, "Category added successfully", obj);
            }
        } catch (e) {

            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "getCategory": async (req, res) => {
        try {
            finalArray = [];
            var obj = await db.category.find({ status: 1 }, { categoryName: 1, status: 1, _id: 1 });
            for (var i = 0; i < obj.length; i++) {
                finalArray.push({ id: obj[i]._id, text: obj[i].categoryName })
            }
            if (obj != '') {
                sendResponse.to_user(res, 200, null, "Category get successfully", finalArray);
            } else {
                sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable", null);
            }
        } catch (e) {
            sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
        }
    },

    "updateCategory": async (req, res) => {
        try {
            const filter = { _id: req.body.id };
            const update = { categoryName: req.body.categoryName };
            var condition = {
                categoryName: {
                    $regex: ".*" + req.body.categoryName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var check = await db.category.findOne(condition);
            if (check) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Category already taken", null);
            }
            else {
                var success = await db.category.findByIdAndUpdate(filter, update, {
                    new: true
                })
                if (!success) {
                    sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Category Not Found With Id", null);
                }
                else {
                    sendResponse.to_user(res, 200, null, "Category Updated Successfully", success);
                }
            }
        } catch (e) {

            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "deleteCategory": async (req, res) => {
        try {
            const filter = { _id: req.body.id };
            var success = await db.category.findByIdAndRemove(filter)
            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Category Not Found With Id", null);
            }
            else {
                sendResponse.to_user(res, 200, null, "Category Deleted Successfully", success);
            }
        } catch (e) {

            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    /// api for platform category(add,delete,update,get)  
    "addStoryCategory": async (req, res) => {
        try {
            var condition = {
                storyCategoryName: {
                    $regex: ".*" + req.body.storyCategoryName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var success = await db.storyCategory.findOne(condition);
            if (success) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Story Category already taken", null);
            } else {
                var obj = new db.storyCategory(req.body);
                await obj.save();
                sendResponse.to_user(res, 200, null, "Story Category added successfully", obj);
            }
        } catch (e) {

            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "getStoryCategory": async (req, res) => {
        try {
            var obj = await db.storyCategory.find({ status: 1 }, { storyCategoryName: 1, status: 1, _id: 1 });
            if (obj != '') {
                sendResponse.to_user(res, 200, null, "Story Category get successfully", obj);
            } else {
                sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable", null);
            }
        } catch (e) {

            sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
        }
    },

    "updateStoryCategory": async (req, res) => {
        try {
            const filter = { _id: req.body.id };
            const update = { storyCategoryName: req.body.storyCategoryName };
            var condition = {
                storyCategoryName: {
                    $regex: ".*" + req.body.storyCategoryName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var check = await db.storyCategory.findOne(condition);
            if (check) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Story Category already taken", null);
            }
            else {
                var success = await db.storyCategory.findByIdAndUpdate(filter, update, {
                    new: true
                })
                if (!success) {
                    sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Story Category Not Found With Id", null);
                }
                else {
                    sendResponse.to_user(res, 200, null, "Story Category Updated Successfully", success);
                }
            }
        } catch (e) {

            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "deleteStoryCategory": async (req, res) => {
        try {
            const filter = { _id: req.body.id };
            var success = await db.storyCategory.findByIdAndRemove(filter)
            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Story Category Not Found With Id", null);
            }
            else {
                sendResponse.to_user(res, 200, null, "Story Category Deleted Successfully", success);
            }
        } catch (e) {

            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    /// api for Story Type(add,delete,update,get)  
    "addStoryType": async (req, res) => {
        try {
            var condition = {
                storyTypeName: {
                    $regex: ".*" + req.body.storyTypeName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var success = await db.storyType.findOne(condition);
            if (success) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Story Type already taken", null);
            } else {
                var obj = new db.storyType(req.body);
                await obj.save();
                sendResponse.to_user(res, 200, null, "Story Type added successfully", obj);
            }
        } catch (e) {

            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "getStoryType": async (req, res) => {
        try {
            var obj = await db.storyType.find({ status: 1 }, { storyTypeName: 1, status: 1, _id: 1 });
            if (obj != '') {
                sendResponse.to_user(res, 200, null, "Story Type get successfully", obj);
            } else {
                sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable", null);
            }
        } catch (e) {

            sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
        }
    },

    "updateStoryType": async (req, res) => {
        try {
            const filter = { _id: req.body.id };
            const update = { storyTypeName: req.body.storyTypeName };
            var condition = {
                storyTypeName: {
                    $regex: ".*" + req.body.storyTypeName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var check = await db.storyType.findOne(condition);
            if (check) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Story Type already taken", null);
            }
            else {
                var success = await db.storyType.findByIdAndUpdate(filter, update, {
                    new: true
                })
                if (!success) {
                    sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Story Type Not Found With Id", null);
                }
                else {
                    sendResponse.to_user(res, 200, null, "Story Type Updated Successfully", success);
                }
            }
        } catch (e) {

            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "deleteStoryType": async (req, res) => {
        try {
            const filter = { _id: req.body.id };
            var success = await db.storyType.findByIdAndRemove(filter)
            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Story Type Not Found With Id", null);
            }
            else {
                sendResponse.to_user(res, 200, null, "Story Type Deleted Successfully", success);
            }
        } catch (e) {

            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    /// api for Story Keyword(add,delete,update,get)  
    "addStoryKeyword": async (req, res) => {
        try {
            var condition = {
                storyKeywordName: {
                    $regex: ".*" + req.body.storyKeywordName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var success = await db.storyKeyword.findOne(condition);
            if (success) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Story Keyword already taken", null);
            } else {
                var obj = new db.storyKeyword(req.body);
                //console.log(obj)
                await obj.save();
                sendResponse.to_user(res, 200, null, "Story Keyword added successfully", obj);
            }
        } catch (e) {

            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "getStoryKeyword": async (req, res) => {
        try {
            var obj = await db.storyKeyword.find({ status: 1 }, { storyKeywordName: 1, status: 1, _id: 1 });
            if (obj != '') {
                sendResponse.to_user(res, 200, null, "Story Keyword get successfully", obj);
            } else {
                sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable", null);
            }
        } catch (e) {

            sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
        }
    },

    "updateStoryKeyword": async (req, res) => {
        try {
            const filter = { _id: req.body.id };
            const update = { storyKeywordName: req.body.storyKeywordName };
            var condition = {
                storyKeywordName: {
                    $regex: ".*" + req.body.storyKeywordName + ".*",
                    $options: "si"
                },
                status: 1
            };
            var check = await db.storyKeyword.findOne(condition);
            if (check) {
                sendResponse.to_user(res, 409, "DATA_ALREADY_EXIST", "Story Keyword already taken", null);
            }
            else {
                var success = await db.storyKeyword.findByIdAndUpdate(filter, update, {
                    new: true
                })
                if (!success) {
                    sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Story Keyword Not Found With Id", null);
                }
                else {
                    sendResponse.to_user(res, 200, null, "Story Keyword Updated Successfully", success);
                }
            }
        } catch (e) {

            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "deleteStoryKeyword": async (req, res) => {
        try {
            const filter = { _id: req.body.id };
            var success = await db.storyKeyword.findByIdAndRemove(filter)
            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Story Keyword Not Found With Id", null);
            }
            else {
                sendResponse.to_user(res, 200, null, "Story Keyword Deleted Successfully", success);
            }
        } catch (e) {

            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    /// api for list of journalist  
    "getJournalist": async (req, res) => {
        try {
            var obj = await db.journalist.find({ status: 1 });
            if (obj != '') {
                sendResponse.to_user(res, 200, null, "Journalist Keyword get successfully", obj);
            } else {
                sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable", null);
            }
        } catch (e) {

            sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
        }
    },

    "updateJournalist": async (req, res) => {
        try {
            const filter = { _id: req.body.journalistId };
            var check = await db.journalist.findOne(filter);
            if (check.status == 1) {
                var update = { status: 0 };
            }
            else {
                var update = { status: 1 };
            }
            var success = await db.journalist.findByIdAndUpdate(filter, update, {
                new: true
            })

            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Journalist Not Found With Id", null);
            }
            else {
                sendResponse.to_user(res, 200, null, "Journalist Updated Successfully", success);
            }
        } catch (e) {

            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    /// api for SocioLinks(add,delete,update,get)  
    "addSocioLinks": async (req, res) => {
        try {

            var obj = new db.socioLinks(req.body);
            await obj.save();
            sendResponse.to_user(res, 200, null, "SocioLinks added successfully", obj);

        } catch (e) {

            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "getSocioLinks": async (req, res) => {
        try {
            var obj = await db.socioLinks.find();
            if (obj != '') {
                sendResponse.to_user(res, 200, null, "SocioLinks get successfully", obj);
            } else {
                sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable", null);
            }
        } catch (e) {

            sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
        }
    },

    "updateSocioLinks": async (req, res) => {
        try {
            const filter = { _id: req.body.id };
            const update = req.body;
            var success = await db.socioLinks.findByIdAndUpdate(filter, update, {
                new: true
            })
            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Story Keyword Not Found With Id", null);
            }
            else {
                sendResponse.to_user(res, 200, null, "Story Keyword Updated Successfully", success);
            }
        } catch (e) {

            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

    "deleteSocioLinks": async (req, res) => {
        try {
            const filter = { _id: req.body.id };
            var success = await db.socioLinks.findByIdAndRemove(filter)
            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "SocioLinks Not Found With Id", null);
            }
            else {
                sendResponse.to_user(res, 200, null, "SocioLinks Deleted Successfully", success);
            }
        } catch (e) {

            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },

};
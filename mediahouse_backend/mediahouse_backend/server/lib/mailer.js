// var nodemailer = require('nodemailer');

// var smtpTransport = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//         user: "satyendra.designoweb@gmail.com",
//         pass: "satyadesignoweb@123"
//     }
// });

// var mail = {
//     from: "satyendra.designoweb@gmail.com",
//     to: "satyendra05cs@gmail.com",
//     subject: "Recover your account",
//     text: "Hey Please use the code",
//     html: "<b>Forgot Password</b>"
// }

// smtpTransport.sendMail(mail, function (error, response) {
//     if (error) {
//         console.log("err", error)
//         //sendResponse.to_user(res, 400, error, "Something went wrong");
//     } else {
//         console.log("success", response)
//         //sendRes.toUser(res, 200, 'New password sent on your registered email.', journalistData.password);
//     }
//     smtpTransport.close();
// });
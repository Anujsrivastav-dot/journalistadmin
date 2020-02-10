var db = require('../../dbConnection/dao'),
    sendResponse = require("../../helpers/responseHandler"),
    generate = require("../../helpers/generateAuthToken"),
    randomstring = require('randomstring'),
    sendMail = require("../../helpers/sendMail");



module.exports = {
    'categoryList': async(req, res) => {
        try {
            var success = await db.category.find({
                status: 1
            }, 'name');

            sendResponse.to_user(res, 200, null, 'Success', success);
        } catch (e) {
            sendResponse.to_user(res, 400, e, 'Something went wrong');
        }
    },
  
    
};
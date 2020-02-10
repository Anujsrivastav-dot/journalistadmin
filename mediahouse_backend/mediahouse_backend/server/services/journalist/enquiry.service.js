const db = require("../../dbConnection/dao");
const sendResponse = require("../../helpers/responseHandler");

module.exports ={
  "addEnquiry": async(req, res) => {
    try {
        var enquiry = new db.enquiry(req.body);
        await enquiry.save();
        sendResponse.to_user(
          res,
          200,
          null,
          "Enquiry Added successfully", 
          enquiry
        );
    } catch (e) {
      console.log("err====", e);
      sendResponse.to_user(res, 400, e, "Something went wrong");
    }
  },
"getEnquiry": async(req, res) => {
  try {
    var options = {
        select:   'enquiryTitle enquiryDescription ',
        sort:     { createdAt: -1 },
        limit:    4,
        page: req.query.pageNumber||1
    }
      var obj = await db.enquiry.paginate({}, options);
      if (obj!='') {
          sendResponse.to_user(res, 200, null, "Enquiry  get successfully",obj);
      } else {
          sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable",null);
      }
  } catch (e) {   
      console.log(e) 
      sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
  }
},
}
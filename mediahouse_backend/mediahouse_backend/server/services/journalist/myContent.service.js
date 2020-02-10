const db = require("../../dbConnection/dao");
const sendResponse = require("../../helpers/responseHandler");

module.exports ={
  "myContent": async(req, res) => {
    try {
         var file=req.files;
         var uploadFiles=[];
             file.forEach(file => {
              uploadFiles.push({contentOriginalName:file['originalname'],contentDuplicateName:file['filename']});
              });
        req.body.myContent=uploadFiles;
        var story = new db.myContents(req.body);
        await story.save();
        sendResponse.to_user(
          res,
          200,
          null,
          "Content Upload successfully", 
          story
        );
      
    } catch (e) {
      console.log("err====", e);
      sendResponse.to_user(res, 400, e, "Something went wrong");
    }
  },
  "updatemyContent": async(req, res) => {
    try {
          var success = await db.myContents.updateOne(
            {"myContent._id": req.body.contentId },
            { $set: { "myContent.$.contentOriginalName" : req.body.fileName } }
         )
          var result = ({
            "contentOriginalName":  req.body.fileName
          })
      
        if (success.nModified==0) {
            sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Content Not Found With Id",null);
        } 
        else {
            sendResponse.to_user(res, 200, null, "Content Updated Successfully",result);
        } 
    } catch (e) {
       
        sendResponse.to_user(res, 400, e, 'Something went wrong');
    }
},
"getMyContent": async(req, res) => {
  try {
    
      var obj = await db.myContents.find({})
     
      if (obj!='') {

          sendResponse.to_user(res, 200, null, "Content get successfully",obj);
      } else {
          sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable",null);
      }
  } catch (e) {
      
      sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
  }
},

 

 
}
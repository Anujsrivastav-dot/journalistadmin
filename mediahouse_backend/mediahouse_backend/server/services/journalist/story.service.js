const db = require("../../dbConnection/dao");
const sendResponse = require("../../helpers/responseHandler");
// const generate = require("../../helpers/generateAuthToken");
// const uploadFile = require("../../helpers/uploadImage");
// var multer = require("multer");
// let path = require('path');
// let fs = require('fs');
// let mv = require('mv');
// let waterfall = require("async-waterfall");
// let async = require("async");


module.exports ={
  "postStory": async(req, res) => {
    try {
         var imageArray=req.files;
             var textNote =req.body.textNote.split(",");
             var imageNote =req.body.imageNote.split(",");
             var videoNote =req.body.videoNote.split(",");
             var docNote =req.body.docNote.split(",");
             var thumbnaleNote =req.body.thumbnaleNote.split(",");
             var audioNote =req.body.audioNote.split(","); 
             var uploadTexts=[];
             var uploadImages=[];
             var uploadVideos=[];
             var uploadThumbnails=[];
             var supportingDocs=[];
             var uploadAudios=[];
             var l=0;
             imageArray['uploadTexts'].forEach(txt => {

              uploadTexts.push({text:txt['filename'],textNote:textNote[l]},);
              l++;
            });
            var k=0;
            imageArray['uploadImages'].forEach(img => {
              uploadImages.push({Image:img['filename'],imageNote:imageNote[k]},);
            k++;
            });
              var  j=0;
              imageArray['uploadVideos'].forEach(vid => {
                if(vid['mimetype']=="video/mp4"){
                  uploadVideos.push({video:vid['filename'],videoNote:videoNote[j]},);
                  j++;
                }
                 else{
                  sendResponse.to_user(res, 400, "File_type_Error", "Please upload valid file");
                 }
              });
            var i=0;
            imageArray['uploadThumbnails'].forEach(thumb => {
              uploadThumbnails.push({thumbnale:thumb['filename'],thumbnaleNote:thumbnaleNote[i]},);
            i++; 
            });
            var m=0;
            imageArray['supportingDocs'].forEach(docs => {
              supportingDocs.push({doc:docs['filename'],docNote:docNote[m]},);
              m++; 
            });
            var n=0;
            imageArray['uploadAudios'].forEach(audio => {
              uploadAudios.push({audio:audio['filename'],audioNote:audioNote[n]},);
              n++; 
            });
           
            req.body.uploadTexts=uploadTexts; 
            req.body.uploadImages=uploadImages;
            req.body.uploadVideos=uploadVideos;
            req.body.uploadThumbnails=uploadThumbnails;
            req.body.supportingDocs=supportingDocs;
            req.body.uploadAudios=uploadAudios;
            req.body.keywordId = req.body.keywordId.split(",");
        var story = new db.story(req.body);
        await story.save();
        sendResponse.to_user(
          res,
          200,
          null,
          "Story post successfully",
          story
        );
      
    } catch (e) {
      console.log("err====", e);
      sendResponse.to_user(res, 400, e, "Something went wrong");
    }
  },

"sellStory": async(req, res) => {
  try {
       var imageArray=req.files;
           var textNote =req.body.textNote.split(",");
           var imageNote =req.body.imageNote.split(",");
           var videoNote =req.body.videoNote.split(",");
           var docNote =req.body.docNote.split(",");
           var thumbnaleNote =req.body.thumbnaleNote.split(",");
           var audioNote =req.body.audioNote.split(","); 
           var uploadTexts=[];
           var uploadImages=[];
           var uploadVideos=[];
           var uploadThumbnails=[];
           var supportingDocs=[];
           var uploadAudios=[];
           var l=0;
           imageArray['uploadTexts'].forEach(txt => {
            uploadTexts.push({text:txt['filename'],textNote:textNote[l]},);
            l++;
          });
          var k=0;
          imageArray['uploadImages'].forEach(img => {
            uploadImages.push({Image:img['filename'],imageNote:imageNote[k]},);
          k++;
          });
          var  j=0;
          imageArray['uploadVideos'].forEach(vid => {
            uploadVideos.push({video:vid['filename'],videoNote:videoNote[j]},);
          j++; 
          });
          var i=0;
          imageArray['uploadThumbnails'].forEach(thumb => {
            uploadThumbnails.push({thumbnale:thumb['filename'],thumbnaleNote:thumbnaleNote[i]},);
          i++; 
          });
          var m=0;
          imageArray['supportingDocs'].forEach(docs => {
            supportingDocs.push({doc:docs['filename'],docNote:docNote[m]},);
            m++; 
          });
          var n=0;
          imageArray['uploadAudios'].forEach(audio => {
            uploadAudios.push({audio:audio['filename'],audioNote:audioNote[n]},);
            n++; 
          });
          req.body.typeStatus="1";
          req.body.uploadTexts=uploadTexts;
          req.body.uploadImages=uploadImages;
          req.body.uploadVideos=uploadVideos;
          req.body.uploadThumbnails=uploadThumbnails;
          req.body.supportingDocs=supportingDocs;
          req.body.uploadAudios=uploadAudios;
          req.body.keywordId = req.body.keywordId.split(",");
      var story = new db.story(req.body);
      await story.save();
      sendResponse.to_user(
        res,
        200,
        null,
        "Story post successfully",
        story
      );
    
  } catch (e) {
    console.log("err====", e);
    sendResponse.to_user(res, 400, e, "Something went wrong");
  }
},

"getStory": async (req, res) => {
  try {
      var obj = await db.story.find({typeStatus:1,country:req.query.countryId});
      if (obj != '') {
          sendResponse.to_user(res, 200, null, "Story  get successfully", obj);
      } else {
          sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable", null);
      }
  } catch (e) {

      sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
  }
},

"getSaveStory": async (req, res) => {
  try {
      var obj = await db.story.find({typeStatus:0,journalistId:req.query.journalistId});
      if (obj != '') {
          sendResponse.to_user(res, 200, null, "Story  get successfully", obj);
      } else {
          sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable", null);
      }
  } catch (e) {

      sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
  }
},
"getMyStory": async (req, res) => {
  try {
    
      var obj = await db.story.find({typeStatus:1,journalistId:req.query.journalistId});
      if (obj != '') {
          sendResponse.to_user(res, 200, null, "Story  get successfully", obj);
      } else {
          sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable", null);
      }
  } catch (e) {

      sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
  }
},

"getFavouriteStory": async (req, res) => {
  try {
    
      var obj = await db.story.find({_id:req.query.storyId,journalistId:req.query.journalistId});
      if (obj != '') {
          sendResponse.to_user(res, 200, null, "Story  get successfully", obj);
      } else {
          sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable", null);
      }
  } catch (e) {

      sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
  }
},

"storyFilterByStoryCategory": async (req, res) => {
  try {
      var obj = await db.story.find({storyCategoryId:req.query.storyCategoryId,country:req.query.countryId});
      if (obj != '') {
          sendResponse.to_user(res, 200, null, "Story  get successfully", obj);
      } else {
          sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable", null);
      }
  } catch (e) {

      sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
  }
},

"storyFilterByCategory": async (req, res) => {
  try {
      var obj = await db.story.find({categoryId:req.query.categoryId,country:req.query.countryId});
      if (obj != '') {
          sendResponse.to_user(res, 200, null, "Story  get successfully", obj);
      } else {
          sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable", null);
      }
  } catch (e) {

      sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
  }
},

"storyFilter": async (req, res) => {
  try {
      var obj = await db.story.find({langCode:req.query.langCode,
                                     storyCategoryId:req.query.storyCategoryId,
                                     categoryId:req.query.categoryId,
                                     country:req.query.countryId,
                                     state:req.query.state,
                                     city:req.query.city,
                                     keywordId:req.query.keywordId,
                                     journalistId:req.query.journalistId
                                    });
      if (obj != '') {
          sendResponse.to_user(res, 200, null, "Story  get successfully", obj);
      } else {
          sendResponse.to_user(res, 204, "NO_CONTENT", "No Data Avilable", null);
      }
  } catch (e) {

      sendResponse.to_user(res, 400, "Bad request", 'Something went wrong');
  }
},

"updateStory": async(req, res) => {
  try {
           const filter = { _id: req.body.storyId };
           var imageArray=req.files;
           var textNote =req.body.textNote.split(",");
           var imageNote =req.body.imageNote.split(",");
           var videoNote =req.body.videoNote.split(",");
           var docNote =req.body.docNote.split(",");
           var thumbnaleNote =req.body.thumbnaleNote.split(",");
           var audioNote =req.body.audioNote.split(","); 
           var uploadTexts=[];
           var uploadImages=[];
           var uploadVideos=[];
           var uploadThumbnails=[];
           var supportingDocs=[];
           var uploadAudios=[];
           var l=0;
           imageArray['uploadTexts'].forEach(txt => {

            uploadTexts.push({text:txt['filename'],textNote:textNote[l]},);
            l++;
          });
          var k=0;
          imageArray['uploadImages'].forEach(img => {
            uploadImages.push({Image:img['filename'],imageNote:imageNote[k]},);
          k++;
          });
            var  j=0;
            imageArray['uploadVideos'].forEach(vid => {
              if(vid['mimetype']=="video/mp4"){
                uploadVideos.push({video:vid['filename'],videoNote:videoNote[j]},);
                j++;
              }
               else{
                sendResponse.to_user(res, 400, "File_type_Error", "Please upload valid file");
               }
            });
          var i=0;
          imageArray['uploadThumbnails'].forEach(thumb => {
            uploadThumbnails.push({thumbnale:thumb['filename'],thumbnaleNote:thumbnaleNote[i]},);
          i++; 
          });
          var m=0;
          imageArray['supportingDocs'].forEach(docs => {
            supportingDocs.push({doc:docs['filename'],docNote:docNote[m]},);
            m++; 
          });
          var n=0;
          imageArray['uploadAudios'].forEach(audio => {
            uploadAudios.push({audio:audio['filename'],audioNote:audioNote[n]},);
            n++; 
          });
         
          req.body.uploadTexts=uploadTexts; 
          req.body.uploadImages=uploadImages;
          req.body.uploadVideos=uploadVideos;
          req.body.uploadThumbnails=uploadThumbnails;
          req.body.supportingDocs=supportingDocs;
          req.body.uploadAudios=uploadAudios;
          req.body.keywordId = req.body.keywordId.split(",");
          const update =req.body ;
          var success = await db.story.findByIdAndUpdate(filter, update, {
            new: true
            })
            if (!success) {
                sendResponse.to_user(res, 404, "DATA_NOT_FOUND", "Story Not Found With Id", null);
            }
            else {
                sendResponse.to_user(res, 200, null, "Story Updated Successfully", success);
            }
     // var story = new db.story(req.body);
      await story.save();
      sendResponse.to_user(
        res,
        200,
        null,
        "Story post successfully",
        story
      );
    
  } catch (e) {
    console.log("err====", e);
    sendResponse.to_user(res, 400, e, "Something went wrong");
  }
},
 
}
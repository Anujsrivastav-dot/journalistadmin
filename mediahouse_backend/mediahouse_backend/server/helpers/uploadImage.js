var multer = require("multer");
// const util = require("util");

//     module.exports={
//         uploadProfile
//     }
    
//  async function uploadProfile(req, res) {
//     // console.log('req in file',req.file.mimetype)
     
//         var storage = multer.diskStorage({
//             destination: function(req, file, callback) {
//               console.log(req.file)
//                 callback(null, 'images')
//             },
//             filename: function(req, file, callback) {
//                  callback(null, `imageupload_${file.originalname}`)
//             }
//           });
//          multer({ storage : storage}).single("profilePic");
//         return req.files.name;
//      }
//         // return req.files[0].filename
// var multer = require('multer');
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/images/uploads')   
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)      
//     }
// })
// var upload = multer({ storage: storage });
//     // }

        //    var uploadProfile = multer.diskStorage({
        //     destination: function(req, file, callback) {
        //       console.log(req.body)
        //         callback(null, 'uploads')
        //     },
        //     filename: function(req, file, callback) {
        //          callback(null, `imageupload_${file.originalname}`)
                
        //     }
          
        //   })
        //   module.exports = uploadProfile;
        // let upload = multer({ storage:uploadProfile }).single('file');
        // module.exports = upload;
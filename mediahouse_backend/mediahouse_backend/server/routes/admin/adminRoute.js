let express = require('express');
let router = express.Router();
let validate = require('../../middleware/validation')
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
    callback(null, 'uploads')
    },
    filename: function(req, file, callback) {
    callback(null, "uploads" + file.originalname)
    }
  });
  var upload = multer({ storage : storage
  });
let auth = require('../../middleware/auth');
let varify = require('../../middleware/verifyToken');
let config = require('../../helpers/config')();
const sendRes = require("../../helpers/responseHandler");


// check validation result
function checkValidationResult(req, res, next) {
    var result = validationResult(req).array();
    console.log(result)
    result.length ? sendRes.to_user(res, 403, result[0].msg) : next()
}


// admin services
let admin = require("../../services/admin/admin.service");
let content = require("../../services/admin/staticContent.service");

//var cpUpload = upload.fields([{ name: 'video', maxCount: 8 }, { name: 'file', maxCount: 8 }])
//admin.adminInit();
//router for Admin
// router.post("/forgot",admin.forgot);
// router.post("/forgot",admin.forgot);array
router
.route("/forgot")
.post(admin.forgot);
router
.route("/resend")
.post(admin.resend);
router
.route("/getall-data")
.get(admin.getdata1);

router
.route("/updatedata/:id")
.put(upload.single("file"),admin.editprofile);

router
.route("/verify-otp")
.get(admin.verifyOTP);
router
.route("/changepassword")
.post(admin.newpassword);
router
    .route('/admin')
    .post(admin.add)
    .get(admin.get, varify.verifyUserToken);
router.route("/login").post(
    validate.adminLoginReq,
    (req, res, next) => {
        checkValidationResult(req, res, next);
    },
    admin.adminLogin
);

router.route("/getjournalistdetails").get(admin.journalistdata)
//router for designation
router
    .route('/designation')
    .post(validate.designationReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.addDesignation)

    .get(admin.getDesignation)

    .put(validate.designationReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.updateDesignation)

    .delete(admin.deleteDesignation)



//router for benifit  of platform  
router
    .route('/benefit')
    .post(validate.benefitReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.addBenefit)

    .get(admin.getBenefit)

    .put(validate.benefitReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.updateBenefit)

    .delete(admin.deleteBenefit)

//router for category    
router
    .route('/category')
    .post(validate.categoryReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.addCategory)

    .get(admin.getCategory)

    .put(validate.categoryReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.updateCategory)

    .delete(admin.deleteCategory)

//router for story category    
router
    .route('/storyCategory')
    .post(validate.storyCategoryReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.addStoryCategory)

    .get(admin.getStoryCategory)

    .put(validate.storyCategoryReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.updateStoryCategory)

    .delete(admin.deleteStoryCategory)

//router for story type    
router
    .route('/storyType')
    .post(validate.storyTypeReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.addStoryType)

    .get(admin.getStoryType)

    .put(validate.storyTypeReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.updateStoryType)

    .delete(admin.deleteStoryType)

//router for story  Keyword     
router
    .route('/storyKeyword')
    .post(validate.storyKeywordReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.addStoryKeyword)

    .get(admin.getStoryKeyword)

    .put(validate.storyKeywordReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.updateStoryKeyword)

    .delete(admin.deleteStoryKeyword)

//router for list of journalist  
router
    .route('/journalist')
    .get(admin.getJournalist)
    .put(validate.journalistReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.updateJournalist)

//router for static content 

router
    .route('/staticContent')
    .get(content.getContent)
    .put(content.updateContent)

//router for story  Keyword     
router
    .route('/socioLinks')
    .post(validate.socioLinkReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.addSocioLinks)

    .get(admin.getSocioLinks)

    .put(validate.socioLinkReq, (req, res, next) => {
        checkValidationResult(req, res, next)
    }, admin.updateSocioLinks)

    .delete(admin.deleteSocioLinks)

module.exports = router;
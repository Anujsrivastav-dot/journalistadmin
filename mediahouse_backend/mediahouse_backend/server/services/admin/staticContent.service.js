const db = require("../../dbConnection/dao");
const sendResponse = require("../../helpers/responseHandler");

async function inIt() {

    var data = await db.staticContent.findOne({})
    if (!data) {
        var obj = {
            termsAndCondition: "Please put here.",
            help: "Please put here.",
            aboutUs: "Please put here.",
            privacy: "Please put privacy policy"
        };
        var contentData = new db.staticContent(obj);
        saveContent = await contentData.save();
        if (saveContent) {
            console.log("Static data saved");
        } else {
            console.log("Something went wrong to in static content!");
        }
    }
}
inIt();

module.exports = {

    "getContent": async (req, res) => {
        try {
            var selectField = '';
            if (req.query.type == "term") {
                selectField = 'termsAndCondition';
            } else if (req.query.type == "help") {
                selectField = 'help';
            } else if (req.query.type == "aboutUs") {
                selectField = 'aboutUs';
            } else if (req.query.type == "privacy") {
                selectField = 'privacy';
            } else {
                throw "Invalid type"
            }
            var success = await db.staticContent.findOne({}, selectField);
            sendResponse.to_user(res, 200, null, "Content list found", success);
        } catch (e) {
            // console.log(e)
            sendResponse.to_user(res, 400, e, "Something went wrong");
        }
    },

    "updateContent": async (req, res) => {
        try {
            var contentData = await db.staticContent.findByIdAndUpdate(req.body.contentId, req.body, {
                new: true
            });
            if (contentData) {
                sendResponse.to_user(res, 200, null, "Content updated successfully", contentData);
            } else {
                sendResponse.to_user(res, 200, null, "ContentId doesn't exists", null);
            }
        } catch (e) {
            console.log(e)
            sendResponse.to_user(res, 400, e, "Something went wrong");
        }
    },
}
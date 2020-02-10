const jwt = require("jsonwebtoken");
var sendResponse = require("../helpers/responseHandler");



module.exports.verifyUserToken = function (req, res, next) {
	if (!req.headers.hasOwnProperty("token")) {
		sendResponse.withOutData(res, 402, "token requireed");
	}
	else {
		jwt.verify(req.headers.token, "asddf", function (err, token) {
			if (err) {
				sendResponse.withOutData(res, 404, " invalid token");
			}
			else {
				next()
			}
		})
	}
}
module.exports = {
    withOutData,
    withObjectData,
    toUser,
    to_user
};

function to_user(res, code, error, resMsg, data) {
    var res_data = {
        responseCode: code,
        responseMessage: resMsg,
        error: error
    }
    if (data) {
        res_data.result = data;
    }
    res.status(code).send(res_data);
}

function withOutData(res, responseCode, responseMessage) {
    res.send({
        responseCode: responseCode,
        responseMessage: responseMessage
    });
}

function withObjectData(res, responseCode, responseMessage, result) {
    res.send({
        responseCode: responseCode,
        responseMessage: responseMessage,
        result: result
    });
}


function toUser(res, success, sendResponse, resMsg, otherMsg = "Something went wrong") {
    if (!success) withOutData(res, 500, otherMsg);
    else if (success) {
        if (Array.isArray(success)) {
            if (success.length && sendResponse) withObjectData(res, 200, resMsg, success);
            else withOutData(res, 200, resMsg);

        } else {
            if (sendResponse) withObjectData(res, 200, resMsg, success);
            else withOutData(res, 200, resMsg);

        }
    } else withOutData(res, 404, otherMsg);

}
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');
var staticContent = new Schema({
    termsAndCondition: {
        type: String
    },
    privacy: {
        type: String
    },
    aboutUs: {
        type: String
    },
    help: {
        type: String
    },
    status: {
        type: Number,
        default: 1 // status 1 is Active and 0 is Delete
    }
}, {
    timestamps: true
});
staticContent.plugin(mongoosePaginate);
module.exports = mongoose.model('staticContent', staticContent);
var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    benefit = new Schema({
        benefitName: {
            type: String
        },
        status: {
            type: Number,
            default: 1 // status 1 is Active and 0 is inActive/delete
        }
    },{
        timestamps:true
    })

benefit.plugin(mongoosePaginate);
module.exports = mongoose.model('benefit', benefit, 'benefit');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongoosePaginate = require('mongoose-paginate'),
    ObjectId = Schema.ObjectId,
    enquiry = new Schema({
       
        enquiryTitle:{
                type:String
                },
        enquiryDescription:{
                type:String
                },
        status: {
                type: Number,
                default: 0 // status 1 is Active and 0 is inActive/delete
                },  
    },{     
        timestamps:true
    })
    enquiry.plugin(mongoosePaginate);
module.exports = mongoose.model('enquiry', enquiry, 'enquiry');
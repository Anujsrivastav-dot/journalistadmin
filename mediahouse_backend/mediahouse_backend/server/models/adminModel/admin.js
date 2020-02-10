var mongoose = require('mongoose'),
// moment = require('moment');
//  var hourFromNow = function(){
//     return moment().add(20, 'seconds');
// };
 
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
   admin = new Schema({
        email:{type:String},

    file:{type:String},
    
        adminName: {
            type: String
        },
        adminEmail: {
            type: String
        },
        password: {
            type: String
        },
        OTP:{type:Number},
   reset_password_expires:{  type : Date, default: Date.now }

        

    }, {
        timestamps: true
    })

 admin.plugin(mongoosePaginate);
 //admin.index({createdAt: 1},{expireAfterSeconds: 36});
module.exports = mongoose.model('admin', admin, 'admin');



  
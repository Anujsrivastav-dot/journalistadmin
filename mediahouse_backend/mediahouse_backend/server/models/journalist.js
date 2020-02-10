var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    journalist = new Schema({
        langCOde:{
            type:String
        },
        designationId:{
            type:String
        },
        profilePic:{
            type:String
        },
        firstName:{
            type:String
        },
        middleName:{
            type:String
        },
        lastName:{
            type:String
        },
        emailId: {
            type: String
        },
        mobileNumber:{
            type: String
        },
        countryId:{
            type: String
        },
        stateId:{
            type: String
        },
        pincodeId:{
            type:String
        },
        currency:{
            type:String
        },
        shortBio:{
            type:String
        },
        password: {
            type: String 
        },
        mobileNumber: {
            type: Number
        },
        otp: {
            type: Number
        },
        verifyOtp: {
            type: Boolean,
            default: false
        },
        areaOfInterests: [{
            areaOfInterestId:String
          }],
          targetAudiences: [{
            audienceCountryId:String
          }],
          resumeDetails:{
              type:String
          },
          uploadResume:{
              type:String
          },
          refrences: [{
            firstName:{
                type:String,
                 },
              middleName:{
                  type:String
                 },
              lastName:{
                  type:String
                 },
              email:{
                 type:String 
                },
              designation:{
                  type:String
                },
              phoneNumber:{
                  type:String
                }
          }],
          previousWorks: [{
            title:{
                type:String,
                 },
              link:{
                  type:String
                 },
          }],
          socialAccountLinks: [{
            facebookLink:{
                type:String,
                 },
              twitterLink:{
                  type:String
                 },
                 linkedinLink:{
                    type:String
                   },
                   snapChat:{
                    type:String
                   },
                   instagram:{
                    type:String
                   },
                   instagram:{
                    type:String
                   },
          }],
          platformBenefits: [{
            platformBenefitId:{
                type:String,
                 },
            
          }],
          platformSuggestion:{
              type:String
          },
          paymentStatus:{
            type:Number //0 for inactive 1 for active 
          },
        status: {
            type: Number,
            default: 1   // 0 for inactive 1 for pending 2 for active
        }                   
},{
    timestamps:true
});




 journalist.plugin(mongoosePaginate);
module.exports = mongoose.model('journalist', journalist, 'journalists');
//module.exports  = mongoose.model('session', session, 'session');
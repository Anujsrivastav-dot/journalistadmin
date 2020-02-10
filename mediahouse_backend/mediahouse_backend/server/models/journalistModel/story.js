var mongoose = require('mongoose');
    // mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;
    ObjectId = Schema.ObjectId;
    story = new Schema({
        journalistId: {
            type: ObjectId,
            default: null,
            ref: 'journalists'
        },
        headLine:{
            type:String
        },
        categoryId:{
            type:ObjectId,
            default:null,
            ref:'category'
        },
        storyCategoryId:{
            type:ObjectId,
            default:null,
            ref:'storyCategories'
        },
        keywordId:[
            {
            type:ObjectId,
            default:null,
            ref:'storyKeyword'
         }
       ],
        langCode:{
            type:String
        },
        date:{
            type:Date
        },
        country:{
            type:String
        },
        state: {
            type: String
        },
        city:{
            type: String
        },
        briefDescription:{
            type: String
        },
        pincode:{
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
        phoneNumber: {
            type: Number
        },
        uploadTexts:[{
            text:{
                type:String
            },
            textNote:{
                type:String
            },
        }],
        uploadImages:[{
            Image:{
                type:String
            },
            imageNote:{
                type:String
            },
        }],
        uploadVideos:[{
            video:{
                type:String
            },
            videoNote:{
                type:String
            },
        }],
        uploadThumbnails:[{
            thumbnale:{
                type:String
            },
            thumbnaleNote:{
                type:String
            },
        }
        ],
        supportingDocs:[{
            doc:{
                type:String
            },
            docNote:{
                type:String
            },
        }],
        uploadAudios:[{
            audio:{
                type:String
            },
            audioNote:{
                type:String
            },
        }],
        currency:{
            type:String
        },
        price:{
            type:String
        },
        collaborationGroupId:{
            type:String
        },
        purchasingLimit:{
            type:String
        },
        status: {
            type: Number,
            default: 1   // 0 for inactive 1 for active 
        }, 
        typeStatus: {
            type: Number,
            default: 0   // 0 for save story 1 for post story 
        }, 
        collaboratedStatus: {
            type: Number,
            default: 0   // 0 for inactive 1 for pending 2 for active
        }                   
},{
    timestamps:true
});




// story.plugin(mongoosePaginate);
module.exports = mongoose.model('story', story, 'stories');
//module.exports  = mongoose.model('session', session, 'session');
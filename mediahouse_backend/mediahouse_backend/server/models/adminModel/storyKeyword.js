var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    storyKeyword = new Schema({
        storyKeywordName:{
            type:String
        },
        status: {
            type: Number,
            default: 1   // 0 for inactive 1 for pending 2 for active
        }                   
},{
    timestamps:true
});


module.exports = mongoose.model('storyKeyword', storyKeyword, 'storyKeywords');
//module.exports  = mongoose.model('session', session, 'session');
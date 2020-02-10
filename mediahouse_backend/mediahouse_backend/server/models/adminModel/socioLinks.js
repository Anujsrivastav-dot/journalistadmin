var mongoose = require('mongoose'),
   // mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    socioLinks = new Schema({
       
        facebookLink: {
            type: String
        },
        linkedinLink: {
            type: String
        },
        youtubeLink: {
            type: String
        },
        twitterLink: {
            type: String
        },
        instagramLink: {
            type: String
        },
    }, {
        timestamps: true
    })

 //socioLinks.plugin(mongoosePaginate);
module.exports = mongoose.model('socioLinks', socioLinks, 'socioLinks');
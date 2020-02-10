var mongoose = require('mongoose');
var config = require('../helpers/config')();
mongoose.Promise = global.Promise;
mongoose.connection.openUri(config.DB_URL, {
    useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false
});


/*********** Events of mongoose connection. ****************/
// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open to ' + config.DB_URL);
})

// If the connection throws an error
mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err);
});
// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});
// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});


module.exports = {
    
    category: require("../models/adminModel/category"),
    journalist: require("../models/journalistModel/journalist"),
    story: require("../models/journalistModel/story"),
    myContents: require("../models/journalistModel/myContent"),
    enquiry: require("../models/journalistModel/enquiry"),
    admin: require("../models/adminModel/admin"),
    designation: require("../models/adminModel/designation"),
    benefit: require("../models/adminModel/platformBenefits"),
    category: require("../models/adminModel/category"),
    storyCategory: require("../models/adminModel/storyCategory"),
    storyType: require("../models/adminModel/storyType"),
    storyKeyword: require("../models/adminModel/storyKeyword"),
    staticContent: require("../models/adminModel/staticContent"),
    socioLinks: require("../models/adminModel/socioLinks")
   
   
}
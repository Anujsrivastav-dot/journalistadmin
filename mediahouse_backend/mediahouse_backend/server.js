let express = require("express");
let app = express();
let mongoose = require('mongoose')
let bodyParser = require("body-parser");
let morgan = require("morgan");
let helmet = require("helmet");

let config = require("./server/helpers/config")();
var cors = require('cors')
app.use(cors())

// connect with database
require("./server/dbConnection/dao")
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

mongoose.Promise = global.Promise;
// global.imagePath = __dirname + '/images/';

// use morgan to log requests to the console
app.use(morgan("dev"));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ("OPTIONS" === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});


//======= Dependency for upload file =======
// const fileUpload = require('express-fileupload');

// app.use(fileUpload())
// Allow to access image in storage directory
// app.use("/images", express.static( '/images'));

//apply the routes to our application with the mediaBazar /api
app.use("/admin", require("./server/routes/admin/adminRoute"));
app.use("/user", require("./server/routes/journalist/journalistRoute"));
app.use("/story", require("./server/routes/journalist/storyRoute"));

//Route for mobile Api
app.use("/api/user", require("./server/routes/mobileRoutes/journalist_route"));

// client side static folder  

app.use(express.static("admin"));
app.use(express.static("user"));

// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/admin/index.html');
// });

// app.get('*', function(req, res) {
//     res.sendFile(__dirname + '/admin/index.html')
// })

// start the server =========
let listener = app.listen(config.PORT, function (err, success) {
    console.log("Api started on port-->> " + listener.address().port);
});
module.exports = function() {
    var env = "devEnv";
    var devEnv = {
        "PORT": 8094,
        "DB_URL": 'mongodb://localhost/media_bazar',
        "secretKey": '<@media_bazar@>',
    }
    var prodEnv = {
        "PORT": 8094,
        "DB_URL": 'mongodb://localhost/media_bazar',
        "secretKey": '<@media_bazar@>',
    }
    return env == "devEnv" ? devEnv : prodEnv;


}
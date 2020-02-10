var crypto = require("crypto"),
  algorithm = "aes-256-cbc";
password = "abcabcbacbbcabcbbacbbacbabcbabcbac125DCAPPLICATION";

module.exports = {
  encrypt,
  decrypt
};

function encrypt(text) {
  var cipher = crypto.createCipher(algorithm, password);
  var crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}

function decrypt(text) {
  // console.log(text)
  var decipher = crypto.createDecipher(algorithm, password);
  var dec = decipher.update(text, "hex", "utf8");

  dec += decipher.final("utf8");
  return dec;
}

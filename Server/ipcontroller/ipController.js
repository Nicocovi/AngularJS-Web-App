var http = require('http');
var publicIp = require('public-ip');
var request = require("request");
var Config = require('../config/config.js');

var url = Config.uri.link;

function passPublicIp() {
   publicIp.v4().then(ip => {
           console.log(ip);
           //Pass actual ip
            request({
                uri: url+ip,
                method: "POST",
            }, function(error, response, body) {
                console.log(body);
            });
   });
}
var time = 3600;
setInterval(passPublicIp, 600*1000);
var http = require('http');
var publicIp = require('public-ip');
var request = require("request");

function passPublicIp() {
   publicIp.v4().then(ip => {
           console.log(ip);
           //Pass actual ip
            request({
                uri: "http://www.nicolascorpanchovillasana.com/rasp/writeip.php?ip="+ip,
                method: "POST",
            }, function(error, response, body) {
                console.log(body);
            });
   });
}
var time = 360;
setInterval(passPublicIp, time*1000);
var http = require('http');
var publicIp = require('public-ip');

function passPublicIp() {
   publicIp.v4().then(ip => {
           console.log(ip);
           //Pass actual ip
            request({
                uri: "http://www.nicolascorpanchovillasana.com/rasp/writeip?ip="+ip,
                method: "GET",
            }, function(error, response, body) {
                console.log(body);
            });
   });
}
var time = 360;
setInterval(sendEmail, 10*1000);
var sys = require('sys');
var exec = require('child_process').exec;
    /*
    function puts(error, stdout, stderr) { sys.puts(stdout) }
    exec("~/path/to/nodejs/restartscript.sh", puts);

    sudo apt-get install cec-utils
    Turn tv on: echo on 0 | cec-client -s -d 1
    Turn tv off: echo standby 0 | cec-client -s -d 1
    Tv status: echo pow 0 | cec-client -s -d 1
    */

module.exports.turnon = function (req, res) {
    console.log("turning on tv");
    exec("echo on 0 | cec-client -s -d 1");
    return res.status(200).send("turning on tv");
};

module.exports.turnoff = function (req, res) {
    console.log("turning off tv");
    exec("echo standby 0 | cec-client -s -d 1");
    return res.status(200).send("turning off tv");
};

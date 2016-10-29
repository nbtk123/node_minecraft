var express = require('express');
var app = express();
var sys = require('sys')
var exec = require('child_process').exec;

// Somehow related to the child-process
function puts(error, stdout, stderr) { sys.puts(stdout) }

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/time', function (req, res) {
  exec("screen -S minecraft -X stuff '/time query daytime\n'", puts);
  res.send('Time queried!');
});

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});

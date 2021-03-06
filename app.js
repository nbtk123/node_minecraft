var express = require('express');
var app = express();
var sys = require('sys')
var exec = require('child_process').exec;
var bodyParser = require('body-parser')

// Somehow related to the child-process
function puts(error, stdout, stderr) { sys.puts(stdout) }

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/time', function (req, res) {
  exec("screen -S minecraft -X stuff '/time query daytime\n'", puts);
  res.send('Time queried!');
});

app.post('/command', function (req, res) {
  try {
    var command = req.body.command;
    console.log('command: ' + command);
    exec("screen -S minecraft -X stuff '" + command + "\n'", puts);
    res.send(command + 'Executed!');
  } catch(e) {
    console.log(e);
    res.send(e);
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

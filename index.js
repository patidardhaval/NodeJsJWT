const chokidar = require('chokidar');
var express = require('express');
const history = require('connect-history-api-fallback');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const fs = require('fs');
var path = require("path");

var api = require('./api');

// Enable reverse proxy support in Express. This causes the
// the "X-Forwarded-Proto" header field to be trusted so its
// value can be used to determine the protocol. See 
// http://expressjs.com/api#app-settings for more details.
app.enable('trust proxy');

// Add a handler to inspect the req.secure flag (see 
// http://expressjs.com/api#req.secure). This allows us 
// to know whether the request was via http or https.
app.use (function (req, res, next) {
        if (req.secure) {
                // request was via https, so do no special handling
                next();
        } else {
                // request was via http, so redirect to https
                res.redirect('https://' + req.headers.host + req.url);
        }
});

app.use(history({
  verbose: true
}));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + 'public/index.html');
});

io.set('transports', ['websocket']);

io.on('connection', function(socket){
  socket.on('subscribe', function(symbol) {
        fs.exists(symbol+'.json', function(exists) {
          socket.join(symbol);
        });
    });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});



// One-liner
require('chokidar').watch('json/**/*.json', {
    ignored: /[\/\\]\./
}).on('all', function(event, fpath) {
    console.log(event, fpath);
    fs.readFile(fpath, 'utf8', function(err, contents) {
    	symbol = path.basename(fpath).replace(/\.[^/.]+$/, "");
        io.sockets.in(symbol).emit('data', contents);
    });
});


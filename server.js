"use strict";

/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */
var http = require('http');
var fs = require('fs');
var port = 3000;

//var chess = fs.readFileSync('images\\chess.jpg');
//var fern = fs.readFileSync('images/fern.jpg');

function serveImage(filename, request, response){
  var body = fs.readFile('images/' + filename, (error, body) => {
      if(error){
        console.error(error);
        response.statusCode = 500;
        response.statusMessage = "whoops!";
        response.end("Silly me!");
        return;
      }
      response.setHeader('Content-Type', 'image/jpeg');
      response.end(body);
  });
}

var server = http.createServer((request, response) => {

  switch (request.url) {
    case '/chess':
      serveImage('chess.jpg', request, response);
      break;
    case '/fern':
      serveImage('fern.jpg', request, response);
      break;
    case '/ace':
      serveImage('ace.jpg', request, response);
      break;
    case '/bubble':
      serveImage('bubble.jpg', request, response);
      break;
    case '/mobile':
      serveImage('mobile.jpg', request, response);
      break;
    default:
      response.statusCode = 404;
      response.statusMessage = 'Not Found';
      response.end(response.statusMessage);
  }

  //response.end(chess);
});

server.listen(port, () => {
  console.log('Listening on port ' + port);
});

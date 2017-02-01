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
var stylesheet = fs.readFileSync('gallery.css');
var imnageNames = ['ace', 'bubble', 'mobile', 'fern', 'chess'];

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
    case '/gallery':
    var gHtml = imnageNames.map(function(fileName){
      return '<img src="' + fileName + '" alt=""/>';
    }).join('');
      var html = '<!DOCTYPE html>';
          html += '<html>'
          html += '<head>';
          html += '<title>Gallery</title>';
          html += '<link href="gallery.css" rel="stylesheet" type="text/css"/>';
          html +='</head>';
          html += '<body>';
          html += ' <h1>Gallery</h1>';
          html += '<div id="container">';
          /*html += ' <img src="ace" alt="fishing ace at work."/>';
          html += ' <img src="chess" alt="fishing ace at work."/>';
          html += ' <img src="fern" alt="fishing ace at work."/>';
          html += ' <img src="bubble" alt="fishing ace at work."/>';
          html += ' <img src="mobile" alt="fishing ace at work."/>';*/
          html += gHtml;
          html += '</div>';
          html += ' <h1>Hello.</h1> Time is ' + Date.now();
          html += '</body>';
          html += '</html>';
      response.setHeader('Content-Type', 'text/html');
      response.end(html);
      break;
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
    case '/gallery.css':
      response.setHeader('Content-Type', 'text/css');
      response.end(stylesheet);
      break;
    default:
      response.statusCode = 404;
      response.statusMessage = 'Not Found';
      response.end();
      break;
  }

  //response.end(chess);
});

server.listen(port, () => {
  console.log('Listening on port ' + port);
});

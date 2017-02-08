"use strict";

/**
 * server.js
 * This file defines the server for a
 * simple photo gallery web app.
 */
var http = require('http');
var fs = require('fs');
var port = 3000;
var stylesheet = fs.readFileSync('gallery.css');
var config = JSON.parse(fs.readFileSync('config.json'));


function getImageNames(callback){

  fs.readdir('images/', function(error, fileNames){
    if(error){
      callback(error, undefined);
    }
    else callback(false, fileNames);

  });
}

function imageNamesToTags(fileNames){
  return fileNames.map(function(fileName){
    return `<img src="${fileName}" alt="${fileName}">`;
  });
}

function buildGallery(imageNames){
  var html = '<!DOCTYPE html>';
      html += '<html>'
      html += '<head>';
      html += '<title>'+ config.title + '</title>';
      html += '<link href="gallery.css" rel="stylesheet" type="text/css"/>';
      html +='</head>';
      html += '<body>';
      html += ' <h1>'+ config.title + '</h1>';
      html += ' <form>';
      html += '   <input type="text" name="title">';
      html += '   <input type="submit" value="Change Gallery title">';
      html += ' </form>';
      html += '<div id="container">';
      html += imageNamesToTags(imageNames).join('');
      html += '</div>';
      html += '<form action="" method="POST" enctype="multipart/form-data">';
      html += '<input type="file" name="image">';
      html += '</form>'
      html += ' <h1>Hello.</h1> Time is ' + Date.now();
      html += '</body>';
      html += '</html>';
  return html;
}

function serveGallery(request, response){
  getImageNames(function(error, imageNames){
    if(error){
      console.error(error);
      response.statusCode = 500;
      response.statusMessage = 'Server error';
      response.end();
      return;
    }
    response.setHeader('Content-Type', 'text/html');
    response.end(buildGallery(imageNames));
  })

}

function serveImage(filename, request, response){

  var body = fs.readFile('images/' + filename, (error, body) => {
      if(error){
        console.error(error);
        response.statusCode = 404;
        response.statusMessage = "whoops!";
        response.end("Silly me!");
        return;
      }
      response.setHeader('Content-Type', 'image/jpeg');
      response.end(body);
  });
}

function uploadImage(request, response){
  var buffer = '';
  request.on('error', function(){
    response. statusCode = 500;
    response.end();
  });
  request.on('data', function(data){
    buffer += data;
  });
  request.on('end', function(){
    fs.writeFile('filename', data, function(err){

      if(err)
      {
        console.error(err);
        response.statusCode = 500;
        response.end();
      }

      //serveGallery()

    });
  });
}

var server = http.createServer((request, response) => {
  var url = request.url.split('?');
  var resource = url[0];
  var queryString = url[1];

  if(queryString)
  {
    var matches = /title=(.+)($|&)/.exec(queryString);
    if(matches && matches[1])
    {
      config.title = matches[1];
      fs.writeFile('config.json', JSON.stringify(config));
    }

  }

  switch (resource) {
    case '/gallery':
    case '/':
    if(request.method == 'GET'){
      serveGallery(request, response);
    }
    else if(request.method == 'POST')
    {
      uploadPicture(req, res);
      response.end('POST ME!');
    }

      break;
    case '/gallery.css':
      response.setHeader('Content-Type', 'text/css');
      response.end(stylesheet);
      break;
    default:
      //console.log(request.url);
      serveImage(request.url, request, response);
      break;
  }
});

server.listen(port, () => {
  console.log('Listening on port ' + port);
});


//response.end(chess);

/*case '/chess':
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
  break;*/

/*var gHtml = imageNames.map(function(fileName){
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
      html += '<div id="container">';*/
      /*html += ' <img src="ace" alt="fishing ace at work."/>';
      html += ' <img src="chess" alt="fishing ace at work."/>';
      html += ' <img src="fern" alt="fishing ace at work."/>';
      html += ' <img src="bubble" alt="fishing ace at work."/>';
      html += ' <img src="mobile" alt="fishing ace at work."/>';*/
      /*html += gHtml;
      html += '</div>';
      html += ' <h1>Hello.</h1> Time is ' + Date.now();
      html += '</body>';
      html += '</html>';
  response.setHeader('Content-Type', 'text/html');
  response.end(html);*/

//var imageNames = ['ace', 'bubble', 'mobile', 'fern', 'chess'];

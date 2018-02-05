const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const requestHandler = require('./requestResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const param = query.parse(parsedUrl.query);

  const types = request.headers.accept.split(',');

  if (parsedUrl.pathname === '/') {
    htmlHandler.getIndex(request, response);
  } else if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/success') {
    requestHandler.getSuccess(request, response, types);
  } else if (parsedUrl.pathname === '/badRequest') {
    requestHandler.getBadRequest(request, response, types, param);
  } else if (parsedUrl.pathname === '/unauthorized') {
    requestHandler.getUnauthorized(request, response, types, param);
  } else if (parsedUrl.pathname === '/forbidden') {
    requestHandler.getForbidden(request, response, types);
  } else if (parsedUrl.pathname === '/internal') {
    requestHandler.getInternal(request, response, types);
  } else if (parsedUrl.pathname === '/notImplemented') {
    requestHandler.getNotImplemented(request, response, types);
  } else {
    requestHandler.getNotFound(request, response, types);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);

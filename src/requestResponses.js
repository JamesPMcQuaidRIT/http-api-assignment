const respondJSON = (request, response, status, content) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(content));
  response.end();
};

const respondXML = (request, response, status, content) => {
  let responseXML = '<response>';
  if (content.id) { responseXML = `${responseXML} <id>${content.id}</id>`; }
  responseXML = `${responseXML} <message>${content.message}</message>`;
  responseXML = `${responseXML} </response>`;

  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(responseXML);
  response.end();
};

const getSuccess = (request, response, type) => {
  const data = {
    message: 'This is a successful response',
  };

  if (type === 'text/xml') {
    return respondXML(request, response, 200, data);
  }

  return respondJSON(request, response, 200, data);
};

const getBadRequest = (request, response, type, param) => {
  const data = {
    message: 'This request has the required parameter',
  };

  if (!param.valid || param.valid !== 'true') {
    data.id = 'badRequest';
    data.message = 'Missing valid query parameter set to true';
    if (type === 'text/xml') {
      return respondXML(request, response, 400, data);
    }

    return respondJSON(request, response, 400, data);
  }

  if (type === 'text/xml') {
    return respondXML(request, response, 200, data);
  }

  return respondJSON(request, response, 200, data);
};

const getUnauthorized = (request, response, type, param) => {
  const data = {
    message: 'This request has the required parameter',
  };

  if (!param.loggedIn || param.loggedIn !== 'yes') {
    data.id = 'unauthorized';
    data.message = 'Missing loggedIn query parameter set to yes';

    if (type === 'text/xml') {
      return respondXML(request, response, 401, data);
    }
    return respondJSON(request, response, 401, data);
  }

  if (type === 'text/xml') {
    return respondXML(request, response, 200, data);
  }

  return respondJSON(request, response, 200, data);
};

const getForbidden = (request, response, type) => {
  const data = {
    id: 'forbidden',
    message: 'You do not have access to this content',
  };

  if (type === 'text/xml') {
    return respondXML(request, response, 403, data);
  }

  return respondJSON(request, response, 403, data);
};

const getInternal = (request, response, type) => {
  const data = {
    id: 'internalError',
    message: 'Internal Server Error, Something went wrong',
  };

  if (type === 'text/xml') {
    return respondXML(request, response, 500, data);
  }

  return respondJSON(request, response, 500, data);
};

const getNotImplemented = (request, response, type) => {
  const data = {
    id: 'notImplemented',
    message: 'A get request for this page has not been implemented yet. Check again later for updated content',
  };

  if (type === 'text/xml') {
    return respondXML(request, response, 501, data);
  }

  return respondJSON(request, response, 501, data);
};

const getNotFound = (request, response, type) => {
  const data = {
    id: 'notFound',
    message: 'The page you are looking for was not found',
  };

  if (type === 'text/xml') {
    return respondXML(request, response, 404, data);
  }

  return respondJSON(request, response, 404, data);
};

module.exports = {
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternal,
  getNotImplemented,
  getNotFound,
};

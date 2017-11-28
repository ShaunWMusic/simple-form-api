'use strict';

const Env = use('Env');
const Ouch = use('youch');
const Http = exports = module.exports = {};

/**
 * handle errors occured during a Http request.
 *
 * @param  {Object} error
 * @param  {Object} request
 * @param  {Object} response
 */
Http.handleError = function* (error, request, response) {
  /**
   * DEVELOPMENT REPORTER
   */
  // if (Env.get('NODE_ENV') === 'development') {
  //   return (new Ouch())
  //      .pushHandler((new Ouch.handlers.JsonResponseHandler(
  //            /* handle errors from ajax and json request only*/false,
  //            /* return formatted trace information along with error response*/false,
  //            false
  //        )))
  //      // .pushHandler(new Ouch.handlers.PrettyPageHandler())
  //      .handleException(error, request.request, response.response, (output) => {
  //        const status = error.status || 500;
  //
  //        response.status(status).send(JSON.parse(output));
  //        console.log('Error handled properly');
  //      });
  // }

  response.jsonApiError(error);
};

/**
 * listener for Http.start event, emitted after
 * starting http server.
 */
Http.onStart = function () {
  var http, options, proxy, url;

http = require("http");

url = require("url");

proxy = url.parse(process.env.QUOTAGUARDSTATIC_URL);
target  = url.parse("http://ip.jsontest.com/");

options = {
  hostname: proxy.hostname,
  port: proxy.port || 80,
  path: target.href,
  headers: {
    "Proxy-Authorization": "Basic " + (new Buffer(proxy.auth).toString("base64")),
    "Host" : target.hostname
  }
};

http.get(options, function(res) {
  res.pipe(process.stdout);
  return console.log("status code", res.statusCode);
});
};

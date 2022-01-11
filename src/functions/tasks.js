const tasks = require('./methods/tasks');
const sentry = require('./libs/sentry');

const handler = async (event) => {
  const path = event.path.replace(/(\.netlify\/functions\/)?[^/]+/, '');
  const segments = path.split('/').filter((e) => e);
  switch (event.httpMethod) {
    case 'GET':
      /* GET /.netlify/functions/tasks */
      if (segments.length === 0) {
        return tasks.list(event);
      }
      /* GET /.netlify/functions/tasks/123456 */
      if (segments.length === 1) {
        return tasks.read(event, segments[0]);
      }
      return {
        statusCode: 500,
        body: 'too many segments in GET request',
      };

      /* POST /.netlify/functions/tasks */
    case 'POST':
      return tasks.create(event);
      /* PUT /.netlify/functions/tasks/123456 */
    case 'PUT':
      if (segments.length === 1) {
        return tasks.update(event, segments[0]);
      }
      return {
        statusCode: 500,
        body: 'invalid segments in POST request, must be /.netlify/functions/tasks/123456',
      };

      /* DELETE /.netlify/functions/tasks/123456 */
    case 'DELETE':
      if (segments.length === 1 || event.queryStringParameters.filter) {
        return tasks.delete(event, segments[0]);
      }
      return {
        statusCode: 500,
        body: 'invalid segments in DELETE request, must be /.netlify/functions/tasks/123456',
      };

      /* Fallthrough case */
    default:
      return {
        statusCode: 500,
        body: 'unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE',
      };
  }
};

exports.handler = sentry.wrapHandler(handler, {
  captureTimeoutWarning: false,
});

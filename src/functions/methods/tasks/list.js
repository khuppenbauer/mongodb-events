const mongoose = require('mongoose');
const db = require('../../database/mongodb');
const Task = require('../../models/task');

const filteredResult = async (event) => {
  let result;
  const filterQuery = event.queryStringParameters.filter || '{}';
  const filter = JSON.parse(filterQuery);
  const totalCount = await Task.count(filter);
  const page = event.queryStringParameters.page || 1;
  const perPage = event.queryStringParameters.perPage || totalCount;
  const sort = event.queryStringParameters.sort || '-updatedAt';
  const options = {
    skip: (page * perPage) - perPage,
    limit: parseInt(perPage, 10),
    sort,
  };
  try {
    result = await Task.find(filter, null, options);
  } catch (err) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: err.message,
      }),
    };
  }
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Expose-Headers': 'X-Total-Count',
      'Content-Type': 'application/json',
      'X-Total-Count': totalCount.toString(),
    },
    body: JSON.stringify(result),
  };
};

const aggregationResult = async (event) => {
  let result;
  const { type, pipeline } = JSON.parse(event.queryStringParameters.query);
  if (type === 'aggregate') {
    try {
      result = await Task.aggregate(pipeline);
    } catch (err) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: err.message,
        }),
      };
    }
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Expose-Headers': 'X-Total-Count',
        'Content-Type': 'application/json',
        'X-Total-Count': result.length.toString(),
      },
      body: JSON.stringify(result),
    };
  }
  return {
    statusCode: 400,
    headers: {
      'Content-Type': 'application/json',
    },
    body: 'Type not supported',
  };
};

module.exports = async (event) => {
  const result = event.queryStringParameters.query !== undefined
    ? await aggregationResult(event) : await filteredResult(event);
  return result;
};

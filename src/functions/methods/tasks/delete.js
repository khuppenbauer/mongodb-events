const mongoose = require('mongoose');
const db = require('../../database/mongodb');
const Task = require('../../models/task');

module.exports = async (event, id) => {
  if (id) {
    try {
      await Task.findByIdAndRemove(id);
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
  } else {
    const filterQuery = event.queryStringParameters.filter;
    if (filterQuery) {
      const filter = JSON.parse(filterQuery);
      try {
        await Task.deleteMany(
          {
            _id: {
              $in: filter.id,
            },
          },
        );
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
    } else {
      return {
        statusCode: 400,
      };
    }
  }
  return {
    statusCode: 204,
  };
};

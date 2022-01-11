const mongoose = require('mongoose');
const db = require('../../database/mongodb');
const Task = require('../../models/task');

module.exports = async (event, id) => {
  const { body } = event;
  const task = JSON.parse(body);
  try {
    await Task.findByIdAndUpdate(id, task);
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
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  };
};

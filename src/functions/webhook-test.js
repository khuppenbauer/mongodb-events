const dayjs = require('dayjs');
const messages = require('./methods/messages');
const tasks = require('./methods/tasks');
const logs = require('./methods/logs');

exports.handler = async (event) => {
  const startTime = new Date().getTime();
  if (event.httpMethod === 'POST') {
    const data = JSON.parse(event.body);
    const { id: foreignKey, name, state } = data;
    await logs.create(event, { startTime, status: 200 });
    await messages.create(event, { 
      foreignKey,
      app: 'test',
      event: `${state}_${name}`
    });
    await tasks.create(event, {
      foreignKey, 
      app: 'test',
      event: `${state}_${name}`,
      executionTime: dayjs().add(5, 'minute').format(),
    });
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }
  return {
    statusCode: 405,
    body: 'Method Not Allowed',
  };
};

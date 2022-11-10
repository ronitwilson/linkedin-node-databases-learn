#!/usr/bin/env node

const http = require('http');
const mongoose = require('mongoose')
const Redis = require('ioredis')

const config = require('../config');
const App = require('../app');

const connectToMongoose = () => {
  return mongoose.connect(config.mongodb.Url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
}

const connectToRedis = () => {
  const redis =  new Redis(config.redis.port);
  redis.on('connect', ()=> {
    console.log("redis connected")
  })
  redis.on('error', () => {
    console.log('connection error reddis')
  })
  return redis
}

const redis = connectToRedis()
config.redis.client = redis

/* Logic to start the application */
const app = App(config);
const port = process.env.PORT || '3000';
app.set('port', port);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port  ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

const server = http.createServer(app);
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;

  console.info(`${config.applicationName} listening on ${bind}`);
}
server.on('error', onError);
server.on('listening', onListening);

connectToMongoose().then(() => {
  console.log("successfully connected to mongo")
}
).catch((error) => {
  console.log("error in connecting to db ")
  console.log(error)
})


// console.log(` debuggg ronitttt 2222`)
// console.log(config.redis.client)
server.listen(port);

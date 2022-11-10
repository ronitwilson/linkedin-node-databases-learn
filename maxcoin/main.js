const Mongo = require("./services/backend/MongoBackend")
const RedisBackend = require("./services/backend/RedisBackend")
const MySQLBackend = require("./services/backend/MySQLBackend")
// const CoinAPI = require("./services/CoinAPI");

async function run() {
  // const coinAPI = new CoinAPI();
  // return coinAPI.fetch();
  const mongoObj = new Mongo()
  const maxPrice = await mongoObj.getMax()
  // await mongoObj.insert()
  return (maxPrice)
}

async function runRedis() {
  const redisBasckend = new RedisBackend()
  const maxPrice = await redisBasckend.getMax()
  return (maxPrice)
}

async function runMySql() {
  const redisBasckend = new MySQLBackend()
  const maxPrice = await redisBasckend.getMax()
  return (maxPrice)
}
runMySql()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.error(err));

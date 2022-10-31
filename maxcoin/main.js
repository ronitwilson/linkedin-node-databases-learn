const Mongo = require("./services/backend/MongoBackend")
// const CoinAPI = require("./services/CoinAPI");

async function run() {
  // const coinAPI = new CoinAPI();
  // return coinAPI.fetch();
  const mongoObj = new Mongo()
  await mongoObj.getMax()
  return ("connection done")
}


run()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.error(err));

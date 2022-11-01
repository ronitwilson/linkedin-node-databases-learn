const Mongo = require("./services/backend/MongoBackend")
// const CoinAPI = require("./services/CoinAPI");

async function run() {
  // const coinAPI = new CoinAPI();
  // return coinAPI.fetch();
  const mongoObj = new Mongo()
  const maxPrice = await mongoObj.getMax()
  // await mongoObj.insert()
  return (maxPrice)
}


run()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.error(err));

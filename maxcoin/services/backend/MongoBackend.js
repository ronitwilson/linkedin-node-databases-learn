/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */

const {MongoClient, Logger} = require('mongodb')
const CoinAPI = require('../CoinAPI');

class MongoBackend {

  constructor() {
    this.coinAPI = new CoinAPI();
    this.mongoUrl = "mongodb://localhost:37017/"
    this.client = null
    this.collection = null
  }

  async connect() {
    Logger.setLevel('debug')
    const mongoClient = new MongoClient(this.mongoUrl, {useUnifiedTopology: true, loggerLevel:'debug'})
    this.client = await mongoClient.connect()
    this.collection = this.client.db("maxcoin").collection("values")
    return this.client
  }

  async disconnect() {
    if(this.client){
      console.log("disconnection")
      return this.client.close()
    }
    return false
  }

  async insert() {

    const data = await this.coinAPI.fetch();
    console.log("got data")
    this.document = []
    // console.log(data)
    Object.entries(data.bpi).forEach((entry) => {
      const temObj = {
        date: entry[0],
        price: entry[1]
      }
      this.document.push(temObj)
    })
    // console.log(this.document)
    const insertResult = await this.collection.insertMany(this.document)
    // console.log(insertResult)
    console.log(`${insertResult.insertedCount} items were inserted`)
  }

  async getMax() {
    console.log("connecting to mongo db")
    console.time()
    try {
      await this.connect()
    } catch(error) {
      console.log(`mongo db connection error ${error}`)
    }
    console.log("connected")
    console.timeEnd()

    console.log("inserting data to mongo")
    console.time("insert")
    await this.insert()
    console.timeEnd("insert")

    console.log("getting the price")
    console.time("querying")
    const maxPriceEntry = await this.max()
    console.timeEnd("querying")
    console.log(`max price obj ${maxPriceEntry}`)

    console.log("disconnecting from mongo db")
    console.time("disconnect")
    try {
      await this.disconnect()
    } catch(error) {
      console(`mongo db disconnection error ${error}`)
    }
    console.timeEnd("disconnect")
    return {
      date: maxPriceEntry.date,
      prince: maxPriceEntry.price
    }
  }

  async max() {

    return this.collection.findOne({}, {sort: {price: -1}})

  }
}

module.exports = MongoBackend;

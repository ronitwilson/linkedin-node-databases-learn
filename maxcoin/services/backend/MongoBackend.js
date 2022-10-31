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

  async insert() {}

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


    console.log("disconnecting from mongo db")
    console.time("disconnect")
    try {
      await this.disconnect()
    } catch(error) {
      console(`mongo db disconnection error ${error}`)
    }
    console.timeEnd("disconnect")
  }

  async max() {}
}

module.exports = MongoBackend;

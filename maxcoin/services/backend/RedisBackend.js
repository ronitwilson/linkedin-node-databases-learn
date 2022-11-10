/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
const Redis = require('ioredis')
const CoinAPI = require('../CoinAPI');


class RedisBackend {

  constructor() {
    this.coinAPI = new CoinAPI();
  }

  async connect() {
    this.client = new Redis(7379)
    return this.client
  }

  async disconnect() {
    return this.client.disconnect()
  }

  async insert() {
    const data = await this.coinAPI.fetch();
    console.log("got data")
    const values = []
    Object.entries(data.bpi).forEach((entry) => {
      values.push(entry[1])
      values.push(entry[0])
    })
    console.log(values)
    return this.client.zadd('maxcoin:values', values)
  }

  async getMax() {

  }

  async max() {
    console.log("connecting")
    await this.connect()
    console.log("connected")
    console.log("inserting")
    await this.insert()
    console.log("inserted")
    return("inserted")
  }
}

module.exports = RedisBackend;

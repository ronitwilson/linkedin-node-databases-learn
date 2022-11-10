/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
const mySql = require('mysql2/promise')
const CoinAPI = require('../CoinAPI');


class MySQLBackend {

  constructor() {
    this.coinAPI = new CoinAPI();
    this.connection = null
  }

  async connect() {
    this.connection = await mySql.createConnection({
      host: "localhost",
      port: 3406,
      user: "root",
      password: "mypassword",
      database: "maxcoin"
    })
    return this.connection
  }

  async disconnect() {
    this.connection.end()
  }

  async insert() {
    const data = await this.coinAPI.fetch()
    console.log("fetched data")
    const values = []
    Object.entries(data.bpi).forEach((entry) => {
      values.push([entry[0], entry[1]])
    })
    const sql = "INSERT INTO coinvalues (valuedate, coinvalue) VALUES ?"
    return this.connection.query(sql, [values])
  }

  async getMax() {
    console.log("connecting to sql db")
    console.time()
    try {
      await this.connect()
    } catch(error) {
      console.log(`sql db connection error ${error}`)
    }
    console.log("connected")
    console.timeEnd()
    console.log("inserting data to sql")
    console.time("inserted")
    await this.insert()
    console.timeEnd("inserted")

    console.log("getting the price")
    console.time("querying")
    const result = await this.max()
    console.log("output of query")
    console.log(result)
    const maxPriceEntry = result[0][0]
    console.timeEnd("querying")
    console.log(`max price obj ${maxPriceEntry}`)

    console.log("disconnecting from sql  db")
    console.time("disconnect")
    try {
      await this.disconnect()
    } catch(error) {
      console(`mongo db disconnection error ${error}`)
    }
    console.timeEnd("disconnect")
    return maxPriceEntry
  }

  async max() {
    return this.connection.query(
      "SELECT * FROM coinvalues ORDER by coinvalue DESC LIMIT 0,1"
    );
  }
}

module.exports = MySQLBackend;

const Models = require("../models/sequelize")


class OrderService {
    constructor(sequelize) {
        console.log("in order service")
        Models(sequelize)
        this.client = sequelize
        this.models = sequelize.models
    }
}

module.exports = OrderService

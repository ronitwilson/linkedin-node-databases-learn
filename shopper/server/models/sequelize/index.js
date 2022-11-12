const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Order = sequelize.define("order", {
        userId: DataTypes.STRING(24),
        email: DataTypes.STRING,
        status: DataTypes.STRING,
    });

    const OrderItem = sequelize.define("OrderItem", {
        sku: DataTypes.INTEGER,
        qty: DataTypes.INTEGER,
        name: DataTypes.STRING,
        prince: DataTypes.DECIMAL(10,2),
    })

    Order.hasMany(OrderItem);
    OrderItem.belongsTo(Order, {
        onDelete: "CASCADE",
        foreignKey: {
            allowNull: false
        },
    })
    sequelize.sync()
}   

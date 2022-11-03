const ItemModel = require("../models/mongoose/Item")

class ItemService {
    static async create(data) {
        const item = ItemModel(data)
        item.save()
    }

    static async getAll() {
        return ItemModel.find({}).sort({createdAt: -1}).exec()
    }

    static async getOne(itemId) {
        return ItemModel.findById(itemId).exec()
    }

    static async remove(itemId){
        return ItemModel.remove({_id: itemId}).exec()
    }

    static async update(itemId, data) {
        return ItemModel.findByIdAndUpdate(itemId,data)
    }
}

module.exports = ItemService

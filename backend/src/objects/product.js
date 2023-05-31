const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    quantity: Number,
    weight: Number,
    weightUnit: String,
    pricePerUnit: Number,
    expiry: Date,
    availableForSale: Boolean,
    isPackaged: Boolean,
    imageURL: String
});

const Product = mongoose.model("inventory", inventorySchema);

function validateProduct(body) {
    if (body.name == undefined || body.description == undefined || body.category == undefined ||
        body.quantity == undefined || body.weight == undefined || body.weightUnit == undefined ||
        body.imageURL == undefined || body.expiry == undefined || body.isPackaged == undefined ||
        body.availableForSale == undefined || body.pricePerUnit == undefined)
        return false;
    return true;
}

async function getAllProducts() {
    return await Product.find();
}

async function findProduct(productId) {
    return await Product.findById(productId);
}

async function addNewProduct(product) {
    const newProduct = new Product(product);
    await newProduct.save();
}

async function editProduct(product) {
    await Product.findOneAndUpdate({ _id: product._id }, product);
}

async function removeProduct(productId) {
    await Product.findByIdAndRemove(productId);
}

module.exports = { validateProduct, findProduct, addNewProduct, getAllProducts, editProduct, removeProduct };

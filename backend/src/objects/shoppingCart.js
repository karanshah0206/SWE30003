const mongoose = require("mongoose");
const { findProduct } = require("./product");

const shoppingCartSchema = mongoose.Schema({
    customerId: String,
    orderItems: [{
        productId: String,
        quantity: Number,
        price: Number
    }]
});

const ShoppingCart = mongoose.model("shoppingcart", shoppingCartSchema);

async function getCart(customerId) {
    let cart = await ShoppingCart.findOne({ customerId });
    if (cart == null) {
        const newCart = new ShoppingCart({ "customerId": customerId, "orderItems": [] });
        await newCart.save();
        return await getCart(customerId);
    }
    return cart;
}

async function addToCart(customerId, productId, quantity) {
    let cart = await getCart(customerId);
    let productDetails = await findProduct(productId);
    if (!productDetails.availableForSale)
        return { success: false, message: "Item not available for sale." };
    if (productDetails.isPackaged && productDetails.quantity < quantity)
        return { success: false, message: "Not enough quantity in inventory." };
    if (!productDetails.isPackaged && productDetails.weight < quantity)
        return { success: false, message: "Not enough quantity in inventory." };
    let price = productDetails.pricePerUnit * quantity;
    cart.orderItems.push({ productId, quantity, price });
    await cart.save();
    return { success: true, message: "Item added to cart." };
}

async function removeFromCart(customerId, orderItemId) {
    let cart = await getCart(customerId);
    let indexToRemove = NaN;
    for (let i = 0; i < cart.orderItems.length; i++)
        if (cart.orderItems[i]._id.toString() == orderItemId) {
            indexToRemove = i;
            break;
        }
    if (isNaN(indexToRemove)) return { success: false };
    else {
        cart.orderItems.splice(indexToRemove, 1);
        await cart.save();
        return { success: true };
    }
}

module.exports = { getCart, addToCart, removeFromCart };

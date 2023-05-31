const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { checkCustomerCredentials } = require("./objects/customer");
const { checkAdminCredentials } = require("./objects/admin");
const { validateProduct, findProduct, addNewProduct, getAllProducts, editProduct, removeProduct } = require("./objects/product");
const { addToCart, getCart, removeFromCart } = require("./objects/shoppingcart");
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// initialise server and connect to MongoDB database
app.listen(port, () => {
    console.log("Server listening on port " + port + ".");
    mongoose.connect("mongodb://localhost/ayhf", { useNewUrlParser: true, family: 4 }).then(() => {
        console.log("Connected to MongoDB.");
    }).catch((err) => {
        console.log("Error while connecting to MongoDB.");
        console.error(err);
    });
});

// authenticate customer
// request email: String, passowrd: String
// result: null | Customer
app.get("/authCustomer", async(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email == undefined || password == undefined)
        return res.status(400).send("Badly formatted request.");
    return res.json(await checkCustomerCredentials(email, password));
});

// authenticate admin
// request email: String, password: String
// result: null | Admin
app.get("/authAdmin", async(req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (email == undefined || password == undefined)
        return res.status(400).send("Badly formatted request.");
    return res.json(await checkAdminCredentials(email, password));
});

// get catalogue
// request: empty
// response: Product[]
app.get("/catalogue", async(req, res, next) => {
    return res.json(await getAllProducts());
});

// get product by ID
// request: productId: String
// response: null | Product
app.get("/findProduct", async(req, res, next) => {
    const productId = req.body.productId;
    if (productId == undefined)
        return res.status(400).send("Badly formatted request.");
    return res.json(await findProduct(productId));
});

// add product to inventory
// request: Product
// response: { success: boolean }
app.post("/addProduct", async(req, res, next) => {
    if (!validateProduct(req.body))
        return res.status(400).send("Badly formatted request.");
    await addNewProduct(req.body);
    return res.json({ success: true });
});

// update product in inventory
// request: Product
// response { success: boolean }
app.post("/editProduct", async(req, res, next) => {
    if (!validateProduct(req.body) || req.body._id == undefined)
        return res.status(400).send("Badly formatted request.");
    await editProduct(req.body);
    return res.json({ success: true });
});

// remove product from inventory
// request: productId: String
// response { success: boolean }
app.delete("/removeProduct", async(req, res, next) => {
    const productId = req.body._id;
    if (productId == undefined)
        return res.status(400).send("Badly formatted request.");
    await removeProduct(productId);
    return res.json({ success: true });
});

// get a customer's shopping cart
// requeset: customerId: String
// response: ShoppingCart
app.get("/getCart", async(req, res, next) => {
    const customerId = req.body.customerId;
    if (customerId == null)
        return res.status(400).send("Badly formatted request.");
    return res.json(await getCart(customerId));
});

// add product to shopping cart
// request: customerId: String, productId: String, quantity: Number
// return: { success: boolean, message: String }
app.post("/addToCart", async(req, res, next) => {
    const customerId = req.body.customerId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    if (customerId == undefined || productId == undefined || quantity == undefined)
        return res.status(400).send("Badly formatted request.");
    return res.json(await addToCart(customerId, productId, quantity));
});

// remove order item from shopping cart
// request: customerId: String, orderItemId: String
// return: { success: boolean }
app.delete("/removeFromCart", async(req, res, next) => {
    const customerId = req.body.customerId;
    const orderItemId = req.body.orderItemId;
    if (customerId == undefined || orderItemId == undefined)
        return res.status(400).send("Badly formatted request.");
    return res.json(await removeFromCart(customerId, orderItemId));
});

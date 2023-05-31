const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    address: String,
    phone: String
});

const Customer = mongoose.model("customer", customerSchema);
const CustomerProjection = "email name address phone";

async function checkCustomerCredentials(email, password) {
    return await Customer.findOne({ email, password }, CustomerProjection);
}

module.exports = { checkCustomerCredentials };

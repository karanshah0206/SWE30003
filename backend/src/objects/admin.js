const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    phone: String
});

const Admin = mongoose.model("admin", adminSchema);
const AdminProjection = "email name phone";

async function checkAdminCredentials(email, password) {
    return await Admin.findOne({ email, password }, AdminProjection);
}

module.exports = { checkAdminCredentials };

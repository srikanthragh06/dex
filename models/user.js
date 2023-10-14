// importing internal objects
const { Schema, model } = require("mongoose");
const { randomBytes, createHmac } = require("crypto");

// creating user schema
userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
        },
        role: {
            type: String,
            enum: ["ADMIN", "USER"],
            default: "USER",
        },
    },
    { timestamps: true }
);

// user object methods
userSchema.methods.hashPassword = function () {
    this.salt = randomBytes(16).toString("hex");
    const hmac = createHmac("sha256", this.salt);
    hmac.update(this.password);
    this.password = hmac.digest("hex");
};

userSchema.methods.isPasswordCorrect = function (password) {
    const hmac = createHmac("sha256", this.salt);
    hmac.update(password);
    const enteredPasswordHash = hmac.digest("hex");
    return enteredPasswordHash == this.password;
};

// model creation
const User = model("User", userSchema);

// exporting
module.exports = User;

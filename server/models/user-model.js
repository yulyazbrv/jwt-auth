const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  }, 
  email: { 
    type: String, 
    unique: true, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  registeredDate: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date
  },
  status: {
    type: String,
    enum: ["blocked", "unblocked"],
    default: "unblocked",
  }
});

module.exports = model("User", UserSchema);

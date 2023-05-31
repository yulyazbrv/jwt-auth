const { Schema, model } = require("mongoose");

const TockenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  refreshTocken: { 
    type: String, 
    required: true 
  }
});

module.exports = model("Token", TockenSchema);
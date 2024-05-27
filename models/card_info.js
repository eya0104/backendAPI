const mongoose = require('mongoose');

const cardInfoSchema = new mongoose.Schema(
  {
    cardNumber: { type: String, required: true },
    type: { type: String, required: true },
    expirationDate: { type: String, required: true },
  },
  { timestamps: true }
);

// Create a Mongoose model based on the schema
const CardInfo = mongoose.model('CardInfo', cardInfoSchema);

// Export the model
module.exports = CardInfo;

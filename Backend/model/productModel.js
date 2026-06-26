const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
   productName: String,
category: String,
exchangeFor: String,
location: String,
description: String,
image: String,
owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "user",
}
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("product", productSchema);
module.exports = Product;
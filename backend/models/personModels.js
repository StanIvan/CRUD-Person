const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const personSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Person", personSchema);

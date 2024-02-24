import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  products: {
    type: Array,
  },
  priceTotal:{
    type:Number
  }

});

export const Invoice = mongoose.model("Invoice", InvoiceSchema);

import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  product: {
    type: Object,
  },
  priceTotal:{
    type:Number
  }

});

export const Invoice = mongoose.model("Invoice", InvoiceSchema);

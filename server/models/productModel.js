import mongoose from "mongoose";

const productsSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    picture: String,
    savedDate: {
        type: Date,
        required: true,
    },
    savedBy: String,
    description: {
      type: String,
    },
    price: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productsSchema);

export default Products;

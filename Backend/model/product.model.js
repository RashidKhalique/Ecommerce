import mongoose from "mongoose";



const productschema = new mongoose.Schema({
    name: String,
    imageurl:  String,
    price: Number,
    discount: String,
    category:String,
    coupon:{
        type : String,
         default : 0,
    }

})



const Product = mongoose.model("Product", productschema)
export default Product;
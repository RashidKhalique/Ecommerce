import Product from "../model/product.model.js";

const ShowProduct = async (req, res, next) => {
    try {

        const existProduct = await Product.find({})

        if (!existProduct) {
            return next(new creatError("No Product "))
        }

        res.status(200).json({ success: true, message: "Product successfully Added ",existProduct })
    } catch (err) {
        next(err);
        res.status(500).send("Internal Server Error");
    }
}


export default ShowProduct;
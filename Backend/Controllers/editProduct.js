import Product from "../model/product.model.js";

const editProduct = async (req, res, next) => {
    try {
        const {id}=req.params
        const { name, price, imageurl, category, discount } = req.body;
        const product = await Product.updateOne({ _id: id }, { $set: { name, price, imageurl, category, discount } })
        res.status(200).json({ success: true, message: "Update product successfully ", product })
    } catch (err) {
        next(err);

    }
}
export default editProduct;
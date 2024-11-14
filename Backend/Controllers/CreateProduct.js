import Product from "../model/product.model.js";

const CreateProduct = async (req, res, next) => {
    try {

        const { name, price, imageurl, category, discount } = req.body;




        if (!name || !price || !imageurl || !category || !discount) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existProduct = await Product.findOne({ imageurl })

        if (existProduct) {
            return next(new creatError("Product already added"))
        }

        const product = await Product.create({  name, price, imageurl, category , discount })
        res.status(200).json({ success: true, message: "Product successfully Added ",product })
    } catch (err) {
        next(err);
        res.status(500).send("Internal Server Error");
    }
}


export default CreateProduct;
import Product from "../model/product.model.js";



const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params; // Get the product ID from the request parameters
  
      // Find the product by ID and delete it
      const product = await Product.findByIdAndDelete(id);
  
      if (!product && !id) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Return a success response
      return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  };

  export default deleteProduct;
import User from "../model/user.model.js";



const deleteUser = async (req, res) => {
    try {
      const { id } = req.params; // Get the product ID from the request parameters
  
      // Find the product by ID and delete it
      const Userexists = await User.findByIdAndDelete(id);
  
      if (!Userexists && !id) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return a success response
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  };

  export default deleteUser;
import User from "../model/user.model.js";
import bcrypt from 'bcrypt';

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, password, role } = req.body;
        
        // Check if the user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Update user fields
        const updateData = { name, email, role };

        // Only hash and update password if it is provided
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateData.password = hashedPassword; // Set hashed password
        }

        const userUpdated = await User.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true } // This option returns the updated document
        );

        res.status(200).json({ success: true, message: "User updated successfully", user: userUpdated });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to update user." });
        next(err);
    }
};

export default updateUser;

import User from "../model/user.model.js"; // Adjust the import to your user model
import createError from "http-errors"; // Ensure this is imported for error handling

const CreateUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body; // Adjust fields as needed

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email }); // Check for existing user by email

        if (existingUser) {
            return next(createError(409, "User already exists")); // Conflict status for existing user
        }

        const user = await User.create({ name, email, password, role }); // Create new user
        res.status(201).json({ success: true, message: "User successfully added", user }); // 201 Created status
    } catch (err) {
        next(err); // Handle errors
        res.status(500).send("Internal Server Error");
    }
}

export default CreateUser;

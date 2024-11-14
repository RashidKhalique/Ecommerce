import User from "../model/user.model.js"
import createError from "../utils/appErr.js";
import jwt from "jsonwebtoken"
var tokened;
import  bcrypt from'bcrypt';

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return next(new createError(404, 'User not found'));
        }

        const passwordCheck = await bcrypt.compare(password, user.password);
        
        if (!passwordCheck) {
            return next(new createError(401, 'Invalid credentials'));
        }
        const { name, role } = user;
        const signuserdata = { email, name, role };
        const token = jwt.sign({ email, role }, process.env.JWT_SECRET || '@#(^#^@#', { expiresIn: '1h' });
        return res.status(200).cookie('token', token, { httpOnly: true }).json({
            success: true,
            message: "Successfully logged in",
            signuserdata,
            token,
           user 
        });

    } catch (err) {
        res.status(500).json({message:"Error"});
    }
};



const signUp = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body; 

        // Check if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user already exists
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with hashed password
        const newUser = await User.create({ name, email, password: hashedPassword, role });

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: { name: newUser.name, email: newUser.email, role: newUser.role }
        });

    } catch (err) {
        res.status(500).json({message:"Error"});
    }
};




export default { signUp, login };
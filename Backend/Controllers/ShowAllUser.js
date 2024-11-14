import User from "../model/user.model.js";

const ShowAllUser= async (req, res, next) => {
    try {

        const usera = await User.find({})

        if (!usera) {
            return next(new creatError("No Product "))
        }

        res.status(200).json({ success: true, message: "All user are here ",usera })
    } catch (err) {
        next(err);
        res.status(500).send("Internal Server Error");
    }
}


export default ShowAllUser;
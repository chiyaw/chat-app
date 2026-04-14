import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../settings.js";
import { IS_AUTH, HTTP_STATUS } from "../constants.js";

const isAuth=async (req, res, next) =>{
    try{
        let token = req.cookies.token
        if (!token) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({message:IS_AUTH.TOKEN_NOT_FOUND})
        }

        const verifyToken = jwt.verify(token, JWT_SECRET);
        

        req.userId = verifyToken.userId;
        next()


    } catch(error) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({message:`${IS_AUTH.CATCH_ERROR} ${error}`})

    }
}

export default isAuth

import jwt, { JwtPayload } from "jsonwebtoken";
import {Request, Response, NextFunction} from 'express'
import {jwtPass} from "./config";

export const userMiddleware = async(req:Request,res:Response,next:NextFunction) => {

    const header = req.headers['authorization']

    const decoded = jwt.verify(header as string,jwtPass)

    if(decoded){
    
        req.userId= (decoded as JwtPayload).id;
        next();
    }else{
        res.status(403).json({
            message:"your not logged in"
        })
    }

}
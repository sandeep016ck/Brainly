
declare global {
    namespace Express {
        export interface Request {
            userId?: string
        }
    }
}


import jwt from 'jsonwebtoken';
import express from 'express';
import cors from 'cors'
const app = express();

import { ContentModel, UserModel, LinkModel} from './db';
import {random} from './utils'
import {jwtPass} from './config'
import { userMiddleware } from './middleware';
import { readJsonConfigFile } from 'typescript';

app.use(express.json())
app.use(cors())

app.post("/api/v1/signup", async(req, res) => {
    const {username,password} = req.body;

    try{
        await UserModel.create({
            username,
            password
        })
    
        res.status(200).json({
            "message":"successfully created"
        })
    
    }catch(e){
        console.log(e);
        res.status(411).json({
            message:"User Already Exists"
        })
    }

})

app.post("/api/v1/signin", async(req, res) => {
    const username = req.body.username
    const password = req.body.password

    const existingUser = await UserModel.findOne({
        username,
        password
    })
    
    if(existingUser){
        const token = jwt.sign({
            id:existingUser._id
        },jwtPass)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrrect credentials"
        })
    }
})

app.post("/api/v1/content",userMiddleware, async(req, res) => {

    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;

     await ContentModel.create({
        title,
        link,
        type,
        //@ts-ignore
        userId:req.userId,
        tags:[]
    })

    res.json({
        message:"content Added"
    })

})

app.get("/api/v1/content", userMiddleware,async(req, res) => {
    //@ts-ignore
    const userId= req.userId;

    const content = await ContentModel.find({
        userId:userId
    }).populate('userId','username')

    if(content){
        res.status(200).json({
            content
        })
    }

})

app.delete("/api/v1/content", userMiddleware,async(req, res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId:req.userId
    })

    res.json({
        message:"content deleted successfully"
    })
})

app.post("/api/v1/brain/share",userMiddleware, async(req, res) => {
    const {share} = req.body;
    
    if(share){

        const existinguser = await LinkModel.findOne({
            userId:req.userId
        })

        if(existinguser){
            res.json({
                hash:existinguser.hash
            })

        }
        const hash = random(10);
        
        await LinkModel.create({
            userId: req.userId,
            hash:hash
        })

        res.json({
            hash
        })


    } else {
       await LinkModel.deleteOne({
            userId:req.userId
       })

       res.json({
         message:"successfully deleted"
       })
    }


})

app.get("/api/v1/brain/:shareLink",async(req, res) => {
    const hash = req.params.shareLink;

    const link =  await LinkModel.findOne({
        hash
    })

    if(!link){
        res.status(411).json({
            message:"sorry incorrect input"
        })

        return;
    }

    const content = await ContentModel.find({
        userId:link?.userId
    })

    const user= await UserModel.findOne({
       _id:link.userId
    })

    if(!user){
        res.status(411).json({
            message:"user not found!!"
        })

        return;
    }

    res.json({
        username:user.username,
        content:content
    })

})



app.listen(8080,()=>{
    console.log("server started")
})
import express from 'express';
import mongoose from 'mongoose';
import {StatusCodes} from 'http-status-codes';
import { Member } from './Member.js';
import cors from 'cors';


const app=express();
app.use(cors()); //enable requests from all urls
app.use(express.json()); //to process the request body

const connectDb=async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/Spaceroot');
        console.log("Database connection created");
    } catch (error) {
        console.log(error)
    }
}

app.post("/member",async(request,response)=>{
    try {
        const reqData=request.body;
        const member=new Member(reqData);
        await member.save();
        response.status(StatusCodes.CREATED).send({message:"Sucessfully Inserted"});
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Something went wrong"});
    }
});

app.get("/member",async(request,response)=>{
    try {
        const members=await Member.find();  
        response.send({members:members});
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Something went wrong"}); 
    }
});

app.get("/member/:email",async(request,response)=>{
    try {
       const member=await Member.findOne({email:request.params.email});
       if (member==null) {
        response.status(StatusCodes.NOT_FOUND).send({message:"Student not Found"});
       }
       else{
         response.send({member:member});
       }
       
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Something went wrong"});
    }
});

app.delete("/member/:email",async(request,response)=>{
    try {
        await Member.deleteOne({email:request.params.email});
        response.send({message:"Deleted Sucessfully"});
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Something went wrong"});
    }
});

app.put("/member/:email",async(request,response)=>{
    try {
        await Member.updateOne({email:request.params.email},request.body);
        response.send({message:"Updated Successfully"});
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message:"Something went wrong"});
    }
});

app.listen(4900,()=>{
    console.log("Server has started on 4900");
    connectDb();
});
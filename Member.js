import mongoose, { Schema } from "mongoose";

const memberSchema = new Schema({
    fname:String,
    mname:String,
    lname:String,
    email:String,
    passportnumber:Number,
    gender:String,
    password:Number
});

export const Member = mongoose.model("member",memberSchema);
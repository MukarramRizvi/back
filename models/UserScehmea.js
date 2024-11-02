import mongoose from "mongoose";

const schema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
})

const model = mongoose.model("model",schema);

export default model;
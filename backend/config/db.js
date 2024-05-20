import mongoose from "mongoose";
export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://kathanpatel29:kathan%40290700007@cluster0.k1u26gn.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}
import mongoose from "mongoose";

let isConnected = false;

export async function connectToDB(){
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log('MongoDB already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "chargerp",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;
        console.log('MongoDB successfully connected');
    } catch (error) {
        console.log(error);
    }
}
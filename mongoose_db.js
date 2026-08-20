import mongoose from "mongoose";

const ConnectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected!");
    }
    catch(err){
        console.log(`MongoDB connected error: ${err}`);
        process.exit(1);
    }
}

export default ConnectDB;
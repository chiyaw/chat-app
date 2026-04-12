import mongoose from "mongoose";
import { DB } from "../constants.js";

const connectDb = async () => {
  try {
    mongoose.set("bufferCommands", false); // avoid silent buffering

    
    mongoose.connection.on('open', console.info.bind(console, 'Database connection: open'))
      .on('close', console.info.bind(console, 'Database connection: close'))
      .on('disconnected', console.info.bind(console, 'Database connection: disconnecting'))
      .on('disconnected', console.info.bind(console, 'Database connection: disconnected'))
      .on('reconnected', console.info.bind(console, 'Database connection: reconnected'))
      .on('fullsetup', console.info.bind(console, 'Database connection: fullsetup'))
      .on('all', console.info.bind(console, 'Database connection: all'))
      .on('error', console.error.bind(console, 'MongoDB connection: error:'));

    await mongoose.connect(process.env.MONGODB_URL);
    
    

    console.log(DB.DB_CONNECTED_MESSAGE);
    console.log("STATE:", mongoose.connection.readyState); // should be 1

  } catch (error) {
    console.error("❌ DB CONNECTION ERROR:", error.message);
    process.exit(1);
  }
};

export default connectDb;
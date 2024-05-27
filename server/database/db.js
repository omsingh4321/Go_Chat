import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const Username= process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;

const Connection= async ()=>{
   const URL=`mongodb://${Username}:${password}@ac-8eb0vul-shard-00-00.yiiobsi.mongodb.net:27017,ac-8eb0vul-shard-00-01.yiiobsi.mongodb.net:27017,ac-8eb0vul-shard-00-02.yiiobsi.mongodb.net:27017/GO_chat?ssl=true&replicaSet=atlas-sb5ayw-shard-0&authSource=admin&retryWrites=true&w=majority`;

    try{
    await  mongoose.connect(URL,{
       useUnifiedTopology: true,

    });
    console.log("Database Connected Successfully");
    }
    catch(error){
       console.log("Error from database:- "+ error.message);
    }
}
export default Connection;
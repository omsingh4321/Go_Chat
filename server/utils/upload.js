import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv';
import Grid from 'gridfs-stream';
import bodyParser from 'body-parser';


dotenv.config();
const Username= process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;

const storage= new GridFsStorage({
    url:`mongodb://${Username}:${password}@ac-8eb0vul-shard-00-00.yiiobsi.mongodb.net:27017,ac-8eb0vul-shard-00-01.yiiobsi.mongodb.net:27017,ac-8eb0vul-shard-00-02.yiiobsi.mongodb.net:27017/?ssl=true&replicaSet=atlas-sb5ayw-shard-0&authSource=admin&retryWrites=true&w=majority`,
 options:  {
    useUnifiedTopology: true,
    useNewUrlParser: true
 },
 file: (request,file) =>{
   // console.log(file);
   // console.log(request.body.primary);
   const match=["image/png","image/jpg"]
   if(match.indexOf(file.mimetype)=== -1)
   {
        
      return `${request.body.primary}`
   }
   return {
      bucketName: "photos",
      filename: `${request.body.primary}`
   }
 }
});

export default multer({storage});
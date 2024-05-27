import express from "express";
import Connection from "./database/db.js";
import route from "./routes/route.js";
import cors from 'cors';
import bodyParser from "body-parser";

const app=express();
app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/',route);
Connection();
const PORT=5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} `);
})
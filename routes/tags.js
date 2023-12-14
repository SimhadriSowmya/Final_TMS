import express from 'express';
// import {getOrderStatusUpstream} from '../controller/getOdStatus.js';
import {connectToDatabase,getDatabaseClient} from '../routes/database.js'

const tags = express.Router();
await connectToDatabase();
const db = getDatabaseClient();

tags.get('/',async (req,res) => {

    console.log(db);
    
    res.send(await db.collection('Tags').find().toArray()) ;
    
});

export default tags;


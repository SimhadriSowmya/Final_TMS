import express from 'express';
// import {getOrderStatusUpstream} from '../controller/getOdStatus.js';
import {connectToDatabase,getDatabaseClient} from '../routes/database.js'

const taskHistory = express.Router();
await connectToDatabase();
const db = getDatabaseClient();

taskHistory.get('/',async (req,res) => {

    console.log(db);
    
    res.send(await db.collection('TaskHistory').find().toArray()) ;
    
});

export default taskHistory;


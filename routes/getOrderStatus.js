import express from 'express';
import {getOrderStatusUpstream} from '../controller/getOdStatus.js';

const getOrderStatus = express.Router();


getOrderStatus.post('/',async (req,res) => {
    
    const orderNum = req.body?.orderNum; 
    console.log (orderNum);
    if (orderNum.length < 10) {
        res.status(400).send({error : "OrderNum less than 10 characters"});
    }
    try{    
        const  upstreamres = await getOrderStatusUpstream(orderNum);    
        res.send(upstreamres.data);
    }
    catch(err){
        console.log(err);
        res.status(400).send({error:err});
    }
});

export default getOrderStatus;


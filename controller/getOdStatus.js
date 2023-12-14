import axios from 'axios' // lib to make async external requests
import dotenv from "dotenv" // whatever we keep in the .env file to laod 
dotenv.config();

const API_KEY = process.env.ORDER_API_KEY;
const API_URL = "https://api.trackingmore.com/v4/trackings/get?tracking_numbers=";
const headers = {
    'Tracking-Api-Key': API_KEY,
    'content-type' : 'application/json'
}

export const getOrderStatusUpstream = async(orderNum) => {        
        try{
            let res = await axios.get(API_URL+orderNum,{headers:headers});
            return res.data;
        }
        catch(err){
            throw err;
            console.log(err);
            return err;
        }
}

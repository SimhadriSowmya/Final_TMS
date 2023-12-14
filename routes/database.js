// import { MongoClient } from "mongodb"

import  {MongoClient} from 'mongodb'

// old one const mongoUri = 'mongodb+srv://ssimhadr379:6JD7OGOEgJJ4PPQL@cluster0.9jqclxu.mongodb.net/'

const mongoUri = 'mongodb+srv://sowmsim:vodNqvjWr8uz8bs2@cluster0.1twqtif.mongodb.net/'

let myDatabase
export const connectToDatabase = async () =>{
    try{
        const client = new MongoClient(mongoUri)
        await client.connect()
        myDatabase = client.db('SS_Task')
        console.log('Connected to the MongoDb')
    } catch(error) {
        console.error('Failed to conect to MongoDB', error)
    }

}
export function getDatabaseClient(){
    return myDatabase
}

// export const getDatabaseClient = () => {
//     return myDatabase
// }


import express from 'express';
import categories from './routes/categories.js'
import tasks from './routes/tasks.js'
import { connectToDatabase, getDatabaseClient } from './routes/database.js';
import taskHistory from './routes/taskHistory.js';
import tags from './routes/tags.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const app=express();
const port = 8080 ;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

await connectToDatabase();

app.use(express.json());
app.use('/categories', categories);
app.use('/tasks', tasks);
app.use('/taskHistory', taskHistory);
app.use('/tags', tags);


app.get('/',(req,res) => {
    res.send('Helelo');

})

    app.get('/get-ip', (req, res) => {
        const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        res.send({userIp});  
    })


    const dbClient = getDatabaseClient();
        
            // const location = await getUserZipCode(userIp)
    const collection = await dbClient.collection('Tasks').find().toArray();
    console.log(collection,"collection")
    // res.send(`${collection} this is sowmya's collection`);

app.listen(port, () => {
    console.log(`Fetching status started at http://localhost:${port}`);
    
    });
    
reportWebVitals();
/*

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


*/
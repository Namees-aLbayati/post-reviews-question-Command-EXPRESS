const { urlencoded } = require('express');
const express=require('express');
const uuid=require('./helpers/uuid');
const data=require('./db/reviews')
const path=require('path')
const app=express();
const saveddata=require('../try add comment/db/reviews.json')
const fs=require('fs');
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
  const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  };


app.use(express.static('public'))
app.use(express.json())
app.use(urlencoded({extended:true}));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/index.html'))
})
app.get('/api',(req,res)=>{
    res.json(saveddata)
})
app.post('/api',(req,res)=>{
    console.log('recived')
    const {name,comment,item}=req.body;
   if(name&&comment&&item){
       const newdata={

           name,comment,item,
           id:uuid(),
           status:'successfully added'
       }
           res.json(newdata);

           readAndAppend(newdata,'./db/reviews.json')

   }else{
       console.log('no data found')
   }
})

app.listen(3001,()=>{
    console.log('listening on 3001')
})

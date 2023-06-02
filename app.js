const { Console } = require('console');
const express= require('express');
const app= new express();
require('dotenv').config()

const api=require('./routes/method');

app.use('/api', api);
const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`SERVER IS RUMMING IN PORT ${PORT}`);

})
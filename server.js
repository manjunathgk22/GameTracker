const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

//Load env
dotenv.config({path: './config.env'})

const app = express()

//Dev logging
if(process.env.NODE_ENV == 'development'){
  app.use(morgan('dev'));
}
//Profile route
app.use('/api/v1/profile', require('./routes/profile'));

//Handle PROD
if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static(__dirname + '/public/'))

  //Handle SPA
  app.get(/.*/, (req, res)=>{res.send(__dirname + '/public/index.html')})

}

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
  console.log('listening')
})
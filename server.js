const express = require("express");
const mongoose = require('mongoose');
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;


// console.log(express);
let app = express();
let morgan = require('morgan');
let helmet = require("helmet");

let middlewarework = require('./middleware/middleware');
// let config = require("config");
// let config=require('config');
// let port = process.env.PORT || 3000;
let genre = require("./routes/genre");
let music = require("./routes/music");
let customer = require("./routes/customer");

app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.urlencoded({extended:true})); //key value
app.use(express.static("html"));  

// console.log(`mode:${process.env.NODE_ENV}`);
// console.log(`default mode:${app.get("env")}`);
// console.log(`default config: ${config.get('name')}`);
// console.log(`mode_email:${config.get('email')}`);
// console.log(`password : ${config.get("password")}`);




app.use(middlewarework);
// middleware
// app.use((req,res,next)=>{
//     console.log("first");
//     next(); //next() is a flag which we must use after all operations
// });
// // // middleware
// app.use((req,res,next)=>{
//     console.log("second");
//     next();
// });



// in-built middleware
app.use(express.urlencoded({extended:true})); //key value
app.use(express.static("public")); //here public is a folder which i have created and by using this we can access folder all data whether its is a html file aur js file or anythink.


// let musiclist = require('./routes/musiclist');
const { required } = require("joi");

// app.use("/api",musiclist); //initial path is /api and the final path is musiclist
app.use("/api",genre);
app.use("/api",music);
app.use("/api",customer);
// Connect MongoDB at default port 27017.
mongoose.connect('mongodb://localhost:27017/darkdb',
{useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log(`conected to db`))
.catch((error)=>console.log(`something went wrong , ${error.message}`));

// //express connections
app.listen(port,()=>console.log(`connected to port ${port}`));



// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
// function add(a , b){
//     return a + b;
// }

// var add = function(a, b){
//     return a + b;
// }

// var add =(a ,b)=>{return a + b};

// var add = (a, b) => a+b;

// var result = add(3,333);
// console.log(result);

// (function(){
//     console.log('ganesh');
// })();



// callback function

// function callback(){
//     console.log('now adding is successful complete');
// }

// const add = function( a, b, callback ){
//     var result = a+b;
//     console.log("result:" +result); // main function work complete
//     callback();
// }

// add(3,4, callback);

// ex -2

// const add = function( a, b, callback ){
//     var result = a+b;
//     console.log("result:" +result); // main function work complete
//     callback();
// }

// add(2, 3, function() {
//     console.log('add completed');
// })

// ex 3

// const add = function( a, b, callback ){
//     var result = a+b;
//     console.log("result:" +result); // main function work complete
//     callback();
// }

// add(2,3, () => console.log('add completed'))



// // OS / FS

// var fs = require ('fs');
// var os = require ('os');

// var user = os.userInfo();
// console.log(user.username);


// fs.appendFile('greeting.txt','hi' + user.username + '!\n', ()=>{
//     console.log('file is created');
// });


// const notes = require ('./notes.js');
// var _ = require('lodash');

// console.log('the srever is available');

// var age = notes.age;
// var result = notes.addNumber(age+0, 0);

// console.log(age);
// console.log('result is now'+result);


// var data = ['person','person',1,2,1,2,'name','age','2'];
// var filter = _.uniq(data);
// console.log(filter);

// console.log(_.isString('ganesh'))



// create a server

//express  //MOngo


const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
 


const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000;


app.get("/test", async function (req, res) {
  console.log(req.query)
  var myquery = req.query.age;
  const data = await Person.find({ age: myquery });
  res.send(data)
})

app.get('/', function (req, res) {
  res.send('Wellcome to our Hotel')
})



//Import the routes files

const personRoutes = require('./routes/personRoutes');
//use the route
app.use('/person',personRoutes)

const menuRouter = require('./routes/menuRoutes');
app.use('/menu' , menuRouter)

const userRouter = require('./routes/userRoutes');
app.use('/user' , userRouter)




app.listen(PORT, () => {
  console.log('listening on port 3000');
})




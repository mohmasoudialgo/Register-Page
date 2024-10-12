const express = require('express');
const app = express();
const path = require('path'); 
const session= require('express-session');
const flash = require('connect-flash');
const expressLayout = require('express-ejs-layouts');
const connectDb = require('./db');
const PORT = 3000;


app.use(session({
  secret: 'yourSecret',
  resave: false,
  saveUninitialized: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(flash());
app.use(expressLayout);

app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');

const indexRoutes = require('./routes/index');
app.use('/',indexRoutes);

app.listen(PORT,(err)=>{
    if(err){
        console.log('error');
    }
    console.log('server running on port 3000...');
})

connectDb();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs');
const connection = require('./db/connection');
const userData = require('./models/userdetail');

var exphbs = require('express-handlebars');

const port = process.env.PORT||9005;

const app = express();
const staticPath = path.join(__dirname,'../public')
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
// console.log(main_path);

app.use(express.static(staticPath));
app.set('view engine', 'hbs');  
app.set("views", template_path);
hbs.registerPartials(partials_path);
app.use(express.urlencoded({extended:false})); // Important line to show the data in Json format


//Routing
app.get('/',(req,res)=>{
    res.render("index");
})
app.get('/index',(req,res)=>{
    res.render("index");
})

app.get('/login',(req,res)=>{
    res.render("login");
})
app.get('/signup',(req,res)=>{
    res.render("signup");
})



/*Test */
app.get('/test',(req,res)=>{
    res.render("DSA/test");
})


app.get('/contact',(req,res)=>{
    res.render("contact");
})

app.get('/aboutus',(req,res)=>{
    res.render("aboutus");
})

app.post('/contact', async(req,res)=>{
    try{
        // res.send(req.body);
        const userData1 = new userData(req.body);
        const data = await userData1.save();
        res.status(201).render('index');
    }catch(err){
        res.status(500).render(err);
        console.log(err);
    }
})

app.listen(port,()=>{
    console.log('Server is running...');
    console.log(port);
})
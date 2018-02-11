const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();


//Express Middleware
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');
// I'm using this so that I don't have to create a route to everyting
//for instance there is a help.html page that is now part of the site
//but I didn't create a route for it.

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=> {
        if(err){
            console.log("Unable to append to server.log file");
        }
    });
    next();
});
// app.use((req,res, next)=>{
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', function() {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase(); 
});

app.get("/", function(req, res) {
  // res.send('<h1>Hello Express!<h1>');
  res.render("home.hbs",{
    name: "Sean",
    likes: ["Fried shrimp with 3 tartar sauces", "Noel, sometimes"],
    pageTitle: 'Home Page',
    //currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome!  You Rock!!'
  });
});
app.get("/about", function(req, res) {
    
 res.render('about.hbs', {
     pageTitle: 'About Page',
     //currentYear: new Date().getFullYear()
 });
});
app.get("/projects", function(req, res) {
    
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
        //currentYear: new Date().getFullYear()
    });
   });

app.get("/bad", function(req, res) {
    
res.send({
    ErrorMessage: 'Unable to handle request!'
});
});


app.listen(port, function(){
console.log("app is running on port " + port);
});
/*
app.get('/', (req, res) => {

});
app.get("/api/friends", function (req, res) {
    res.json(userData);

});
*/

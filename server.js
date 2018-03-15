const express = require("express");
const hbs = require("hbs");
var engines = require('consolidate');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");
app.use(express.static(__dirname +  "/public"));
app.engine('hbs', engines.mustache);
app.engine('hbs', require('hbs').__express);


hbs.registerHelper("getCurrentYear",() => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt",(text) => {
    return text.toUpperCase();
});
app.use((req,res,next) => {
  var now = new Date().toString();
  var log = now + " " + req.method + req.url;
  fs.appendFile("server.log", log + "\n", (err) => {
      if(err)
      console.log("Unable to log the data");
  });
  next();
})
// app.use((req,res,next) => {
//     res.render("Maintianance.hbs");
// });
app.get('/', (req,res) => {
 //res.send("Hello Express!");
 res.send({
    name : "Sathish",
    address : "560078"
 });
});

app.get('/home', (req,res) => {
    res.render("home.hbs", {
        pageTitle : "Home Page",
        currentYear : new Date().getFullYear(),
        welcomeMessage : "Welcome to Home Page"
    });
   });

app.get('/about', (req,res) => {
    // res.send("About Page!");
    res.render("about.hbs", {
        pageTitle : "About Page",
        currentYear : new Date().getFullYear()
    });
   });


   app.get('/bad', (req,res) => {
    res.send({                
        errorMessage : [{  
            message : "Somethign went wrong!",
            location : "560078"        
    }]});
    
   });

app.listen(port, () =>
{
 console.log("Server is up on port " + port);
});
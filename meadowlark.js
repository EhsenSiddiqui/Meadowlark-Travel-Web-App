var express = require('express');

//const path = require('path');

const fs = require('fs');

var app = express();

//Set up handlebars view engine in the next 3 lines 

var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');


app.set('port', process.env.PORT || 3000);

/*
Before adding any routes, we're adding the static middleware below.

Static middleware allows you to designate one or more directories as containing static resources
that are simply to be delivered to the client without any special handling. This is where you would
put things like images, CSS files, and client-side JavaSript files. 

We've created a subdirectory in our root folder and we call it 'public' because anything in this directory
would be served to the client without question. 

*/
app.use(express.static(__dirname + '/public')); 

//Now we're adding routes below

app.get('/',function(req,res){
    res.render('home');
});

/*
The real power of views is taht they can contain dynamic information.

To illustrate, we want to deliver a "virtual fortune cookie" on our about page. 

Therefore, in this file we will define an array of fortune cookies. 
*/

var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
];

app.get('/about',function(req,res){

   var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];

   res.render('about',{fortune: randomFortune});

});


//404 catch-all handler (middleware)

app.use(function(req,res,next){
    res.status(404);
    res.render('404');
});

//500 error handler (middleware)

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost'+
    app.get('port')+ '; press Ctrl-C to terminate.');
});
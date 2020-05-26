var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyparser = require('body-parser');

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

    var connection = mysql.createConnection({
   host:'localhost',
    user:'root',
    password:'password',
    database:'web'
});

app.get("/",function(req,res){
    var q = "select count(*) as count from users";
    connection.query(q,function(err,results){
        if (err) throw err;
         var count = results[0].count;
        res.render('home',{count :count});
//        res.send("we have "+count + " users");
    });

    app.post("/register",function(req,res){
//        var email = req.body.email;
        var person={
            email:req.body.email
        };
        
        connection.query('insert into users set ?',person,function(err,results){
           if(err) throw err;
            res.redirect("/");
        });
//       console.log("vldka cakmcl "+ ) 
    });

    
});

app.listen(8081,function(){
   console.log("running")    
});


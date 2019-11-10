let express = require("express");
let cors = require("cors");

let app = express();
app.use(express.json());
app.use(cors());
app.listen(3000, function(){
    console.log("Application is listening on port 3000...");
});

//file data.json emulation:
let data = {
    Users:[{id:0,login:"log", password:"pass"}]
};

//users dictionary: key = id, value = token
let users = [];

app.get("/login", function(req, res){
    let user = data.Users.find(function(user){
        if( user.login == req.query.login && user.password == req.query.password ) 
            return true; 
        else 
            return false;
    })
    if(user != undefined){
        let token = Math.random().toString(36);
        users.push({key:user.id, value:token}); 
        res.send({response:token});
    }
    else
        res.send({error:{ code:1, message:"Invalid credentials"}});
});

app.get("/getMe", function(req, res){
    foundedUser = users.find(function(user){
        if(user.value == req.query.token) return true; else return false;
    });

    if(foundedUser != undefined){
        res.send({response:data.Users.find(function(user){
            if(foundedUser.key == user.id) return true; else return false;
        })});}
    else
        res.send({error:{ code:1, message:"Invalid credentials"}});
});

app.get("/logout", function(req, res)
{
    
})
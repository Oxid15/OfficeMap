let express = require("express");
let cors = require("cors");//watch  documentation later
const MongoClient = require('mongodb').MongoClient; //
const assert = require('assert');// нужна для тестирования кода

/*mongo.connect('mongodb://localhost:27017', (err, client)=>{
    if(err){
        console.log('Connection error: ', err)
        throw err
    }
    console.log('Connected')
    client.close()
})*/


// Connection URL
const url = 'mongodb://localhost:27017/test';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);

    const db = client.db("test");

    var cursor = db.collection('inventory').find({});

    function iterateFunc(doc) {
        console.log(JSON.stringify(doc, null, 4));
    }

    function errorFunc(error) {
        console.log(error);
    }

    cursor.forEach(iterateFunc, errorFunc);

    client.close();
});


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
    //res.send(requs.query.login)
    //return;
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
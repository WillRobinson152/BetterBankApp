const MongoClient = require('mongodb').MongoClient;
const url         = 'mongodb://mongo:27017';
let db            = null;

// MongoClient.connect(url, function (err, client) {
//     if(err){ console.log('failed to connect: ' + err); return;}
//     db = client.db('myproject');;
//     console.log("Connected correctly to server!!");
// });

// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    if (err){
        console.log(err)
    }
    else
    {console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('myproject');}
});

// set current user
function setCurrent(name, email, password){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('currentuser');
        const doc = {name, email, password};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

function getCurrent(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('currentuser')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0, trans:[]};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

function login(email, password){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email, password: password})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


function findOne(email, password){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email, password: password})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}


function update(email, amount, action){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}, $addToSet: {trans: {action:action, amount: Math.abs(amount)}}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

module.exports = {create, login, findOne, find, update, all, setCurrent, getCurrent};
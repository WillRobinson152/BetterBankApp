const MongoClient = require("mongodb").MongoClient;
const url         = "mongodb://localhost:27017";

MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
    console.log("Connected")

    // database Name
    const dbName = "myproject";
    const db     = client.db(dbName);

    // new User
    let name    = "user" + Math.floor(Math.random()*1000);
    let email   = name + "@mit.edu";

    // insert into customer table
    let collection = db.collection("customers");
    let doc        = {name, email};
    collection.insertOne(doc, {w:1}, (err, result) => {
        console.log("Document insert");
    });

    const customers = db
        .collection("customers")
        .find()
        .toArray((err, docs) => {
            console.log("Collection:", docs);

            client.close();
    });
});


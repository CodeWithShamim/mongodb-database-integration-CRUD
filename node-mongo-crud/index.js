const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());



// mongodb connected ===========
const uri = "mongodb+srv://userdb:userdb100@cluster0.41efc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const userCollection = client.db("usersDB").collection("users");
        const users = { id: 1, name: 'shamim100', email: 'shamim@gmail.com' }
        const result = await userCollection.insertOne(users);
        console.log("This document successfully inserted with id is :", result.insertedId)

    } finally {
        // await client.close();

    }
}
// call function 
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send({ id: 1, user: "shamim" });
});

app.listen(port, () => {
    console.log("node with mongodb starting port..", port);
});
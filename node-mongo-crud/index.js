const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        // get data 
        app.get('/users', async(req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })

        // post dat 
        app.post('/users', async(req, res) => {
            const newUser = req.body;
            // console.log(newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result.insertedId);
        })

        // delete data 
        app.delete('/user/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);

        })

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
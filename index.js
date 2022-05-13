const express = require('express');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()

//middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nmqpl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        await client.connect();
        console.log("DB CONNECTED")
        const serviceCollection = client.db("doctors_portal").collection('services');

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services)

        })


    } finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello From Doctors Portal!')
})

app.listen(port, () => {
    console.log(`Doctors app listening on port ${port}`)
})
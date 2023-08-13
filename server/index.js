const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;
const jwt = require('jsonwebtoken')
//middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mznotex.mongodb.net/?retryWrites=true&w=majority`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// // validate jwt
// const verifyJWT = (req, res, next) => {
//   const authorization = req.headers.authorization
//   if (!authorization) {
//     return res.status(401).send({ error: true, message: 'Unauthorized' })
//   }
//   const token = authorization.split(' ')[1]
//   // token verify
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({ error: true, message: 'Unauthorized' })
//     }
//     req.decoded = decoded 
//     next()
//   })

// }

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const usersCollection = client.db("mPair").collection("users");


    //put user api

    app.put('/users', async (req, res) => {
      const user = req.body
      const filter = { email: user.email }
      console.log(filter)
      console.log(user)
      const options = { upsert: true }
      const updateDoc = {
        $set: user
      }
      const result = await usersCollection.updateOne(filter, updateDoc, options)
      res.send(result)
    })

    //get all user api 
    // app.get('/users', async (req, res) => {
    //   const cursor = usersCollection.find({})
    //   const users = await cursor.toArray()
    //   res.send(users)
    // })

    //get single user api by email
    // app.get('/users/:email/:password',verifyJWT, async (req, res) => {
    app.get('/users/:email/:password', async (req, res) => {
      const email = req.params.email
      const password = req.params.password
      console.log(email, password)

      const query = { email: email, password: password }
      const user = await usersCollection.findOne(query)

      // const query = { email: email }
      // const user = await usersCollection.findOne(query)
      res.send(user || [])
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('SERVER IS RUNNING...')
})

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})
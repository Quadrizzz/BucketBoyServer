require('dotenv').config();
const express = require('express');
const { Client } = require("twitter-api-sdk");
const cors = require('cors')
const bcrypt = require('bcrypt')
const server  = express();
const Register = require('./Routes/Register')
const PORT = process.env.PORT || 3001


server.use(cors())
server.use(express.json())

const token = "AAAAAAAAAAAAAAAAAAAAAH%2FpgQEAAAAAOeUVljoK7fFyhzljKOQmKRG9MHU%3DehQiyRP2VCiW6UyMOSiw6lDir3lMzrZb6145JdGmuGPHYRP0nv";



server.get('/', (req,res)=>{
    try{
        res.json({
            status:200,
            message:"Succesful"
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send("Error")
    }
})

server.post('/gettweet', (req,res)=>{
    const id = req.body.id;
    async function main() {
        const clients = new Client(token);
        const response = await clients.tweets.findTweetById(id);
        // console.log(response)
        // console.log(JSON.stringify(response, null, 2))
        return res.json(response);
    };
    main()
})

server.post('/getfollowers', (req,res)=>{
    const id = req.body.id;
    async function main() {
        const client = new Client(token);
        const response = await client.users.usersIdFollowers(id, {
          "max_results": 10
        });
        return res.json(response)
      }   
    main();
})

server.listen(PORT, ()=>{console.log("server is listening")})






// async function createListing (client, newListing){
//    const result =  await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);

//    console.log(`${result.insertedId}`);
// }

// main().catch(console.error);

// async function createMultListings(client, listings){
//     const result =  await client.db("sample_airbnb").collection("listingAndReviews").insertMany(listings);
//     console.log(result.insertedCount);
//     console.log(result.insertedIds);
// }

// async function listDatabases(client){
//     const databasesList  = await client.db().admin().listDatabases()

//     console.log("Databases:")
//     databasesList.databases.forEach(db =>{
//         console.log(`- ${db.name}`)
//     })
// }

// async function findOneListingByName(client, nameOfListing){
// const result = await client.db("sample_airbnb").collection("listingAndReviews").findOne({name: nameOfListing});

// if(result){
//     console.log(`find a listing in the collect with the name ${nameOfListing}`)
//     console.log(result)
// }
// else{
//     console.log(`no listing with the name ${nameOfListing}`)
// }

// }

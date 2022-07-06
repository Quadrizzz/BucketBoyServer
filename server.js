require('dotenv').config();
const express = require('express');
const cors = require('cors')
const bcrypt = require('bcrypt')
const server  = express();
const Register = require('./Routes/Register')
const { MongoClient } = require("mongodb")
const client = new MongoClient(process.env.DATABASE_URL);

async function main(){
    try{
        await client.connect();
    }
    catch(e){
        console.log(e);
    }
    finally{
        await client.close();
        console.log("DATABASE CONNECTION ESTABLISHED");
    }
}

main().catch(console.error)
server.use(cors())
server.use(express.json())


server.post('/register', (req,res)=>{
    Register.register(req,res,client,bcrypt);
})

server.listen(3001, ()=>{console.log("server is listening")})






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
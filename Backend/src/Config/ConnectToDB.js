const mongoose = require('mongoose');
const password = process.env.DB_PASSWORD;
async function main(){
    await mongoose.connect(`mongodb+srv://pratyushnamdev140:${password}@cluster0.eq7z7kg.mongodb.net/Urban-Cartel?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: false },
    ).then(()=>{
        console.log("Connected to the DB");
    }).catch((e)=>{
        console.log("Connection to the DB failed ! " + e);
    });
}
module.exports = main;






















// const mongoose = require("mongoose")
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://pratyushnamdev140:pratyush@cluster0.eq7z7kg.mongodb.net/?retryWrites=true&w=majority?directConnection=true";
// // Configure Mongoose timeout settings
// mongoose.set('bufferCommands', false); // Disable command buffering
// mongoose.set('bufferTimeoutMS', 20000); // Set timeout to 20 seconds

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function main() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("Urban-Cartel").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }


// module.exports = main;
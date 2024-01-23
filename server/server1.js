

const express = require("express");
const cors = require("cors");
const { MongoClient } = require('mongodb');
const apiRouter = require('./api');

const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://vaghasiyayashvi:YashviFoodApp123@cluster0.apwfsls.mongodb.net/foodappmern?retryWrites=true&w=majority";




// Function for connecting to MongoDB
async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const collection = client.db("foodappmern").collection("food_items");
    const result = await collection.find({}).toArray();




    const collect = client.db("foodappmern").collection("foodCategory");
    const foodCat = await collect.find({}).toArray();






    // Set up the API routes
    app.use('/api', (req, res, next) => {
      req.foodItems = result; // Assign the food items data to the request object
      req.foodCategory = foodCat; // Assign the food category data to the request object
      next();
    }, apiRouter);


    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });


  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

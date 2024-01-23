// api.js
//This is the Routes 
///const uri = "mongodb+srv://vaghasiyayashvi:YashviFoodApp123@cluster0.apwfsls.mongodb.net/foodappmern?retryWrites=true&w=majority";
const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://vaghasiyayashvi:YashviFoodApp123@cluster0.apwfsls.mongodb.net/foodappmern?retryWrites=true&w=majority";



//For SignUP
router.post(
  '/signup',
  [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }).withMessage('Name should be at least 5 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters long'),
    body('location').notEmpty(),
  ],
  async (req, res) => {
    const { name, email, password, location } = req.body;

    const client = new MongoClient(uri);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      await client.connect();

      const collection = client.db("foodappmern").collection("users");

      // Check if email already exists
      const existingUser = await collection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ errors: "Email already exists" });

      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save the user to the database
      const result = await collection.insertOne({ name, email, password: hashedPassword, location });
      console.log("Data inserted:", result);

      // Generate an authentication token
      const token = jwt.sign({ email }, "secret-key");
      res.status(200).json({ message: "Sign-up successful", token });


    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred during sign-up" });
    } finally {
      await client.close();
    }
  }
);



//For Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const collection = client.db("foodappmern").collection("users");

    const userData = await collection.findOne({ email });

    if (!userData) {
      return res.status(400).json({ errors: "Incorrect email" });
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      return res.status(400).json({ errors: "Incorrect password" });
    }

    // Generate an authentication token
    const token = jwt.sign({ email }, "secret-key"); // Replace "secret-key" with your own secret key

    return res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  } finally {
    await client.close();
  }
});


router.post('/foodData', (req, res) => {
  const foodItems = req.foodItems;
  const foodCategory = req.foodCategory;

  console.log("Food Items: ", foodItems);
  console.log("Food Category: ", foodCategory);

  res.status(200).json({ foodItems, foodCategory });
});


router.post('/orderData', async (req, res) => {
  const data = req.body.order_data;
  const orderDate = req.body.order_date;
  const email = req.body.email;

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const collection = client.db("foodappmern").collection("orders");

    const existingOrder = await collection.findOne({ email });

    if (!existingOrder) {
      // Create a new order document
      await collection.insertOne({ email, orders: [{ order_date: orderDate, order_data: data }] });
    } else {
      // Update existing order document
      await collection.updateOne(
        { email },
        { $push: { orders: { order_date: orderDate, order_data: data } } }
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.send("Server Error");
  } finally {
    await client.close();
  }
});


router.post('/myorderData', async(req,res)=>{
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const collection = client.db("foodappmern").collection("orders");

    const myData= await collection.findOne({ 'email': req.body.email })

    res.json({orderData: myData})
  }
  catch(error){
    res.send("Server Error ",error.message);
  }
})

router.post('/contactus',async(req,res)=>{
  const client = new MongoClient(uri);
    try{
      await client.connect();

      const collection = client.db("foodappmern").collection("contactquery");

       
    const doc = {
      name: req.body.name,
      email: req.body.email,
      query: req.body.query,
    };

  
    const result = await collection.insertOne(doc);
    console.log("Data inserted successfully:", result.insertedId);
  } catch (error) {
    console.log("Error inserting data:", error);
    }
    
})

module.exports = router;
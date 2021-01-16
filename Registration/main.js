/*
  Run this commands in the terminal:
    npm init
    npm install express
    npm install mongodb
    npm install bcrypt
*/

const bcrypt = require('bcrypt'); //bcrypt for hashing the password
const express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/"; 

const app = express()
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
app.use(express.static('public')); /*tells express to go to public folder,
    by default, it'll look for the index page
*/

//app.post is a route/url pattern
app.post('/register', (request,response) =>{
    /*
        All this info below comes from the register.js, since the info
        is posted by the form and fetched by the server(main.js)
        --------------------------------------------------------------
        According to tutorials the way to do it is to have a model which
        will handle all the collection/tables/classes...So far its chowing
        me. We're suppose to use mongoose, but everytime I tried it failed
        
    */
    const hash = bcrypt.hashSync(request.body.password, 8);
    const name = request.body.name;
    const surname = request.body.surname;
    const address = request.body.address;
    const phonenumber = request.body.phonenumber;
    const email = request.body.email;
    const data = {name,surname,address,phonenumber,email,hash}
    MongoClient.connect(url, async (err, db)  => {
        if (err) throw err;
        var dbo = db.db("Hospital"); //Hospital is the name of the database in Mongo
        dbo.collection("Patient").insertOne(data, function(err, res) {
            //Patient is a collection/table in the Hospital database
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
        });
    });
    response.json({
        /* I don't understand this part yet, its suppose to return the name
           to the regsuccess.html page
        */
        status: 'success',
        name: data.name
    });
    console.log('Got you'); //Should print this upon success
});


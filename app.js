//1. require express (which is a node.js framework used for building the backend- like an electronic screwdriver when node is a regular screwdriver and javascript is a screw) the syntax is: const express = require('express'); but if you add type: 'module'; to the package.json (which is created when we write npm init -y in the console), the we can use the import syntax:
import express from 'express';

//same for fs (node native package called file system which we use to write files from input and read them see below)

import fs from 'fs';

//and for bodyParser (an npm packege used for parsing json data and we can use it for getting hold of user input sent from the browser to our server)
// const bodyParser = require("body-parser");
import bodyParser from 'body-parser';

import { dirname } from "path";
import { fileURLToPath } from "url";

//2.
const app = express();

//3. enables us to use other static files such as css and images with our html
app.use(express.static("public"));

//4.dont know
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

//6.whith the server running, if we write localhost:3000 in our browser this will send a request to our home route. we handle it like this:
app.get('/', function (req, res) {
    res.sendFile(`${__dirname}/index.html`);//sending the index.html back to the browser
});

//here we are using bodyParser and fs to handle user input from a form
app.post('/', function (req, res) {
    const message = req.body.message;
    // Read the existing HTML file
    fs.readFile(__dirname + "/public/adar.html", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error reading file");
        }

        // Replace a specific placeholder in the HTML file with the message
        const modifiedHTML = data.replace("{{message_placeholder}}", message);

        // Send the modified HTML file as a response
        res.send(modifiedHTML);
    });
});

//5. spin up the server by writing in the console: node/nodemon app.js
app.listen(port, function () {
    console.log('Server is running on port 3000');
});
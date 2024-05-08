//import express from 'express';
//import bodyParser from 'body-parser';
//import RE2 from 're2';
var RE2 = require("re2");
var bodyParser = require('body-parser');    
var express = require('express');
// const vm = require('vm');
var super_regexp = require('super-regex');
//import {isMatch} from 'super-regex';
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/index',(req, res) => {
    const input = req.body.input;
    const regex = /A(B|C+)+D/; 

    const result = regex.test(input);
  
    if (result) {
      res.send('Regex matched successfully');
    } else {
      res.status(400).send('Regex did not match');
    }
});

app.post('/diff_regex_engine',(req, res) => {
    const input = req.body.input;
    var re = new RE2("A(B|C+)+D");
    const result = re.test(input);
  
    if (result) {
      res.send('Regex matched successfully');
    } else {
      res.status(400).send('Regex did not match');
    }
});

// app.post('/alternate_logic',(req, res) => {
//     const input = req.body.input;
//     var re = new RE2("/A(B|C+)+D/");
//     const result = re.match(input);
  
//     if (result) {
//       res.send('Regex matched successfully');
//     } else {
//       res.status(400).send('Regex did not match');
//     }
// });

app.post('/repair', (req, res) => {
    const input = req.body.input;
    const regex = /A((?:(?:(?!.).)|(?:(?:[BC])+)))D/; // Repaired Regular Expression

    if (regex.test(input)) {
        res.status(200).json({ message: 'Input is valid' });
    } else {
        res.status(400).json({ message: 'Invalid input' });
    }
});

app.post('/timeout', (req, res) => {
    const input = req.body.input;
    const regex = /A(B|C+)+D/; // Example regex
    // if (regex.test(input)) {
    //     res.status(200).json({ message: 'Input is valid' });
    // } else {
    //     res.status(400).json({ message: 'Invalid input' });
    // }
    // if (isMatch(/A(B|C+)+D/,input,{timeout: 1000})) {
    //     res.status(200).json({ message: 'Input is valid' });
    // } else {
    //     res.status(400).json({ message: 'Invalid input' });
    // }
    console.time('request');
        if (super_regexp.isMatch(/A(B|C+)+D/, input, { timeout: 1000 })) {
            res.status(200).json({ message: 'Input is valid' });
        } else {
            res.status(400).json({ message: 'Invalid input' });
        }
    console.timeEnd('request');
});


app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
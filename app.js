import express from 'express';
import bodyParser from 'body-parser';
//const bodyParser = require('body-parser');
// const util = require('util');
import util from 'util';
import vm from 'vm';
// const vm = require('vm');
import {isMatch} from 'super-regex';
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

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
        if (isMatch(/A(B|C+)+D/, input, { timeout: 1000 })) {
            res.status(200).json({ message: 'Input is valid' });
        } else {
            res.status(400).json({ message: 'Invalid input' });
        }
    console.timeEnd('request');
});

// app.post('/complexity', (req, res) => {
//     const input = req.body.input;
//     const regex = /A(B|C+)+D/; // Example regex

//     const start = process.hrtime.bigint(); // Get the start time
//     regex.test(input); // Perform the regex match
//     const end = process.hrtime.bigint(); // Get the end time

//     // Calculate the difference in milliseconds and use it as the score
//     const score = Number(end - start) / 1e6;

//     // Set the score as a custom HTTP header in the response
//     res.setHeader('X-Regex-Complexity', score);

//     res.send('OK');
// });

app.post('/index',(req, res) => {
    const input = req.body.input;
    const regex = /A(B|C+)+D/; // Example regex

    const result = regex.test(input);
  
    if (result) {
      res.send('Regex matched successfully');
    } else {
      res.status(400).send('Regex did not match');
    }
});



app.post('/repair', (req, res) => {
    const input = req.body.input;
    const regex = /A((?:(?:(?!.).)|(?:(?:[BC])+)))D/; // Repaired Regular Expression

    if (regex.test(input)) {
        res.status(200).json({ message: 'Input is valid' });
    } else {
        res.status(400).json({ message: 'Invalid input' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
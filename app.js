//import express from 'express';
//import bodyParser from 'body-parser';
//import RE2 from 're2';
var RE2 = require("re2");
var bodyParser = require('body-parser');    
var express = require('express');
const dns = require('dns');
//var super_regexp = require('super-regex');
//import {isMatch} from 'super-regex';
const app = express();
const PORT = 3000;

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
    var re = new RE2(/^([a-zA-Z0-9._]+)+@gmail\.com$/); // Uses RE2 regex engine, this does not support backtracking

    const result = re.test(input);
  
    if (result) {
      res.send('Regex matched successfully');
    } else {
      res.status(400).send('Regex did not match');
    }
});

function validateEmailDomain(email) {
    return new Promise((resolve, reject) => {
        const domain = email.substring(email.lastIndexOf("@") + 1);
        dns.resolveMx(domain, (err, addresses) => {
            if (err) {
                console.error('Error while resolving MX records:', err);
                resolve(false);
            } else if (addresses && addresses.length > 0) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

function validateEmailAddress(email) {
    if (typeof email !== 'string') return false;
    validateEmailDomain(email)
    .then(isValid => {
        if (!isValid) {
            return false;
        }
    });

    const atSymbolIndex = email.indexOf('@');
    const dotSymbolIndex = email.lastIndexOf('.');

    return (atSymbolIndex > 0 && dotSymbolIndex > atSymbolIndex + 1 && dotSymbolIndex < email.length - 1);
    
}

app.post('/alternate_logic',(req, res) => {
    const input = req.body.input;

  
    if (validateEmailAddress(input)) {
      res.send('Email validated successfully');
    } else {
      res.status(400).send('Error validating email');
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

app.post('/limit_input',(req, res) => {
    const input = req.body.input;
    const regex = /A(B|C+)+D/; 

    if (input.length > 1000) // developer's choice
        res.status(400).send('Input length is too long');

    const result = regex.test(input);
    
    if (result) {
      res.send('Regex matched successfully');
    } else {
      res.status(400).send('Regex did not match');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
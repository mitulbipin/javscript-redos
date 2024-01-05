const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route to handle form submission
app.post('/validate', (req, res) => {
    const input = req.body.input;
    const regex = /A(B|C+)+D/; // Example regex

    if (regex.test(input)) {
        res.status(200).json({ message: 'Input is valid' });
    } else {
        res.status(400).json({ message: 'Invalid input' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

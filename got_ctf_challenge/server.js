const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

app.use(cookieParser());
app.use(express.static('public'));

// Middleware to set default cookie on all routes
app.use((req, res, next) => {
    if (!req.cookies.role) {
        res.cookie('role', 'commoner');
    }
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/secret_vault', (req, res) => {
    const userRole = req.cookies.role;

    if (userRole === 'Lord_Treasurer') {
        res.send("<h1>Success!</h1><p>The Iron Throne is yours. Flag: <b>ByteMe{Easier_Than_The_Long_Night}</b></p>");
    } else {
        res.send(`<h1>Access Denied</h1><p>Your current role is '${userRole}'. Only the 'Lord_Treasurer' can enter.</p>`);
    }
});

app.listen(3000, () => console.log('Easy CTF running on http://localhost:3000'));


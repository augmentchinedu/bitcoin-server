// Required Modules
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const vhost = require('vhost');


// Initialize Main App
const app = express();

// Main App Middleware
app.use(cors());
app.use(morgan('tiny'));

// Determinine Domain For Request From JSON File

var addons = JSON.parse(fs.readFileSync('addons.json', 'utf8'));
addons.forEach(function (addon) {
    var website = express();
    website.use(express.static(path.join(__dirname, addon.path)));
    app.use(vhost(addon.domain, website));
});


// Fallback display incase no domain is active
app.use(express.static(path.join(__dirname, 'public')));
// Port Configuration
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server Started At Port ${port}`);
});

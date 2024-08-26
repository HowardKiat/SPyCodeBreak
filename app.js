const express = require('express');
const path = require('path');

const app = express();

// View dir
app.set('views', path.join(__dirname, 'views'));
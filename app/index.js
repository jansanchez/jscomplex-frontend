#!/usr/bin/env node
'use strict';
// Imports
import path from 'path';
import express from 'express';
import {index} from './controllers/project.js';

// Server
const app = express();
const port = 3000;

// Setting up the Express Server
app.use(express.static(path.join(__dirname, '/public/')));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

// Routes
app.get('/', index);

// Running the Express Server
app.listen(port, () => {
  console.log(`Server running in localhost:${port}`);
});

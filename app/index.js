#!/usr/bin/env node
'use strict';

// Imports
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import project from './controllers/project.js';

// Server
const app = express();
const port = 3000;
const url = 'http://localhost:3001/';

// Setting up the Express Server
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/static', express.static(__dirname + '/public/'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

// Routes
app.get('/', project.index);
app.get('/new-project', project.newProject);
app.post('/new-project', project.newProject);
app.get('/delete-project/:id', project.deleteProject);
app.get('/project/:id', project.viewProject);
app.get('/scan-project/:id', project.scanProject);
app.get('/scan/:id/:id_date', project.scanDate);

// Running the Express Server
app.listen(port, () => {
  console.log(`Server running in localhost:${port}`);
});

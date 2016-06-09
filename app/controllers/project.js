#!/usr/bin/env node
'use strict';

// Imports
import mongoose from 'mongoose';
import projectSchema from '../models/project';

// Connection URL
const url = 'mongodb://localhost/jscomplex';
// Connect to the Server
const db = mongoose.createConnection(url);
const Project = db.model('Project', projectSchema);

exports.index = (request, response, next) => {
  const gotProjects = (err, projects) => {
    if (err) {
      return err;
    }
    return response.render('index', {title: 'Project\'s List', projects});
  };
  const projects = Project.find(gotProjects);
};

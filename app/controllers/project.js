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

exports.newProject = (request, response, next) => {
  if (request.method === 'POST') {
    const name = request.body.name;
    const path = request.body.path;
    let recursive = false;

    if (request.body.recursive === 'on'){
      recursive = true;
    };
    const project = new Project({
        name: name,
        path: path,
        recursive: recursive
    });
    const onSaved = (err) => {
      if (err) {
        console.log(err)
        return next(err)
      }
      return response.redirect('/');
    };
    project.save(onSaved);
  } else {
    return response.render('new-project', {title: 'New Project'});
  }
};

/*
exports.postNewProject = (request, response, next) => {

};*/

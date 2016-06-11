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
    if (projects.length === 0){
      projects = false;
    }
    const vars = {
      title: 'Project\'s List',
      projects
    };

    if (request.query.invalid) {
      vars.invalid = request.query.invalid;
    }
    return response.render('index', vars);
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

exports.deleteProject = (request, response, next) => {
  if (request.method === 'GET') {
    const id = request.params.id;

    const gotProjects = (err, project) => {
      if (project === undefined || project === null ) {
        console.log('ID invalido');
        const string = encodeURIComponent('true');
        return response.redirect('/?invalid=' + string);
      }

      if (err) {
        console.log('err 1');
        console.log(err);
        return err;
      }

      const onRemoved = (err) => {
        if (err) {
          console.log('err 2');
          console.log(err);
          return next(err);
        }
        return response.redirect('/');
      };

      project.remove(onRemoved);
    };

    Project.findById(id, gotProjects);

  };
};

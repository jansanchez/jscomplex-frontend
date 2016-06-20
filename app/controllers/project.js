#!/usr/bin/env node
'use strict';

// Imports
import mongoose from 'mongoose';
import projectSchema from '../models/project';
import fileSchema from '../models/file';
import reviewSchema from '../models/review';
import JSComplex from 'jscomplex';
const ObjectId = mongoose.Schema.Types.ObjectId;

// Connection URL
const url = 'mongodb://localhost/jscomplex';
// Connect to the Server
const db = mongoose.createConnection(url);

const Project = db.model('Project', projectSchema);
const Review = db.model('Review', reviewSchema);
const File = db.model('File', fileSchema);

exports.index = (request, response, next) => {
  const {method, query} = request;
  if (method === 'GET') {
    const gotProjects = (err, projects) => {
      if (err) {
        console.log(err);
        return err;
      }
      if (projects.length === 0) {
        projects = false;
      }
      const variables = {
        title: 'Project\'s List',
        projects
      };
      if (query.invalid) {
        variables.invalid = query.invalid;
      }
      return response.render('index', variables);
    };
    Project.find(gotProjects);
  }
};

exports.newProject = (request, response, next) => {
  const {method, body} = request;
  if (request.method === 'POST') {
    const {name, path, recursive} = body;
    let isRecursive = false;

    if (recursive === 'on') {
      isRecursive = true;
    }
    const project = new Project({
        name, path, recursive: isRecursive
    });
    const onSaved = err => {
      if (err) {
        console.log(err);
        return next(err);
      }
      return response.redirect('/');
    };
    project.save(onSaved);
  } else {
    return response.render('new-project', {title: 'New Project'});
  }
};

exports.deleteProject = (request, response, next) => {
  const {method, params} = request;
  if (method === 'GET') {
    const {id} = params;

    const gotProject = (err, project) => {
      if (project === undefined || project === null) {
        console.log('ID invalido');
        const string = encodeURIComponent('true');
        return response.redirect(`/?invalid=#{string}`);
      }

      if (err) {
        console.log('err 1');
        console.log(err);
        return err;
      }

      const onRemoved = err => {
        if (err) {
          console.log('err 2');
          console.log(err);
          return next(err);
        }
        return response.redirect('/');
      };
      project.remove(onRemoved);
    };
    Project.findById(id, gotProject);
  }
};

exports.viewProject = (request, response, next) => {
  const {method, params, query} = request;
  if (method === 'GET') {
    const {id} = params;

    const gotProject = (err, project) => {
      if (project === undefined || project === null) {
        console.log('ID invalido');
        const string = encodeURIComponent('true');
        return response.redirect(`/?invalid=#{string}`);
      }
      if (err) {
        console.log('err 1');
        console.log(err);
        return err;
      }

      let average = [];
      for (var i = 0; i < project.reviews.length; i++) {
        let accumulator = 0;
        let avg = 0;
        for (var j = 0; j < project.reviews[i].files.length; j++) {
          accumulator += project.reviews[i].files[j].mi;
        }
        avg = (accumulator / project.reviews[i].files.length).toFixed(2);
        average.push({average: avg});
      }

      const variables = {
        title: `Project: #{project.name}`,
        project,
        average
      };


      if (query.invalid) {
        variables.invalid = query.invalid;
      }
      return response.render('project', variables);
    };
    Project.findById(id, gotProject);
  }
};

exports.scanProject = (request, response, next) => {
  const {method, params, query} = request;
  if (method === 'GET') {
    const {id} = params;

    const gotProject = (err, project) => {
      if (project === undefined || project === null) {
        console.log('ID invalido');
        const string = encodeURIComponent('true');
        return response.redirect(`/?invalid=#{string}`);
      }
      if (err) {
        console.log('err 1');
        console.log(err);
        return err;
      }



      if (query.invalid) {
        variables.invalid = query.invalid;
      }

      const review = new Review({
        files: []
      });

      const file = new File({
        path: '/var/www/',
        mi: 160,
        magnitude: 9
      });

      // for
      review.files.push(file);
      // console.log(review);

      let average = [];

      project.reviews.push(review);

      let variables = {
        title: `Project: #{project.name}`,
        project
      };

      project.save(() => {

        for (var i = 0; i < project.reviews.length; i++) {
          let accumulator = 0;
          let avg = 0;
          for (var j = 0; j < project.reviews[i].files.length; j++) {
            accumulator += project.reviews[i].files[j].mi;
          }
          avg = (accumulator / project.reviews[i].files.length).toFixed(2);
          average.push({average: avg});
        }
        console.log('Grabo!!!')

        variables.average = average;


        return response.render('project', variables);
      });






    };

    const projectResult = Project.findById(id, gotProject);
  }
};

import {Schema} from 'mongoose';

const projectSchema = new Schema({
  name: String,
  path: String,
  recursive: Boolean
});

const Project = module.exports = projectSchema;

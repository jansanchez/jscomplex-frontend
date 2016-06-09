import {Schema} from 'mongoose';

const projectSchema = new Schema({
  name: String
});

const Project = module.exports = projectSchema;

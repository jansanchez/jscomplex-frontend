import {Schema} from 'mongoose';
import reviewSchema from './review';

const projectSchema = new Schema({
  name: String,
  path: String,
  recursive: Boolean,
  reviews: [reviewSchema]
});

const Project = module.exports = projectSchema;

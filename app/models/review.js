import {Schema} from 'mongoose';
import fileSchema from './file.js';

const reviewSchema = new Schema({
  date: {type: Date, default: Date.now},
  files: [fileSchema]
});

module.exports = reviewSchema;

import {Schema} from 'mongoose';

const fileSchema = new Schema({
  path: String,
  mi: Number,
  magnitude: Number
});

module.exports = fileSchema;

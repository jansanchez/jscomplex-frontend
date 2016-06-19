import {Schema} from 'mongoose';

const fileSchema = new Schema({
  path: String,
  mi: Number
});

module.exports = fileSchema;

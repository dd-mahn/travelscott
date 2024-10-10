import { Schema, model } from 'mongoose';

const subscribeSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  }
});

const Subscribe = model('Subscribe', subscribeSchema);

export default Subscribe;

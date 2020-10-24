import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, lowercase: true },
  password: String,
}, { collection: 'users', timestamps: true });
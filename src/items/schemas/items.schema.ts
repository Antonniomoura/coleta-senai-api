import * as mongoose from 'mongoose';

export const ItemsSchema = new mongoose.Schema({
  title: { type: String },
  image_url: { type: String },
}, { collection: 'items', timestamps: true });
import * as mongoose from 'mongoose';

export const PointsSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  whatsapp: { type: Number },
  uf: { type: String },
  city: { type: String },
  latitude: { type: String },
  longitude: { type: String },
  items: { type: [] },
  image: { type: String },
}, { collection: 'points', timestamps: true });
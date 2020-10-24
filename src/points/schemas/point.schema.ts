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
  status: { type: Boolean },
  image: { type: String },
  byUserId: { type: String },
  userId: { type: String, required: true },
}, { collection: 'points', timestamps: true });

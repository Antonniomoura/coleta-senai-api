import { Document } from 'mongoose';

export interface IPoint extends Document {
  name: string;
  email: string;
  whatsapp: number;
  uf: string;
  city: string;
  latitude: string;
  longitude: string;
  items: [];
  image: string;
}
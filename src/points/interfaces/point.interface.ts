import { Document } from 'mongoose';

export interface IPoint extends Document {
  name: string;
  email: string;
  whatsapp: number;
  uf: string;
  city: string;
  latitude: string;
  status: boolean;
  longitude: string;
  userId: string;
  byUserId: string;
  items: [];
  image: string;
}

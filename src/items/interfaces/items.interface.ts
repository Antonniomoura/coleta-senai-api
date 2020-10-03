import { Document } from 'mongoose';

export interface IItems extends Document {
  readonly title: string;
  readonly image_url: string;
}
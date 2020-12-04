import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({
  _id: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
  },
})
export class Company {
  @Prop({ required: true, unique: true })
  id: string;
  name: string;
  webPage: string;
  latitude: string;
  longitude: string;
  email: string;
  phone: string;
  address: string;
  tripAdvisor: string;
  facebook: string;
  localNumber: string;
  googleMapLink: string;
  opinionCount: string;
  rating: string;
  metro: Record<string, unknown>;
  city: Record<string, unknown>;
  image: Record<string, unknown>;
  rank: string;
  @Prop([String])
  games: string[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);

CompanySchema.virtual('_games', {
  ref: 'Game',
  localField: 'games',
  foreignField: 'id',
});

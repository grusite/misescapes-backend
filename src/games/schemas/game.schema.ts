import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GameDocument = Game & Document;

@Schema({ _id: true, versionKey: false })
export class Game {
  @Prop({ required: true, unique: true })
  id: string;
  name: string;
  company: string;
  description: string;
  city: Record<string, unknown>;
  minGamer: string;
  maxGamer: string;
  duration: string;
  minPrice: string;
  maxPrice: string;
  bookingUrl: string;
  audienceAge: string;
  comingSoon: string;
  viewed: string;
  isCombatMode: string;
  combatText: string;
  equalRoom: string;
  videos: string;
  categories: any;
  audience: any;
  themes: any;
  files: any;
  comments: any;
  wideImage: Record<string, unknown>;
  narrowImage: Record<string, unknown>;
  reviewCount: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);

// GameSchema.virtual('_company', {
//   ref: 'company',
//   localField: 'company',
//   foreignField: 'id',
//   justOne: true,
// });

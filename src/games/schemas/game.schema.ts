import * as mongoose from 'mongoose';

export const GameSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      index: true,
      unique: true,
    },
    name: String,
    company: String,
    description: String,
    city: Object,
    minGamer: String,
    maxGamer: String,
    duration: String,
    minPrice: String,
    maxPrice: String,
    bookingUrl: String,
    audienceAge: String,
    comingSoon: String,
    viewed: String,
    isCombatMode: String,
    combatText: String,
    equalRoom: String,
    videos: String,
    categories: mongoose.SchemaTypes.Mixed,
    audience: mongoose.SchemaTypes.Mixed,
    themes: mongoose.SchemaTypes.Mixed,
    files: mongoose.SchemaTypes.Mixed,
    comments: mongoose.SchemaTypes.Mixed,
    wideImage: Object,
    narrowImage: Object,
    reviewCount: String,
  },
  { _id: true, versionKey: false },
);

GameSchema.virtual('_company', {
  ref: 'company',
  localField: 'company',
  foreignField: 'id',
  justOne: true,
});

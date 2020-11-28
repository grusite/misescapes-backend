import * as mongoose from 'mongoose';

export const CompanySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      index: true,
      unique: true,
    },
    name: String,
    webPage: String,
    latitude: String,
    longitude: String,
    email: String,
    phone: String,
    address: String,
    tripAdvisor: String,
    facebook: String,
    localNumber: String,
    googleMapLink: String,
    opinionCount: String,
    rating: String,
    metro: Object,
    city: Object,
    image: Object,
    rank: String,
    games: [String],
  },
  { _id: true, versionKey: false },
);

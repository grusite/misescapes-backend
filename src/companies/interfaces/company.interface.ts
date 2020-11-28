import { Document } from 'mongoose';

export interface Company extends Document {
  readonly id: string;
  readonly name: string;
  readonly webPage: string;
  readonly latitude: string;
  readonly longitude: string;
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly tripAdvisor: string;
  readonly facebook: string;
  readonly localNumber: string;
  readonly googleMapLink: string;
  readonly opinionCount: string;
  readonly rating: string;
  readonly metro: Record<string, unknown>;
  readonly city: Record<string, unknown>;
  readonly image: Record<string, unknown>;
  readonly rank: string;
  readonly games: string[];
}

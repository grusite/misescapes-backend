import { Document } from 'mongoose';

export interface Game extends Document {
  readonly id: string;
  readonly name: string;
  readonly company: string;
  readonly description: string;
  readonly city: Record<string, unknown>;
  readonly minGamer: string;
  readonly maxGamer: string;
  readonly duration: string;
  readonly minPrice: string;
  readonly maxPrice: string;
  readonly bookingUrl: string;
  readonly audienceAge: string;
  readonly comingSoon: string;
  readonly viewed: string;
  readonly isCombatMode: string;
  readonly combatText: string;
  readonly equalRoom: string;
  readonly videos: string;
  readonly categories: any;
  readonly audience: any;
  readonly themes: any;
  readonly files: any;
  readonly comments: any;
  readonly wideImage: Record<string, unknown>;
  readonly narrowImage: Record<string, unknown>;
  readonly reviewCount: string;
}

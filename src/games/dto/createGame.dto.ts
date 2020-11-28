import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  company: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  city: Record<string, unknown>;

  @ApiProperty()
  minGamer: string;

  @ApiProperty()
  maxGamer: string;

  @ApiProperty()
  duration: string;

  @ApiProperty()
  minPrice: string;

  @ApiProperty()
  maxPrice: string;

  @ApiProperty()
  bookingUrl: string;

  @ApiProperty()
  audienceAge: string;

  @ApiProperty()
  comingSoon: string;

  @ApiProperty()
  viewed: string;

  @ApiProperty()
  isCombatMode: string;

  @ApiProperty()
  combatText: string;

  @ApiProperty()
  equalRoom: string;

  @ApiProperty()
  videos: string;

  @ApiProperty()
  categories: any;

  @ApiProperty()
  audience: any;

  @ApiProperty()
  themes: any;

  @ApiProperty()
  files: any;

  @ApiProperty()
  comments: any;

  @ApiProperty()
  wideImage: Record<string, unknown>;

  @ApiProperty()
  narrowImage: Record<string, unknown>;

  @ApiProperty()
  reviewCount: string;
}

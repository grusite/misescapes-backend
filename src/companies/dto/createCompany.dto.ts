import { ApiProperty } from '@nestjs/swagger';

export class CreateCompaniesDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  webPage: string;

  @ApiProperty()
  latitude?: string;

  @ApiProperty()
  longitude?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  tripAdvisor?: string;

  @ApiProperty()
  facebook?: string;

  @ApiProperty()
  localNumber?: string;

  @ApiProperty()
  googleMapLink?: string;

  @ApiProperty()
  opinionCount?: string;

  @ApiProperty()
  rating?: string;

  @ApiProperty()
  metro?: Record<string, unknown>;

  @ApiProperty()
  city?: Record<string, unknown>;

  @ApiProperty()
  image?: Record<string, unknown>;

  @ApiProperty()
  rank?: string;

  @ApiProperty()
  games: string[];
}

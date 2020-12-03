import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { Game, GameSchema } from './schemas/game.schema';
import { Company, CompanySchema } from '../companies/schemas/company.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeatureAsync([
      {
        name: Game.name,
        useFactory: () => {
          const schema = GameSchema;
          schema.virtual('_company', {
            ref: 'Company',
            localField: 'company',
            foreignField: 'id',
            justOne: true,
          });
          return schema;
        },
      },
      {
        name: Company.name,
        useFactory: () => {
          const schema = CompanySchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService],
})
export class GamesModule {}

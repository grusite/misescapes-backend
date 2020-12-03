import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { Company, CompanySchema } from './schemas/company.schema';
import { Game, GameSchema } from '../games/schemas/game.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeatureAsync([
      {
        name: Company.name,
        useFactory: () => {
          const schema = CompanySchema;
          schema.virtual('_games', {
            ref: 'Game',
            localField: 'games',
            foreignField: 'id',
          });
          return schema;
        },
      },
      {
        name: Game.name,
        useFactory: () => {
          const schema = GameSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}

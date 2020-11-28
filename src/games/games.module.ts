import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { GameSchema } from './schemas/Game.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'Games', schema: GameSchema }]),
  ],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}

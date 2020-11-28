import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { GameDto } from './dto/game.dto';
// import { CreateGameDto } from './dto/createGame.dto';
import { Game } from './interfaces/game.interface';

@Injectable()
export class GamesService {
  constructor(@InjectModel('Games') private gamesModel: Model<Game>) {}

  async findAll(): Promise<GameDto[]> {
    return await this.gamesModel.find().exec();
  }

  async findById(id: string): Promise<GameDto> {
    const game = await this.gamesModel.findById(id).exec();

    if (!game) {
      throw new HttpException(`Game doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return game;
  }
}

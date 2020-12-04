import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { GameDto } from './dto/game.dto';
// import { CreateGameDto } from './dto/createGame.dto';
import { Game, GameDocument } from './schemas/game.schema';

@Injectable()
export class GamesService {
  constructor(@InjectModel(Game.name) private gameModel: Model<GameDocument>) {}

  async findAll(): Promise<GameDto[]> {
    return await this.gameModel.find().populate('_company');
  }

  async findById(id: string): Promise<GameDto> {
    const [game] = await this.gameModel.find({ id }).populate('_company');

    if (!game) {
      throw new HttpException(`Game doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return game;
  }
}

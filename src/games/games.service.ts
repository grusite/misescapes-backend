import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { GameDto } from './dto/game.dto';
// import { CreateGameDto } from './dto/createGame.dto';
import { Game, GameDocument } from './schemas/game.schema';
import { Company, CompanyDocument } from '../companies/schemas/company.schema';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<GameDocument>,
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async findAll(): Promise<GameDto[]> {
    return await this.gameModel.find().exec();
  }

  async findById(id: string): Promise<GameDto> {
    const game = await this.gameModel.findById(id).exec();

    if (!game) {
      throw new HttpException(`Game doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return game;
  }
}

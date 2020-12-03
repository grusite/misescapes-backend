import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CompanyDto } from './dto/company.dto';
// import { CreateCompanyDto } from './dto/createCompany.dto';
import { Company, CompanyDocument } from './schemas/company.schema';
import { Game, GameDocument } from '../games/schemas/game.schema';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    @InjectModel(Game.name) private gameModel: Model<GameDocument>,
  ) {}

  async findAll(): Promise<CompanyDto[]> {
    // return await this.companyModel.find().populate('_games');
    return await this.companyModel
      .find()
      .populate('_games')
      .exec();
  }

  async findById(id: string): Promise<CompanyDto> {
    const company = await this.companyModel.findById(id).exec();

    if (!company) {
      throw new HttpException(`Company doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return company;
  }
}

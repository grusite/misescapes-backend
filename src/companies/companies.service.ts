import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CompaniesDto } from './dto/company.dto';
// import { CreateCompaniesDto } from './dto/createCompany.dto';
import { Companies } from './interfaces/company.interface';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel('Companies') private companiesModel: Model<Companies>,
  ) {}

  async findAll(): Promise<CompaniesDto[]> {
    return await this.companiesModel.find().exec();
  }

  async findById(id: string): Promise<CompaniesDto> {
    const company = await this.companiesModel.findById(id).exec();

    if (!company) {
      throw new HttpException(`Company doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return company;
  }
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CompanyDto } from './dto/company.dto';
// import { CreateCompanyDto } from './dto/createCompany.dto';
import { Company, CompanyDocument } from './schemas/company.schema';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companiesModel: Model<CompanyDocument>,
  ) {}

  async findAll(): Promise<CompanyDto[]> {
    return await this.companiesModel.find().exec();
  }

  async findById(id: string): Promise<CompanyDto> {
    const company = await this.companiesModel.findById(id).exec();

    if (!company) {
      throw new HttpException(`Company doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return company;
  }
}

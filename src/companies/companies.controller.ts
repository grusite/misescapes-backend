import {
  Controller,
  Res,
  Param,
  HttpStatus,
  NotFoundException,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CompaniesService } from './companies.service';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get('all')
  async findAll(@Res() res) {
    const companies = await this.companiesService.findAll();
    return res.status(HttpStatus.OK).json(companies);
  }

  @Get(':id')
  async findById(@Res() res, @Param('id') id: string) {
    const company = await this.companiesService.findById(id);
    if (!company) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json(company);
  }
}

import {
  Body,
  Controller,
  Res,
  Query,
  Param,
  HttpStatus,
  NotFoundException,
  Get,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

import { CompaniesService } from './companies.service';

@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get('all')
  async findAll(@Res() res) {
    const lists = await this.companiesService.findAll();
    return res.status(HttpStatus.OK).json(lists);
  }

  @Get(':id')
  async findById(@Res() res, @Param('id') id: string) {
    const lists = await this.companiesService.findById(id);
    if (!lists) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json(lists);
  }
}

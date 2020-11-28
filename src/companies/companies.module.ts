import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CompanySchema } from './schemas/company.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'Companies', schema: CompanySchema }]),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}

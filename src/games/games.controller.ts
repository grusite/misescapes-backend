import {
  Controller,
  Res,
  Param,
  HttpStatus,
  NotFoundException,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GamesService } from './games.service';

@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get('all')
  async findAll(@Res() res) {
    const games = await this.gamesService.findAll();
    return res.status(HttpStatus.OK).json(games);
  }

  @Get(':id')
  async findById(@Res() res, @Param('id') id: string) {
    const game = await this.gamesService.findById(id);
    if (!game) throw new NotFoundException('Id does not exist!');
    return res.status(HttpStatus.OK).json(game);
  }
}

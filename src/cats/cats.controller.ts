import {
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Delete,
  HttpException,
} from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCat() {
    throw new HttpException('api not', 401);
    return 'all cat';
  }

  @Get(':id')
  getOneCat() {
    return 'all cat';
  }

  @Post()
  updateCat() {
    return 'create cat';
  }

  @Put(':id')
  updatePartialCat() {
    return 'create cat';
  }

  @Patch(':id')
  createCat() {
    return 'create cat';
  }

  @Delete(':id')
  deleteCat() {
    return 'create cat';
  }
}

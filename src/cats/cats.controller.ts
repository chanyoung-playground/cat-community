import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCat() {
    return 'all cat';
  }

  @Post()
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 200,
    description: 'The cat has been successfully created.',
    type: ReadOnlyCatDto,
  })
  async signup(@Body() body: CatRequestDto) {
    return await this.catsService.signup(body);
  }
}

import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @ApiOperation({ summary: '현재 고양이' })
  @UseGuards(JwtAuthGuard)
  getCat(@Req() req: Request) {
    return req.user;
  }

  @Post('login')
  @ApiOperation({ summary: '로그인' })
  login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }

  @Post('signup')
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

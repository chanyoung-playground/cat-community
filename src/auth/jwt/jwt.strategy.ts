import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Payload } from './jwt.payload';
import { Repository } from 'typeorm';
import { Cat } from 'src/cats/cats.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const cat = await this.catsRepository.findOne({
      where: { id: Number(payload.sub) },
      select: ['id', 'name', 'email'],
    });

    if (!cat) {
      throw new UnauthorizedException('접근 오류');
    }

    return cat;
  }
}

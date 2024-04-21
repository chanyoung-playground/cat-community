import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './cats.entity';
import { Repository } from 'typeorm';
import { CatRequestDto } from './dto/cats.request.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  async signup(body: CatRequestDto) {
    console.log(body);
    const { email, password, name } = body;
    const isCatExists = await this.catsRepository.findOne({ where: { email } });

    if (isCatExists) {
      throw new UnauthorizedException('duplicated');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCat = this.catsRepository.create({
      email,
      password: hashedPassword,
      name,
    });
    await this.catsRepository.save(newCat);

    return newCat;
  }
}

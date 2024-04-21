import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: 'email',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  @Column()
  email: string;

  @ApiProperty({
    type: String,
    description: 'password',
    required: true,
  })
  @Column()
  @Exclude()
  password: string;

  @ApiProperty({
    type: String,
    description: 'name',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column({ nullable: true })
  imgUrl?: string;

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude()
  updatedAt: Date;
}

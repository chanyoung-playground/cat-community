import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.entity';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    type: String,
    description: 'id',
    required: true,
  })
  id: number;
}

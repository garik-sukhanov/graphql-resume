import { InputType, Field, Int } from '@nestjs/graphql';
import { Length, Max, Min } from 'class-validator';

@InputType()
export class CreateSkillDTO {
  @Field(() => String)
  @Length(1, 50)
  name: string;

  @Field(() => String)
  @Length(1, 50)
  category: string;

  @Field(() => Int)
  @Min(0)
  @Max(5)
  level: number;
}

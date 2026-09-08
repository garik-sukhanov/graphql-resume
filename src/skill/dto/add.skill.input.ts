import { SkillCategory } from '@/generated/prisma/enums';
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEnum, Length, Max, Min } from 'class-validator';

@InputType()
export class AddSkillInput {
  @Field(() => String)
  @Length(1, 50)
  name: string;

  @Field(() => SkillCategory)
  @IsEnum(SkillCategory)
  category: SkillCategory;

  @Field(() => Int)
  @Min(0)
  @Max(5)
  level: number;
}

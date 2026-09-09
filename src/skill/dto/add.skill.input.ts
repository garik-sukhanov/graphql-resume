import { SkillCategory } from '@/generated/prisma/enums';
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsString, Length, Max, Min } from 'class-validator';

@InputType()
export class AddSkillInput {
  @Field(() => String)
  @IsString()
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

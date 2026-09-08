import { SkillCategory } from '@/generated/prisma/enums';
import { ObjectType, Field, ID, Int, registerEnumType } from '@nestjs/graphql';

registerEnumType(SkillCategory, {
  name: 'SkillCategory',
  description: 'Категория навыка: ',
});

@ObjectType()
export class Skill {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => SkillCategory)
  category: SkillCategory;

  @Field(() => Int)
  level: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

import { SkillCategory } from '@/generated/prisma/enums';
import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

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
}

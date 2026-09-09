import { Experience } from '@/experience/entities/experience.entity';
import { Link } from '@/link/entities/link.entity';
import { Project } from '@/project/entities/project.entity';
import { Skill } from '@/skill/entities/skill.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  phone: string | null;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => [Skill])
  skills?: Skill[];

  @Field(() => [Experience])
  experiences?: Experience[];

  @Field(() => [Project])
  projects?: Project[];

  @Field(() => [Link])
  links?: Link[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

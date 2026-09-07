import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Skill {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  category: string;

  @Field(() => Int)
  level: number;

  @Field(() => ID, { nullable: true })
  profileId?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Link {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  label: string;

  @Field(() => String)
  url: string;

  @Field(() => Int)
  order: number;
}

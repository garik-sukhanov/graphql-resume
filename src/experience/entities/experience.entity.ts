import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Experience {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  position: string;

  @Field(() => String)
  company: string;

  @Field(() => String)
  start: string;

  @Field(() => String)
  end: string;

  @Field(() => String)
  description: string;
}

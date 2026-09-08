import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Experience {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  position: string;

  @Field(() => String)
  company: string;

  @Field(() => Date)
  start: Date;

  @Field(() => Date, { nullable: true })
  end: Date | null;

  @Field(() => [String])
  achievements: string[];
}

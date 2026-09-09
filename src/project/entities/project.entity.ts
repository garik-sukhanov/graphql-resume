import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  linkGitHub: string;

  @Field(() => String, { nullable: true })
  linkDeploy?: string | null;

  @Field(() => Int, { defaultValue: 0 })
  order: number;
}

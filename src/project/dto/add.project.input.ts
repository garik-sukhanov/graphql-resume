import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUrl, Length } from 'class-validator';

@InputType()
export class AddProjectInput {
  @Field(() => String)
  @IsString()
  @Length(1, 50)
  name: string;

  @Field(() => String)
  @IsString()
  @Length(1, 500)
  description: string;

  @Field(() => String)
  @IsUrl()
  @Length(1, 100)
  linkGitHub: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUrl()
  @Length(1, 100)
  linkDeploy?: string | null;
}

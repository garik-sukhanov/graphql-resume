import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, IsUrl, Length } from 'class-validator';

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
  @Length(1, 255)
  linkGitHub: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUrl()
  @Length(1, 255)
  linkDeploy?: string | null;

  @Field(() => Int, { defaultValue: 0 })
  @IsInt()
  order: number;
}

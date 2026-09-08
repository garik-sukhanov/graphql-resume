import { Field, InputType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class AddExperienceInput {
  @Field(() => String)
  @IsString()
  @Length(1, 50)
  position: string;

  @Field(() => String)
  @IsString()
  @Length(1, 50)
  company: string;

  @Field(() => String)
  @IsString()
  @Length(1, 50)
  start: string;

  @Field(() => String)
  @IsString()
  @Length(1, 50)
  end: string;

  @Field(() => String)
  @IsString()
  @Length(1, 500)
  description: string;
}

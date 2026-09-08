import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString, Length } from 'class-validator';

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

  @Field(() => Date)
  @IsDate()
  start: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  end: Date | null;

  @Field(() => [String])
  @IsString({ each: true })
  @Length(1, 200, { each: true })
  achievements: string[];
}

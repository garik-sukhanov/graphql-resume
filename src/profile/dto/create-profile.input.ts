import { AddExperienceInput } from '@/experience/dto';
import { AddSkillInput } from '@/skill/dto';
import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

@InputType()
export class CreateProfileInput {
  @Field(() => String)
  @IsString()
  @Length(1, 50)
  name: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Length(1, 500)
  description?: string;

  @Field(() => [AddSkillInput], { defaultValue: [] })
  @ValidateNested({ each: true })
  @Type(() => AddSkillInput)
  skills: AddSkillInput[];

  @Field(() => [AddExperienceInput], { defaultValue: [] })
  @ValidateNested({ each: true })
  @Type(() => AddExperienceInput)
  experiences: AddExperienceInput[];
}

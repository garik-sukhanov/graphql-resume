import { AddSkillInput } from '@/skill/dto';
import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

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
}

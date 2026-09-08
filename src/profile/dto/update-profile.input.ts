import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Length(1, 500)
  description: string;
}

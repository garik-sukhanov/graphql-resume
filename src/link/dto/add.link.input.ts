import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsString, Length } from 'class-validator';

@InputType()
export class AddLinkInput {
  @Field(() => String)
  @IsString()
  @Length(1, 50)
  label: string;

  @Field(() => String)
  @IsString()
  @Length(1, 255)
  url: string;

  @Field(() => Int, { defaultValue: 0 })
  @IsInt()
  order: number;
}

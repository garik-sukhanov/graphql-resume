import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { IsUUID, Length, Max, Min } from 'class-validator';

@InputType()
export class CreateSkillDTO {
  @Field(() => String)
  @Length(1, 50)
  name: string;

  @Field(() => String)
  @Length(1, 50)
  category: string;

  @Field(() => Int)
  @Min(0)
  @Max(5)
  level: number;

  @Field(() => ID)
  @IsUUID(4)
  profileId?: string;
}

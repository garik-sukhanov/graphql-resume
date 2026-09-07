import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

@InputType()
export class GetSkillsParams {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  profileId?: string;

  @Field(() => Int, { nullable: true, defaultValue: 100 })
  @IsOptional()
  @IsInt()
  @Max(100)
  @Min(1)
  limit: number | undefined | null = 100;
}

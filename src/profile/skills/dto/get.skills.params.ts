import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class GetSkillsParams {
  @IsOptional()
  profileId?: string;

  @IsOptional()
  @IsInt()
  @Max(100)
  @Min(1)
  limit: number | undefined | null = 100;
}

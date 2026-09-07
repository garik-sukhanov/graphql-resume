import { IsUUID } from 'class-validator';

export class GetSkillParams {
  @IsUUID(4)
  skillId: string;
}

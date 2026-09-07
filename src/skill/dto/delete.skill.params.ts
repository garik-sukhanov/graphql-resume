import { IsUUID } from 'class-validator';

export class DeleteSkillParams {
  @IsUUID(4)
  skillId: string;
}

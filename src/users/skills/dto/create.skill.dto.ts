import { Length } from 'class-validator';

export class CreateSkillDTO {
  @Length(1, 50)
  name: string;
}

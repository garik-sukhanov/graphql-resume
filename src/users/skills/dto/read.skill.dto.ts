import { Length } from 'class-validator';

export class ReadSkillDTO {
  id: string;

  @Length(1, 50)
  name: string;
}

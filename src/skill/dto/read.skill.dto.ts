import { Length } from 'class-validator';

export class ReadSkillDTO {
  id: string;

  @Length(1, 50)
  name: string;

  @Length(1, 50)
  category: string;

  level: number;

  profileId?: string;

  createdAt: Date;

  updatedAt: Date;
}

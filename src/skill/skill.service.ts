import { Injectable } from '@nestjs/common';
import { CreateSkillDTO } from './dto/create.skill.dto';

@Injectable()
export class SkillService {
  create(createSkillInput: CreateSkillDTO) {
    return 'This action adds a new skill';
  }

  findMany() {
    return `This action returns many skill`;
  }

  findOne(id: string) {
    return `This action returns a #${id} skill`;
  }

  remove(id: string) {
    return `This action removes a #${id} skill`;
  }
}

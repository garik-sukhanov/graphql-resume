import { Injectable } from '@nestjs/common';
import { CreateSkillDTO, GetSkillsParams } from './dto';
import { randomUUID } from 'crypto';
type Skill = {
  id: string;
  name: string;
};

const skillsMock: Skill[] = [
  {
    id: '1',
    name: 'JavaScript',
  },
  {
    id: '2',
    name: 'TypeScript',
  },
  {
    id: '3',
    name: 'Node.js',
  },
];

@Injectable()
export class SkillsService {
  async getMany(params: GetSkillsParams): Promise<Skill[]> {
    return Promise.resolve(skillsMock);
  }

  async getOne(skillId: string): Promise<Skill | undefined> {
    return Promise.resolve(skillsMock.find(skill => skill.id === skillId));
  }

  async create(skill: Omit<Skill, 'id'>): Promise<{ id: string }> {
    const id = randomUUID();
    skillsMock.push({ ...skill, id });
    return Promise.resolve({ id });
  }

  async delete(skillId: string): Promise<void> {
    const index = skillsMock.findIndex(s => s.id === skillId);
    if (index !== -1) {
      Promise.resolve(skillsMock.splice(index, 1)[0]);
    } else {
      Promise.reject(new Error('Skill not found'));
    }
  }
}

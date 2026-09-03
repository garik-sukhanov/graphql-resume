import { Injectable } from '@nestjs/common';
import { CreateSkillDTO, GetSkillsParams, ReadSkillDTO } from './dto';
import { PrismaService } from '@/prisma';
type Skill = {
  id: string;
  name: string;
};

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}
  async getMany(params: GetSkillsParams): Promise<Skill[]> {
    return await this.prisma.skill.findMany();
  }

  async getOne(skillId: string): Promise<ReadSkillDTO | null> {
    return await this.prisma.skill.findUnique({
      where: {
        id: skillId,
      },
    });
  }

  async create(skill: CreateSkillDTO): Promise<{ id: string }> {
    const id = await this.prisma.skill
      .create({
        data: {
          name: skill.name,
        },
      })
      .then(skill => skill.id);
    return Promise.resolve({ id });
  }

  async delete(skillId: string): Promise<void> {
    const res = await this.prisma.skill.delete({
      where: {
        id: skillId,
      },
    });
    if (!res) {
      throw new Error(`Skill with id ${skillId} not found`);
    }
    return Promise.resolve();
  }
}

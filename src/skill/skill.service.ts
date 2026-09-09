import { PrismaService } from '@/prisma';
import { Injectable } from '@nestjs/common';
import { AddSkillInput } from './dto/add.skill.input';

@Injectable()
export class SkillService {
  constructor(private readonly prisma: PrismaService) {}
  add(profileId: string, input: AddSkillInput) {
    return this.prisma.skill.create({
      data: {
        name: input.name,
        category: input.category,
        level: input.level,
        profileId,
      },
    });
  }

  get(profileId: string) {
    return this.prisma.skill.findMany({
      where: { profileId },
      orderBy: { category: 'asc' },
    });
  }

  remove(skillId: string) {
    return this.prisma.skill.delete({
      where: {
        id: skillId,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { AddSkillInput } from './dto/add.skill.input';
import { PrismaService } from '@/prisma';

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

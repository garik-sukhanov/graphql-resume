import { Injectable } from '@nestjs/common';
import { CreateSkillDTO } from './dto/create.skill.dto';
import { PrismaService } from '@/prisma';

@Injectable()
export class SkillService {
  constructor(private readonly prisma: PrismaService) {}
  create(createSkillInput: CreateSkillDTO) {
    return this.prisma.skill.create({
      data: {
        name: createSkillInput.name,
        category: createSkillInput.category,
        level: createSkillInput.level,
        profileId: createSkillInput.profileId,
      },
    });
  }

  findMany() {
    return this.prisma.skill.findMany();
  }

  findOne(id: string) {
    return this.prisma.skill.findUnique({
      where: {
        id,
      },
    });
  }

  remove(id: string) {
    return this.prisma.skill.delete({
      where: {
        id,
      },
    });
  }
}

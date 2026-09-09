import { PrismaService } from '@/prisma';
import { Injectable } from '@nestjs/common';
import { AddExperienceInput } from './dto';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) {}

  get(profileId: string) {
    return this.prisma.experience.findMany({
      where: { profileId },
      orderBy: { start: 'desc' },
    });
  }

  add(profileId: string, input: AddExperienceInput) {
    return this.prisma.experience.create({
      data: { ...input, profileId },
    });
  }

  remove(experienceId: string) {
    return this.prisma.experience.delete({
      where: {
        id: experienceId,
      },
    });
  }
}

import { PrismaService } from '@/prisma';
import { Injectable } from '@nestjs/common';
import { AddProjectInput } from './dto';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}
  create(profileId: string, input: AddProjectInput) {
    return this.prisma.project.create({
      data: { ...input, profileId },
    });
  }

  get(profileId: string) {
    return this.prisma.project.findMany({
      where: { profileId },
      orderBy: { order: 'asc' },
    });
  }

  remove(projectId: string) {
    return this.prisma.project.delete({ where: { id: projectId } });
  }
}

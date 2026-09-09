import { PrismaService } from '@/prisma';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLError } from 'graphql';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  private get ownerEmail(): string {
    return this.config.getOrThrow<string>('OWNER_EMAIL');
  }

  private async guardOwner(id: string) {
    const { email } = await this.prisma.profile.findUniqueOrThrow({
      where: { id },
      select: { email: true },
    });

    if (email === this.ownerEmail) {
      throw new GraphQLError('Профиль владельца нельзя изменять или удалять', {
        extensions: { code: 'FORBIDDEN' },
      });
    }
  }

  create({
    skills = [],
    experiences = [],
    projects = [],
    links = [],
    ...profile
  }: CreateProfileInput) {
    return this.prisma.profile.create({
      data: {
        ...profile,
        skills: { create: skills },
        experiences: { create: experiences },
        projects: { create: projects },
        links: { create: links },
      },
    });
  }

  profile() {
    return this.prisma.profile.findFirstOrThrow({
      where: { email: process.env.OWNER_EMAIL },
    });
  }

  // данная ручка оставлена как отладочная, для проверки создания новых профилей.
  // проблему N+1 не решал намерено, тк DataLoader сильно увеличивал кодовую базу и не влиял на основное задание
  profiles() {
    return this.prisma.profile.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, profile: UpdateProfileInput) {
    await this.guardOwner(id);
    return this.prisma.profile.update({
      where: { id },
      data: { ...profile },
    });
  }

  async delete(profileId: string) {
    await this.guardOwner(profileId);
    return this.prisma.profile.delete({
      where: {
        id: profileId,
      },
    });
  }
}

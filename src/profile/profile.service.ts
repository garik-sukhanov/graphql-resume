import { PrismaService } from '@/prisma';
import { Injectable } from '@nestjs/common';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  create({ skills = [], experiences = [], ...profile }: CreateProfileInput) {
    return this.prisma.profile.create({
      data: {
        ...profile,
        skills: { create: skills },
        experiences: { create: experiences },
      },
    });
  }

  profile() {
    return this.prisma.profile.findFirstOrThrow({
      orderBy: { createdAt: 'desc' },
    });
  }

  update(id: string, profile: UpdateProfileInput) {
    return this.prisma.profile.update({
      where: { id },
      data: { ...profile },
    });
  }

  delete(profileId: string) {
    return this.prisma.profile.delete({
      where: {
        id: profileId,
      },
    });
  }
}

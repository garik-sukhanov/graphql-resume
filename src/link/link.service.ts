import { PrismaService } from '@/prisma';
import { Injectable } from '@nestjs/common';
import { AddLinkInput } from './dto/add.link.input';

@Injectable()
export class LinkService {
  constructor(private readonly prisma: PrismaService) {}
  add(profileId: string, input: AddLinkInput) {
    return this.prisma.link.create({
      data: { ...input, profileId },
    });
  }

  get(profileId: string) {
    return this.prisma.link.findMany({
      where: { profileId },
      orderBy: { order: 'asc' },
    });
  }

  remove(linkId: string) {
    return this.prisma.link.delete({ where: { id: linkId } });
  }
}

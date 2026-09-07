import { Injectable } from '@nestjs/common';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { PrismaService } from '@/prisma';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProfileInput: CreateProfileInput) {
    return 'This action adds a new profile';
  }

  findAll() {
    return this.prisma.profile.findMany();
  }

  findOne(id: string) {
    return `this.prisma.profile.findUnique({
      where: { id },
    })`;
  }

  update(id: string, updateProfileInput: UpdateProfileInput) {
    return `This action updates a #${id} profile`;
  }

  remove(id: string) {
    return `This action removes a #${id} profile`;
  }
}

import { PrismaService } from '@/prisma';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UpdateProfileInput } from './dto/update-profile.input';
import { ProfileService } from './profile.service';

const OWNER_EMAIL = 'owner@example.com';
const OTHER_EMAIL = 'someone@example.com';

const patch = { name: 'Новое имя' } as UpdateProfileInput;

describe('ProfileService: защита профиля владельца', () => {
  let service: ProfileService;
  let prisma: {
    profile: {
      findUniqueOrThrow: ReturnType<typeof vi.fn>;
      update: ReturnType<typeof vi.fn>;
      delete: ReturnType<typeof vi.fn>;
    };
  };

  beforeEach(async () => {
    prisma = {
      profile: {
        findUniqueOrThrow: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        ProfileService,
        { provide: PrismaService, useValue: prisma },
        { provide: ConfigService, useValue: { getOrThrow: () => OWNER_EMAIL } },
      ],
    }).compile();

    service = moduleRef.get(ProfileService);
  });

  it('не даёт удалить профиль владельца', async () => {
    prisma.profile.findUniqueOrThrow.mockResolvedValue({ email: OWNER_EMAIL });

    await expect(service.delete('owner-id')).rejects.toThrow(/владельца/);
    expect(prisma.profile.delete).not.toHaveBeenCalled();
  });

  it('не даёт изменить профиль владельца', async () => {
    prisma.profile.findUniqueOrThrow.mockResolvedValue({ email: OWNER_EMAIL });

    await expect(service.update('owner-id', patch)).rejects.toThrow(
      /владельца/,
    );
    expect(prisma.profile.update).not.toHaveBeenCalled();
  });

  it('позволяет удалить чужой профиль', async () => {
    prisma.profile.findUniqueOrThrow.mockResolvedValue({ email: OTHER_EMAIL });
    prisma.profile.delete.mockResolvedValue({ id: 'other-id' });

    await expect(service.delete('other-id')).resolves.toEqual({
      id: 'other-id',
    });
    expect(prisma.profile.delete).toHaveBeenCalledWith({
      where: { id: 'other-id' },
    });
  });

  it('позволяет изменить чужой профиль', async () => {
    prisma.profile.findUniqueOrThrow.mockResolvedValue({ email: OTHER_EMAIL });
    prisma.profile.update.mockResolvedValue({
      id: 'other-id',
      name: 'Новое имя',
    });

    await expect(service.update('other-id', patch)).resolves.toMatchObject({
      name: 'Новое имя',
    });
  });
});

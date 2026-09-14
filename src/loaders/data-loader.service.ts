import { Skill } from '@/skill/entities/skill.entity';
import { SkillService } from '@/skill/skill.service';
import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Loaders } from './loaders';

@Injectable()
export class LoadersFactory {
  constructor(private skillService: SkillService) {}

  create(): Loaders {
    return {
      skillsByProfile: new DataLoader<string, Skill[]>(async profileIds => {
        const rows = await this.skillService.getManyByProfileIds(profileIds);

        const byProfile = new Map<string, Skill[]>();
        for (const row of rows) {
          const group = byProfile.get(row.profileId) ?? [];
          group.push(row);
          byProfile.set(row.profileId, group);
        }

        return profileIds.map(id => byProfile.get(id) ?? []);
      }),
    };
  }
}

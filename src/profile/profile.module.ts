import { ExperienceModule } from '@/experience/experience.module';
import { LinkModule } from '@/link/link.module';
import { ProjectModule } from '@/project/project.module';
import { SkillModule } from '@/skill/skill.module';
import { Module } from '@nestjs/common';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';

@Module({
  providers: [ProfileResolver, ProfileService],
  imports: [SkillModule, ExperienceModule, ProjectModule, LinkModule],
})
export class ProfileModule {}

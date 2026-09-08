import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillResolver } from './skill.resolver';

@Module({
  providers: [SkillResolver, SkillService],
  exports: [SkillService],
})
export class SkillModule {}

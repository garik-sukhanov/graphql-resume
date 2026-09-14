import { SkillModule } from '@/skill/skill.module';
import { Module } from '@nestjs/common';
import { LoadersFactory } from './data-loader.service';

@Module({
  imports: [SkillModule],
  providers: [LoadersFactory],
  exports: [LoadersFactory],
})
export class LoadersModule {}

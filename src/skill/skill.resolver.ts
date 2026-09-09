import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { AddSkillInput } from './dto';
import { Skill } from './entities/skill.entity';
import { SkillService } from './skill.service';

@Resolver(() => Skill)
export class SkillResolver {
  constructor(private readonly skillService: SkillService) {}

  @Mutation(() => Skill, { name: 'addSkill' })
  add(
    @Args('profileId', { type: () => ID }) profileId: string,
    @Args('input') input: AddSkillInput,
  ) {
    return this.skillService.add(profileId, input);
  }

  @Mutation(() => Skill, { name: 'removeSkill' })
  remove(@Args('skillId', { type: () => ID }) skillId: string) {
    return this.skillService.remove(skillId);
  }
}

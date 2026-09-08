import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';
import { SkillService } from './skill.service';
import { Skill } from './entities/skill.entity';
import { AddSkillInput } from './dto';

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

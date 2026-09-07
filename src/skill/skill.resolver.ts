import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { SkillService } from './skill.service';
import { Skill } from './entities/skill.entity';
import { CreateSkillDTO, GetSkillsParams } from './dto';

@Resolver(() => Skill)
export class SkillResolver {
  constructor(private readonly skillService: SkillService) {}

  @Mutation(() => Skill, { name: 'createSkill' })
  create(@Args('createSkillInput') createSkillInput: CreateSkillDTO) {
    return this.skillService.create(createSkillInput);
  }

  @Query(() => [Skill], { name: 'findManySkills' })
  findMany(@Args('params', { nullable: true }) params?: GetSkillsParams) {
    return this.skillService.findMany();
  }

  @Query(() => Skill, { name: 'findOneSkill', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.skillService.findOne(id);
  }

  @Mutation(() => Skill, { name: 'removeSkill', nullable: true })
  remove(@Args('id', { type: () => ID }) id: string) {
    return this.skillService.remove(id);
  }
}

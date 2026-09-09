import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { AddExperienceInput } from './dto';
import { Experience } from './entities/experience.entity';
import { ExperienceService } from './experience.service';

@Resolver()
export class ExperienceResolver {
  constructor(private readonly experienceService: ExperienceService) {}

  @Mutation(() => Experience, { name: 'addExperience' })
  add(
    @Args('profileId', { type: () => ID }) profileId: string,
    @Args('input') input: AddExperienceInput,
  ) {
    return this.experienceService.add(profileId, input);
  }

  @Mutation(() => Experience, { name: 'removeExperience' })
  remove(@Args('experienceId', { type: () => ID }) experienceId: string) {
    return this.experienceService.remove(experienceId);
  }
}

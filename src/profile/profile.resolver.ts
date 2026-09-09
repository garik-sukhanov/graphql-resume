import { Experience } from '@/experience/entities/experience.entity';
import { ExperienceService } from '@/experience/experience.service';
import { Link } from '@/link/entities/link.entity';
import { LinkService } from '@/link/link.service';
import { Project } from '@/project/entities/project.entity';
import { ProjectService } from '@/project/project.service';
import { Skill } from '@/skill/entities/skill.entity';
import { SkillService } from '@/skill/skill.service';
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Profile } from './entities/profile.entity';
import { ProfileService } from './profile.service';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly skillService: SkillService,
    private readonly experienceService: ExperienceService,
    private readonly projectService: ProjectService,
    private readonly linkService: LinkService,
  ) {}

  @Mutation(() => Profile, { name: 'createProfile' })
  createProfile(@Args('input') input: CreateProfileInput) {
    return this.profileService.create(input);
  }

  @Query(() => [Profile], { name: 'profiles' })
  profiles() {
    return this.profileService.profiles();
  }

  @Query(() => Profile, { name: 'profile' })
  profile() {
    return this.profileService.profile();
  }

  @ResolveField(() => [Skill], { name: 'skills' })
  skills(@Parent() profile: Profile) {
    return this.skillService.get(profile.id);
  }

  @ResolveField(() => [Experience])
  experiences(@Parent() profile: Profile) {
    return this.experienceService.get(profile.id);
  }

  @ResolveField(() => [Project])
  projects(@Parent() profile: Profile) {
    return this.projectService.get(profile.id);
  }

  @ResolveField(() => [Link])
  links(@Parent() profile: Profile) {
    return this.linkService.get(profile.id);
  }

  @Mutation(() => Profile, { name: 'updateProfile' })
  updateProfile(
    @Args('profileId', { type: () => ID }) profileId: string,
    @Args('input') input: UpdateProfileInput,
  ) {
    return this.profileService.update(profileId, input);
  }

  @Mutation(() => Profile, { name: 'deleteProfile' })
  deleteProfile(@Args('profileId', { type: () => ID }) profileId: string) {
    return this.profileService.delete(profileId);
  }
}

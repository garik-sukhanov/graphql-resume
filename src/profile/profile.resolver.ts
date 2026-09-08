import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Skill } from '@/skill/entities/skill.entity';
import { SkillService } from '@/skill/skill.service';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly skillService: SkillService,
  ) {}

  @Mutation(() => Profile, { name: 'createProfile' })
  createProfile(@Args('input') input: CreateProfileInput) {
    return this.profileService.create(input);
  }

  @Query(() => Profile, { name: 'profile' })
  profile() {
    return this.profileService.profile();
  }

  @ResolveField(() => [Skill], { name: 'skills' })
  skills(@Parent() profile: Profile) {
    return this.skillService.get(profile.id);
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

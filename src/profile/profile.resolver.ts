import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Profile)
  createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
  ) {
    return this.profileService.create(createProfileInput);
  }

  @Query(() => [Profile], { name: 'findAllProfiles' })
  findAllProfiles() {
    return this.profileService.findAll();
  }

  @Query(() => Profile, { name: 'findOneProfile', nullable: true })
  findOneProfile(@Args('id', { type: () => ID }) id: string) {
    return this.profileService.findOne(id);
  }

  @Mutation(() => Profile)
  updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ) {
    return this.profileService.update(
      updateProfileInput.id,
      updateProfileInput,
    );
  }

  @Mutation(() => Profile)
  removeProfile(@Args('id', { type: () => ID }) id: string) {
    return this.profileService.remove(id);
  }
}

import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { AddLinkInput } from './dto/add.link.input';
import { Link } from './entities/link.entity';
import { LinkService } from './link.service';

@Resolver(() => Link)
export class LinkResolver {
  constructor(private readonly linkService: LinkService) {}

  @Mutation(() => Link, { name: 'addLink' })
  addLink(
    @Args('profileId', { type: () => ID }) profileId: string,
    @Args('input') input: AddLinkInput,
  ) {
    return this.linkService.add(profileId, input);
  }

  @Mutation(() => Link, { name: 'removeLink' })
  removeLink(@Args('linkId', { type: () => ID }) linkId: string) {
    return this.linkService.remove(linkId);
  }
}

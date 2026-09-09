import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { AddProjectInput } from './dto/add.project.input';
import { Project } from './entities/project.entity';
import { ProjectService } from './project.service';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation(() => Project, { name: 'addProject' })
  addProject(
    @Args('profileId', { type: () => ID }) profileId: string,
    @Args('input') input: AddProjectInput,
  ) {
    return this.projectService.create(profileId, input);
  }

  @Mutation(() => Project, { name: 'removeProject' })
  removeProject(@Args('projectId', { type: () => ID }) projectId: string) {
    return this.projectService.remove(projectId);
  }
}

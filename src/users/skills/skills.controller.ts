import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { SkillsService } from './skills.service';

import {
  ReadSkillDTO,
  CreateSkillDTO,
  GetSkillsParams,
  DeleteSkillParams,
  GetSkillParams,
} from './dto';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  async getMany(@Query() params: GetSkillsParams): Promise<ReadSkillDTO[]> {
    return await this.skillsService.getMany(params);
  }

  @Get('/:skillId')
  async getOne(
    @Param() { skillId }: GetSkillParams,
  ): Promise<ReadSkillDTO | null> {
    return await this.skillsService.getOne(skillId);
  }

  @Post()
  async create(@Body() skill: CreateSkillDTO): Promise<{ id: string }> {
    return await this.skillsService.create(skill);
  }

  @Delete('/:skillId')
  async delete(@Param() { skillId }: DeleteSkillParams): Promise<void> {
    return await this.skillsService.delete(skillId);
  }
}

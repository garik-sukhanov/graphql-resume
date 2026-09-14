import { Skill } from '@/skill/entities/skill.entity';
import DataLoader from 'dataloader';

export interface Loaders {
  skillsByProfile: DataLoader<string, Skill[]>;
}

export interface GqlContext {
  loaders: Loaders;
}

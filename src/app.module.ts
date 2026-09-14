import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter.js';
import { validate } from './config/env.validation';
import { ExperienceModule } from './experience/experience.module';
import { LinkModule } from './link/link.module';
import { LoadersFactory } from './loaders/data-loader.service.js';
import { LoadersModule } from './loaders/loaders.module';
import { PrismaModule } from './prisma/prisma.module.js';
import { ProfileModule } from './profile/profile.module';
import { ProjectModule } from './project/project.module';
import { SkillModule } from './skill/skill.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [LoadersModule],
      inject: [LoadersFactory],
      useFactory: (loaderFactory: LoadersFactory) => ({
        context: () => ({
          loaders: loaderFactory.create(),
        }),
        autoSchemaFile: process.env.VERCEL
          ? true
          : join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        graphiql: false,
        plugins: [
          ApolloServerPluginLandingPageLocalDefault({
            embed: true,
          }),
        ],
      }),
    }),
    PrismaModule,
    ProfileModule,
    SkillModule,
    ExperienceModule,
    ProjectModule,
    LinkModule,
    LoadersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
  ],
})
export class AppModule {}

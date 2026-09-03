import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { GraphQLModule, Query, Resolver } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Resolver()
export class FooResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}

console.log(process.env.YOUR_APP_KEY);
@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    // ObserveModule.forRoot({
    //   appKey: process.env.YOUR_APP_KEY || 'YOUR_APP_KEY',
    //   appSecret: process.env.YOUR_APP_SECRET || 'YOUR_APP_KEY',
    //   serviceId: process.env.SERVICE_ID || 'YOUR_APP_KEY ',
    // }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      graphiql: {
        url: '/graphql',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, FooResolver],
})
export class AppModule {}

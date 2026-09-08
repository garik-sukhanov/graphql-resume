import { ArgumentsHost, Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { Prisma } from '@prisma/generated/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements GqlExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, _host: ArgumentsHost) {
    switch (exception.code) {
      case 'P2025':
        throw new GraphQLError('Запись не найдена', {
          extensions: { code: 'NOT_FOUND' },
        });

      case 'P2002':
        throw new GraphQLError('Запись с такими данными уже существует', {
          extensions: { code: 'BAD_USER_INPUT' },
        });

      case 'P2003':
        throw new GraphQLError('Связанная запись не найдена', {
          extensions: { code: 'BAD_USER_INPUT' },
        });

      default:
        throw new GraphQLError('Внутренняя ошибка', {
          extensions: { code: 'INTERNAL_SERVER_ERROR' },
        });
    }
  }
}

import { plainToInstance, Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsString,
  Matches,
  Max,
  Min,
  validateSync,
} from 'class-validator';

export class EnvironmentVariables {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(65535)
  PORT: number = 3333;

  @IsString()
  @Matches(/^postgres(ql)?:\/\//, {
    message: 'DATABASE_URL должен начинаться с postgresql://',
  })
  DATABASE_URL: string;

  @IsEmail({}, { message: 'OWNER_EMAIL обязателен' })
  OWNER_EMAIL: string;
}

export function validate(config: Record<string, unknown>) {
  const validated = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true, // PORT приходит строкой
  });

  const errors = validateSync(validated, { skipMissingProperties: false });
  if (errors.length > 0) {
    throw new Error(`Некорректное окружение:\n${errors.join('\n')}`);
  }

  return validated;
}

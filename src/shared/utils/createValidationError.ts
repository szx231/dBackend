import { ZodError } from 'zod';

const ZodFastifySchemaValidationErrorSymbol = Symbol.for('ZodFastifySchemaValidationError');

export const createValidationError = (error: ZodError) =>
  error.errors.map((issue) => ({
    [ZodFastifySchemaValidationErrorSymbol]: true,
    keyword: issue.code,
    instancePath: `/${issue.path.join('/')}`,
    schemaPath: `#/${issue.path.join('/')}/${issue.code}`,
    params: {
      issue,
    },
    message: issue.message,
  }));

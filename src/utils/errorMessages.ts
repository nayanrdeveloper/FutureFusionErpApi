export const ERROR_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  DUPLICATE_KEY_ERROR: (field: string) =>
    `Duplicate key error: ${field} already exists.`,
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  NOT_FOUND: (url: string) => `Not Found - ${url}`,
};

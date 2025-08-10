export enum UseCaseErrorType {
  UNAUTHORIZED = 'UNAUTHORIZED',
  CONFLICT = 'CONFLICT',
  NOT_FOUND = 'NOT_FOUND',
  INVALID_INPUT = 'INVALID_INPUT',
}

export interface UseCaseError {
  code: string;
  message: string;
  type: UseCaseErrorType;
}

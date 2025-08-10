export interface UseCaseError {
  code: string;
  message: string;
  type: 'CONFLICT' | 'NOT_FOUND' | 'INVALID_INPUT';
}

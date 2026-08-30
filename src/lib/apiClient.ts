const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

type ApiSuccess<T> = { data: T };
type ApiFailure = { error: { code: string; message: string; details?: unknown } };
type ApiEnvelope<T> = ApiSuccess<T> | ApiFailure;

export class ApiError extends Error {
  code: string;
  details?: unknown;

  constructor(code: string, message: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.details = details;
  }
}

export interface FieldError {
  field: string;
  message: string;
}

export function isFieldErrorArray(value: unknown): value is FieldError[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item: unknown) =>
        typeof item === 'object' && item !== null && 'field' in item && 'message' in item,
    )
  );
}

export function apiGet<T>(path: string): Promise<T> {
  return request<T>(path);
}

export function apiPost<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, { method: 'POST', body: JSON.stringify(body) });
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });
  const envelope = (await response.json()) as ApiEnvelope<T>;

  if (!response.ok || 'error' in envelope) {
    const { code, message, details } =
      'error' in envelope
        ? envelope.error
        : { code: 'UNKNOWN_ERROR', message: 'Request failed', details: undefined };
    throw new ApiError(code, message, details);
  }

  return envelope.data;
}

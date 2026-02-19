const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

async function httpClient<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> {
  const { method = 'GET', headers = {}, body } = config;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: { ...defaultHeaders, ...headers },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        data: null,
        error: data?.message || `HTTP Error: ${response.status}`,
        status: response.status,
      };
    }

    return {
      data,
      error: null,
      status: response.status,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
      status: 0,
    };
  }
}

export const api = {
  get: <T>(endpoint: string, headers?: Record<string, string>) =>
    httpClient<T>(endpoint, { method: 'GET', headers }),

  post: <T>(endpoint: string, body: unknown, headers?: Record<string, string>) =>
    httpClient<T>(endpoint, { method: 'POST', body, headers }),

  put: <T>(endpoint: string, body: unknown, headers?: Record<string, string>) =>
    httpClient<T>(endpoint, { method: 'PUT', body, headers }),

  delete: <T>(endpoint: string, headers?: Record<string, string>) =>
    httpClient<T>(endpoint, { method: 'DELETE', headers }),

  patch: <T>(endpoint: string, body: unknown, headers?: Record<string, string>) =>
    httpClient<T>(endpoint, { method: 'PATCH', body, headers }),
};

export default api;

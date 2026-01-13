import { useState, useCallback } from 'react';

export interface FetchError {
  message: string;
  code?: string;
  status?: number;
}

export const useFetchWithError = () => {
  const [error, setError] = useState<FetchError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(
    async <T,>(
      url: string,
      options?: RequestInit
    ): Promise<{ data: T | null; error: FetchError | null }> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const fetchError: FetchError = {
            message: errorData?.error || `Error ${response.status}`,
            code: errorData?.code || `HTTP_${response.status}`,
            status: response.status,
          };
          setError(fetchError);
          return { data: null, error: fetchError };
        }

        const data = await response.json();
        return { data, error: null };
      } catch (err) {
        const fetchError: FetchError = {
          message: err instanceof Error ? err.message : 'Network error',
          code: 'NETWORK_ERROR',
        };
        setError(fetchError);
        return { data: null, error: fetchError };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { fetchData, error, isLoading, clearError };
};

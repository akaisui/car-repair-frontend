'use client';

import { useState, useCallback } from 'react';
import { UseApiOptions, UseApiResult, ApiError } from '@/types';
import { parseErrorMessage } from '@/lib/utils';

/**
 * Custom hook for API calls with loading, error states
 */
export function useApi<T = any>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: UseApiOptions = {}
): UseApiResult<T> {
  const { immediate = false, onSuccess, onError } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (...args: any[]) => {
    try {
      setLoading(true);
      setError(null);

      const result = await apiFunction(...args);
      setData(result);

      if (onSuccess) {
        onSuccess(result);
      }

      return result;
    } catch (err: any) {
      const errorMessage = parseErrorMessage(err);
      setError(errorMessage);

      if (onError) {
        onError(err);
      }

      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, onSuccess, onError]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}

/**
 * Hook for paginated API calls
 */
export function usePaginatedApi<T = any>(
  apiFunction: (page: number, limit: number, ...args: any[]) => Promise<any>,
  initialLimit: number = 10
) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const {
    data: items,
    loading,
    error,
    execute: baseExecute,
    reset,
  } = useApi(apiFunction, {
    onSuccess: (result) => {
      if (result.pagination) {
        setTotal(result.pagination.total);
        setTotalPages(result.pagination.totalPages);
      }
    },
  });

  const execute = useCallback(async (...args: any[]) => {
    return baseExecute(page, limit, ...args);
  }, [baseExecute, page, limit]);

  const goToPage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const changeLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when changing limit
  }, []);

  const refresh = useCallback(async (...args: any[]) => {
    return execute(...args);
  }, [execute]);

  return {
    items: items?.data || [],
    loading,
    error,
    execute,
    refresh,
    reset,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      goToPage,
      changeLimit,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

/**
 * Hook for form submission with API
 */
export function useFormSubmit<T = any>(
  apiFunction: (data: any) => Promise<T>,
  options: UseApiOptions & {
    resetOnSuccess?: boolean;
    resetForm?: () => void;
  } = {}
) {
  const { resetOnSuccess = false, resetForm, ...apiOptions } = options;

  const { data, loading, error, execute, reset } = useApi(apiFunction, {
    ...apiOptions,
    onSuccess: (result) => {
      if (resetOnSuccess && resetForm) {
        resetForm();
      }
      if (apiOptions.onSuccess) {
        apiOptions.onSuccess(result);
      }
    },
  });

  const submit = useCallback(async (formData: any) => {
    return execute(formData);
  }, [execute]);

  return {
    data,
    loading,
    error,
    submit,
    reset,
  };
}

/**
 * Hook for optimistic updates
 */
export function useOptimisticApi<T = any>(
  apiFunction: (...args: any[]) => Promise<T>,
  optimisticUpdate: (currentData: T | null, ...args: any[]) => T
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (...args: any[]) => {
    try {
      // Apply optimistic update immediately
      setData(prevData => optimisticUpdate(prevData, ...args));
      setLoading(true);
      setError(null);

      // Make actual API call
      const result = await apiFunction(...args);
      setData(result);

      return result;
    } catch (err: any) {
      // Revert optimistic update on error
      const errorMessage = parseErrorMessage(err);
      setError(errorMessage);

      // You might want to revert to previous data here
      // This depends on your specific use case

      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, optimisticUpdate]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}

export default useApi;
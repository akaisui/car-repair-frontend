'use client';

import { brand } from '@/styles/design-system';

// Loading Spinner Component
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'gray';
  className?: string;
}

export function Spinner({ size = 'md', color = 'primary', className = '' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const colorClasses = {
    primary: 'border-primary-200 border-t-primary-500',
    secondary: 'border-secondary-200 border-t-secondary-500',
    white: 'border-white/30 border-t-white',
    gray: 'border-gray-200 border-t-gray-500',
  };

  return (
    <div
      className={`animate-spin rounded-full border-2 ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// Loading Dots Component
interface DotsProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'gray';
  className?: string;
}

export function LoadingDots({ size = 'md', color = 'primary', className = '' }: DotsProps) {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  const colorClasses = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    gray: 'bg-gray-400',
  };

  return (
    <div className={`flex space-x-1 ${className}`} role="status" aria-label="Loading">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse`}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: '1.4s',
          }}
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// Loading Bar Component
interface LoadingBarProps {
  progress?: number;
  color?: 'primary' | 'secondary' | 'success';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

export function LoadingBar({
  progress = 0,
  color = 'primary',
  size = 'md',
  animated = true,
  className = ''
}: LoadingBarProps) {
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const colorClasses = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    success: 'bg-success-500',
  };

  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]} ${className}`}>
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full transition-all duration-500 ease-out ${
          animated && progress === 0 ? 'animate-pulse' : ''
        }`}
        style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}

// Full Page Loading Component
interface PageLoadingProps {
  message?: string;
  showLogo?: boolean;
}

export function PageLoading({ message = 'Đang tải...', showLogo = true }: PageLoadingProps) {
  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center space-y-4">
        {showLogo && (
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-xl bg-primary-500 text-white shadow-lg">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-6 6-6-6m12 0l-6-6-6 6" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8V2M12 8l6-6M12 8L6 2" />
              </svg>
            </div>
          </div>
        )}

        <Spinner size="lg" />

        <div className="space-y-2">
          <p className="text-lg font-semibold text-gray-900">{message}</p>
          <p className="text-sm text-gray-500">{brand.tagline}</p>
        </div>
      </div>
    </div>
  );
}

// Card Loading Skeleton
interface CardSkeletonProps {
  showImage?: boolean;
  lines?: number;
  className?: string;
}

export function CardSkeleton({ showImage = true, lines = 3, className = '' }: CardSkeletonProps) {
  return (
    <div className={`card animate-pulse ${className}`}>
      {showImage && (
        <div className="w-full h-48 bg-gray-200 skeleton" />
      )}

      <div className="card-body space-y-3">
        <div className="h-6 bg-gray-200 skeleton w-3/4" />

        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`h-4 bg-gray-200 skeleton ${
              index === lines - 1 ? 'w-1/2' : 'w-full'
            }`}
          />
        ))}

        <div className="flex space-x-2 pt-2">
          <div className="h-8 w-20 bg-gray-200 skeleton rounded-md" />
          <div className="h-8 w-24 bg-gray-200 skeleton rounded-md" />
        </div>
      </div>
    </div>
  );
}

// List Loading Skeleton
interface ListSkeletonProps {
  items?: number;
  showAvatar?: boolean;
  className?: string;
}

export function ListSkeleton({ items = 5, showAvatar = false, className = '' }: ListSkeletonProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200 animate-pulse">
          {showAvatar && (
            <div className="w-12 h-12 bg-gray-200 skeleton rounded-full" />
          )}

          <div className="flex-1 space-y-2">
            <div className="h-5 bg-gray-200 skeleton w-1/3" />
            <div className="h-4 bg-gray-200 skeleton w-full" />
            <div className="h-4 bg-gray-200 skeleton w-2/3" />
          </div>

          <div className="w-16 h-8 bg-gray-200 skeleton rounded-md" />
        </div>
      ))}
    </div>
  );
}

// Table Loading Skeleton
interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  className?: string;
}

export function TableSkeleton({ rows = 5, columns = 4, showHeader = true, className = '' }: TableSkeletonProps) {
  return (
    <div className={`overflow-hidden bg-white shadow ring-1 ring-black ring-opacity-5 rounded-lg ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        {showHeader && (
          <thead className="bg-gray-50">
            <tr>
              {Array.from({ length: columns }).map((_, index) => (
                <th key={index} className="px-6 py-3">
                  <div className="h-4 bg-gray-200 skeleton w-full" />
                </th>
              ))}
            </tr>
          </thead>
        )}

        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="animate-pulse">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  <div className={`h-4 bg-gray-200 skeleton ${
                    colIndex === 0 ? 'w-3/4' : colIndex === columns - 1 ? 'w-16' : 'w-full'
                  }`} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Form Loading Skeleton
export function FormSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Form fields */}
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="h-4 bg-gray-200 skeleton w-24 mb-2" />
          <div className="h-10 bg-gray-200 skeleton w-full rounded-md" />
        </div>
      ))}

      {/* Textarea */}
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 skeleton w-32 mb-2" />
        <div className="h-24 bg-gray-200 skeleton w-full rounded-md" />
      </div>

      {/* Buttons */}
      <div className="flex space-x-3 pt-4">
        <div className="h-10 w-24 bg-gray-200 skeleton rounded-md" />
        <div className="h-10 w-20 bg-gray-200 skeleton rounded-md" />
      </div>
    </div>
  );
}

// Text Loading Skeleton
interface TextSkeletonProps {
  lines?: number;
  className?: string;
}

export function TextSkeleton({ lines = 3, className = '' }: TextSkeletonProps) {
  return (
    <div className={`space-y-3 animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-gray-200 skeleton ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
}

// Content Loading with Error Fallback
interface ContentLoadingProps {
  isLoading: boolean;
  error?: string | null;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
}

export function ContentLoading({
  isLoading,
  error,
  children,
  loadingComponent,
  errorComponent
}: ContentLoadingProps) {
  if (isLoading) {
    return loadingComponent || <CardSkeleton />;
  }

  if (error) {
    return errorComponent || (
      <div className="p-8 text-center">
        <div className="text-error-500 mb-2">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Có lỗi xảy ra</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return <>{children}</>;
}
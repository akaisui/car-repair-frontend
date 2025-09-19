'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ServicesGrid from '@/components/services/ServicesGrid';
import ServiceFilter, { FilterState } from '@/components/services/ServiceFilter';

export default function ServicesPageContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    priceRange: 'all',
    duration: 'all',
    search: '',
  });
  const [highlightServiceId, setHighlightServiceId] = useState<number | null>(null);

  // Handle URL params for search and highlight
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    const highlightId = searchParams.get('highlight');

    if (searchQuery) {
      setFilters(prev => ({
        ...prev,
        search: searchQuery
      }));
    }

    if (highlightId) {
      setHighlightServiceId(parseInt(highlightId));
      // Remove highlight after 3 seconds
      setTimeout(() => setHighlightServiceId(null), 3000);

      // Scroll to highlighted service after a delay
      setTimeout(() => {
        const highlightedElement = document.querySelector(`[data-service-id="${highlightId}"]`);
        if (highlightedElement) {
          highlightedElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 500);
    }
  }, [searchParams]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="section bg-gray-50 p-6">
      <div className="container-7xl">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ServiceFilter onFilterChange={handleFilterChange} />
          </div>
          <div className="lg:col-span-3">
            <ServicesGrid filters={filters} highlightServiceId={highlightServiceId} />
          </div>
        </div>
      </div>
    </div>
  );
}
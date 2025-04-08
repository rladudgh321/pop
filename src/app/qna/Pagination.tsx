'use client';

import { useState } from 'react';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
};

export default function Pagination({ 
  totalPages, 
  currentPage: initialPage,
  onPageChange 
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="flex space-x-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded ${currentPage === page ? 'bg-amber-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
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
    <div className="flex justify-center mt-8">
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`
              w-10 h-10 rounded-lg font-medium transition-all duration-300
              transform hover:scale-110 hover:shadow-lg
              ${currentPage === page 
                ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-amber-200/50 shadow-lg' 
                : 'bg-white text-amber-600 border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50'}
            `}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
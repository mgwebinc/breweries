'use client';

import React from 'react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void; // Callback to change page
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    // only paginate if there is more than one page
    return null;
  }

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={currentPage === index + 1 ? 'active' : ''}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <style jsx>{`
        .pagination {
            display: flex;
            justify-content: center;
            margin-top: 15px;
            gap: 5px; /* Simple gap */
        }
        .pagination button {
            background-color: #fa8940;
            color: #fff;
            border: 1px solid #fa8940;
            padding: 6px 10px; /* Simple padding */
            cursor: pointer;
            font-size: 0.85em; /* Slightly smaller font */
        }
        .pagination button:hover:not(:disabled) {
            background-color: rgba(255, 255, 255, 0.2); /* Active page highlight */
            border: 1px solid #fa8940; /* Simple border for consistency */
        }
        .pagination button:disabled {
            background-color: #5a5a5a;
            color: #a0a0a0;
            cursor: not-allowed;
            border: 1px solid #fa8940;
        }
        .pagination button.active {
            background-color: rgba(255, 255, 255, 0.2); /* Active page highlight */
            font-weight: bold;
        `}</style>
    </div>
  );
};

export default PaginationControls;
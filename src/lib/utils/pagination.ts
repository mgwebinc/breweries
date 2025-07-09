import { useState, useMemo, useCallback } from "react";

export function usePagination<T>(data: T[], itemsPerPage: number) {
    const [currentPage, setCurrentPage] = useState(1);
  
    // calculate total pages
    const totalItems = data.length;
    const totalPages = useMemo(() => Math.ceil(totalItems / itemsPerPage), [totalItems, itemsPerPage]);
  
    // get the data slice for the current page
    const paginatedData = useMemo(() => {
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      return data.slice(indexOfFirstItem, indexOfLastItem);
    }, [data, currentPage, itemsPerPage]);
  
    // handle page change, ensuring page number is within valid range
    const handlePageChange = useCallback((pageNumber: number) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      }
    }, [totalPages]);
  
    // reset pagination to the first page
    const resetPagination = useCallback(() => {
      setCurrentPage(1);
    }, []);
  
    return {
      paginatedData,
      currentPage,
      totalPages,
      handlePageChange,
      resetPagination,
    };
  }
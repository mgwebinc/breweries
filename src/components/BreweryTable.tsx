"use client";
import React, { useEffect, useState, useMemo} from "react";
import { Brewery } from "../types/types/Brewery";
import { getBreweries } from "../lib/data";
import { groupAndSortBreweries } from "../lib/utils/sorting";
import { usePagination } from "../lib/utils/pagination";
import { getUniqueBreweryTypes } from "../lib/utils/filtering";
import PaginationControls from "./PaginationControls";
import FilterDropdown from "./FilterDropdown";

const BREWERIES_PER_PAGE = 10;

function BreweryTable() {
    const [groupedBreweries, setGroupedBreweries] = useState<Brewery[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedBreweryType, setSelectedBreweryType] = useState<string>('All'); 

    const uniqueBreweryTypes = useMemo(() => {
        return getUniqueBreweryTypes(groupedBreweries);
      }, [groupedBreweries]);

    // we do not set state for filteredBreweries directly, instead we derive it from groupedBreweries and selectedBreweryType
    const filteredBreweries = useMemo(() => {
        if (selectedBreweryType === 'All') {
          return groupedBreweries;
        }
        // filter all breweries by the selected type
        return groupedBreweries.filter(brewery => brewery.brewery_type === selectedBreweryType);
      }, [groupedBreweries, selectedBreweryType]);

    const { 
        paginatedData: breweriesOnCurrentPage,
        currentPage, 
        totalPages, 
        handlePageChange, 
        resetPagination,
      } = usePagination(filteredBreweries, BREWERIES_PER_PAGE);

      const handleBreweryTypeChange = (value: string) => {
        setSelectedBreweryType(value);
        resetPagination(); // Reset pagination to page 1 when filter changes
      };

    useEffect(() => {
        async function fetchBreweries() {
            try {
                const data = await getBreweries();
                const groupedData = groupAndSortBreweries(data);
                setGroupedBreweries(groupedData);
                resetPagination();
            } catch (error) {
                // handle errors appropriately
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred while fetching breweries.");
                }
                console.error("Error fetching breweries:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchBreweries();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    let currentBreweryType: string | null = null; 

    return (
    <div>
      <h1>Breweries</h1>

      <FilterDropdown
        id="brewery-type-filter"
        label="Filter by Type:"
        options={uniqueBreweryTypes}
        selectedOption={selectedBreweryType}
        onValueChange={handleBreweryTypeChange}
      />
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
          {groupedBreweries.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ textAlign: 'center', padding: '10px', color: '#a0a0a0' }}>No breweries found.</td>
              </tr>
            ) : (
              breweriesOnCurrentPage.map((brewery) => {
                // determine if a new group header is needed on this page
                const showTypeHeader = currentBreweryType !== brewery.brewery_type;
                if (showTypeHeader) {
                  currentBreweryType = brewery.brewery_type;
                }

                return (
                  <React.Fragment key={brewery.id}>
                    {showTypeHeader && (
                      <tr className="brewery-type-header">
                        <td colSpan={3}>
                          <strong>{currentBreweryType?.replace(/_/g, ' ').toUpperCase()}</strong>
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td>{brewery.name}</td>
                      <td>{brewery.country}</td>
                      <td>{brewery.brewery_type}</td>
                    </tr>
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}  
      />
      <style jsx global>{`
        .container {
          font-family: 'Inter', sans-serif;
          padding: 20px;
          max-width: 900px;
          margin: 0 auto;
        }
        .title {
          text-align: center;
          color: #333;
          margin-bottom: 20px;
        }
        .table-wrapper {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse; /* Remove default spacing */
          margin-top: 15px; /* Simple spacing */
        }

        th, td {
          border: 1px solid #444a55; /* Simple dark border */
          padding: 8px; /* Simple padding */
          text-align: left;
          color: #e0e0e0;
        }

        th {
          background-color: #424751; /* Dark header background */
          font-weight: bold;
          color: #c0c0c0;
        }

        tr:nth-child(even) {
          background-color: #3a3f4a; /* Alternating rows */
        }

        .brewery-type-header {
          background-color: #4d5261; /* Darker group header background */
          font-weight: bold;
        }
        .brewery-type-header td {
            border-bottom: 2px solid #5a6070; /* Emphasize group separation */
        }       

        .table-wrapper, .pagination button {
            box-shadow: none;
            transition: none;
            border-radius: 0;
        }
        .brewery-type-header, th {
            position: static;
        }

        @media (max-width: 600px) {
            .container {
                padding: 10px;
            }
            th, td, .pagination button {
                padding: 6px 8px;
                font-size: 0.8em;
            }
        }
      `}</style>
      </div>
    );
}

export default BreweryTable;
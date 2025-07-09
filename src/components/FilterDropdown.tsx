'use client';

import React from 'react';

interface FilterDropdownProps {
  label: string;
  options: string[];
  selectedOption: string;
  onValueChange: (option: string) => void;
  id: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selectedOption,
  onValueChange,
  id,
}) => {
  return (
    <div className="filter-dropdown">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={selectedOption}
        onChange={(e) => onValueChange(e.target.value)}
        style={{
            padding: '8px',
            margin: '0 5px',
            backgroundColor: '#fa8940',
            color: '#fff',
            fontSize: '1em',
            minWidth: '150px'
          }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option === 'All' ? `All ${label.replace('Filter by ', '').replace(':', '')}` : option.replace(/_/g, ' ')}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
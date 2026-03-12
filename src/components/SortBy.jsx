
const SortBy = ({ sortBy, onChangeSortBy }) => {
  const SORT_OPTIONS = [
    { value: 'HighToLow', label: 'Price: High to Low' },
    { value: 'LowToHigh', label: 'Price: Low to High' }
  ];

  return (
    <div className="py-3">
      <label className="form-check-label">
        <strong>Sort by</strong>
      </label>
      {SORT_OPTIONS.map(({ value, label }) => (
        <div className="form-check" key={value}>
          <input
            type="radio"
            id={value}
            value={value}
            checked={sortBy === value}
            className="form-check-input"
            name="sort"
            onChange={(e) => onChangeSortBy(e.target.value)}
          />
          <label className="form-check-label" htmlFor={value}>
            {label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SortBy;
const CategoryFilter = ({ handleOnChangeCategory, filterCategory }) => {
  const categories = [
    { id: "MortarPestle", value: "MortarPestle", label: "Mortar & Pestle" },
    { id: "SilBatta", value: "SilBatta", label: "Sil & Batta" },
    { id: "ChaklaBelan", value: "ChaklaBelan", label: "Chakla & Belan" },
    { id: "KitchenDining", value: "KitchenDining", label: "Kitchen & Dining" },
    { id: "StatuesIdols", value: "StatuesIdols", label: "Statues & Idols" },
  ];

  return (
    <>
      <div className="py-3">
        <label className="form-check-label">
          <strong>Category </strong>
        </label>

        {categories.map((category) => (
          <div className="form-check" key={category.id}>
            <input
              type="checkbox"
              className="form-check-input"
              id={category.id}
              value={category.value}
              checked={filterCategory.includes(category.value)}
              onChange={handleOnChangeCategory}
            />
            <label className="form-check-label" htmlFor={category.id}>
              {category.label}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryFilter;

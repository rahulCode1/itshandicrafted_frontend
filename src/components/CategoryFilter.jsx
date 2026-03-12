const CategoryFilter = ({handleOnChangeCategory, filterCategory}) => {
  const categories = [
    { id: "KitchenDining", value: "KitchenDining", label: "Kitchen & Dining" },
    { id: "HomeDecor", value: "HomeDecor", label: "Home & Decor" },
    { id: "ReligiousItems", value: "ReligiousItems", label: "Religious Items" },
    { id: "CorporateGifts", value: "CorporateGifts", label: "Corporate Gifts" },
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

export default CategoryFilter
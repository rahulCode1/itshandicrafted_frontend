import ProductCard from "../../components/product/ProductCard";
import styles from "./ProductGrid.module.css";

const ProductGrid = ({ filteredProducts, handleClearFilter }) => {
 
  
 
  return (
    <div
      className="col-md-9 p-3 p-md-4 pb-5"
      style={{
        background: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 100%)",
        minHeight: "100vh",
      }}
    >
      <section>
        {/* Grid header */}
        {filteredProducts && (
          <div className="d-flex align-items-center justify-content-between gap-3 mb-4">
            {/* Left */}
            <div className="d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-3 text-white flex-shrink-0"
                style={{
                  width: 40,
                  height: 40,
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                }}
              >
                <i className="bi bi-grid-fill" style={{ fontSize: 16 }} />
              </div>
              <div>
                <h5
                  className="fw-bold mb-0"
                  style={{
                    color: "#1e1b4b",
                    letterSpacing: "-0.4px",
                    fontSize: "clamp(1rem, 3vw, 1.3rem)",
                  }}
                >
                  All Products
                </h5>
                <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                  Showing {filteredProducts.length} products
                </span>
              </div>
            </div>

            {/* Filter button — mobile only */}
            <button
              className="btn fw-semibold d-flex align-items-center gap-2 flex-shrink-0 d-md-none"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasResponsive"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontSize: "0.85rem",
                boxShadow: "0 4px 12px rgba(79,70,229,0.3)",
              }}
            >
              <i className="bi bi-funnel-fill" /> Filters
            </button>
          </div>
        )}

        {/* Product grid */}
        {filteredProducts && filteredProducts.length > 0 && (
          <div className={styles.productContainer}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {filteredProducts && filteredProducts.length === 0 && (
          <div
            className="text-center py-5 rounded-4"
            style={{ background: "#fff", border: "1px solid #ede9fe" }}
          >
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
              style={{ width: 80, height: 80, background: "#f5f3ff" }}
            >
              <i
                className="bi bi-inbox"
                style={{ fontSize: 34, color: "#7c3aed" }}
              />
            </div>
            <h5 className="fw-bold mb-2" style={{ color: "#1e1b4b" }}>
              No Products Found
            </h5>
            <p className="text-muted small mb-4">
              Try adjusting your filters or clearing them.
            </p>
            <button
              onClick={handleClearFilter}
              className="btn fw-semibold px-4 py-2 text-white"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                border: "none",
                borderRadius: 10,
                fontSize: "0.875rem",
              }}
            >
              <i className="bi bi-x-circle me-2" />
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductGrid;

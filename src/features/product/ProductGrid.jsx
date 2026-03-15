import ProductCard from "../../components/product/ProductCard"

const ProductGrid = ({filteredProducts, handleClearFilter })=>{

    return <> 
    
        {/* ══════════════════════════════
        PRODUCT GRID
    ══════════════════════════════ */}
          <div
            className="col-md-9 p-3 p-md-4 pb-5 mb-5 mb-md-0"
            style={{
              background: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 100%)",
              minHeight: "100vh",
            }}
          >
            <section>
              {/* Grid header */}
              {filteredProducts && (
              
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-3 text-white flex-shrink-0"
                      style={{
                        width: 40,
                        height: 40,
                        background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                      }}
                    >
                      <i
                        className="bi bi-grid-fill"
                        style={{ fontSize: 16 }}
                      ></i>
                    </div>
                    <div>
                      <h5
                        className="fw-bold mb-0"
                        style={{
                          color: "#1e1b4b",
                          letterSpacing: "-0.4px",
                          fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
                        }}
                      >
                        All Products
                      </h5>
                      <span className="text-muted small">
                        Showing {filteredProducts.length} products
                      </span>
                    </div>
                  </div>
                 
                
              )}

              {/* Products */}
              <div className="row g-3">
                {filteredProducts &&
                  filteredProducts.length !== 0 &&
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="col-12 col-sm-6 col-md-4 col-lg-3"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}

                {/* Empty state */}
                {filteredProducts && filteredProducts.length === 0 && (
                  <div className="col-12">
                    <div
                      className="text-center py-5 rounded-3"
                      style={{
                        background: "#fff",
                        border: "1px solid #ede9fe",
                      }}
                    >
                      <div
                        className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                        style={{ width: 80, height: 80, background: "#f5f3ff" }}
                      >
                        <i
                          className="bi bi-inbox"
                          style={{ fontSize: 34, color: "#7c3aed" }}
                        ></i>
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
                          background:
                            "linear-gradient(135deg, #4f46e5, #7c3aed)",
                          border: "none",
                          borderRadius: 10,
                          fontSize: "0.875rem",
                        }}
                      >
                        <i className="bi bi-x-circle me-2"></i>Clear Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
    </>
}

export default ProductGrid
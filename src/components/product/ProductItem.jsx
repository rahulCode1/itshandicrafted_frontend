import { Link, useNavigate, useParams } from "react-router-dom";

import { toast } from "react-hot-toast";
import ProductImageCarousel from "./ProductImageCarousel";

import COD from "../../imgs/COD.png";
import free from "../../imgs/free.png";
import payment from "../../imgs/payment.png";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { addToCartAsync, getAllCartAsync } from "../../features/cart/cartSlice";
import { addOrRemoveWishlistAsync } from "../../features/wishlist/wishlistSlice";

const ProductItem = ({ productData }) => {
  const [quantity, setQuantity] = useState(1);

  const { cart: productCart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const productId = useParams().id;
  const productInfo = productData?.product;
  const similarProducts = productData?.similarProducts;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const checkProductIsWishlist = (id) => {
    return wishlist.some((product) => product.id === id);
  };

  useEffect(() => {
    if (token) {
      dispatch(getAllCartAsync());
    }
  }, [dispatch, token]);

  const checkProductIsInCart = (id) => {
    return productCart.some((cart) => cart.id === id);
  };

  const handleAddToCart = async (productId) => {
    if (!token) {
      return navigate("/login");
    }
    const toastId = toast.loading("Adding to cart...");
    try {
      const res = await dispatch(
        addToCartAsync({ productId, quantity }),
      ).unwrap();
      toast.success(res.message || "Product added to cart.", { id: toastId });
    } catch (error) {
      toast.error(error || "Failed to add cart.", { id: toastId });
      console.log(error);
    }
  };

  const handleAddToWishList = async (productId, type) => {
    if (!token) {
      return navigate("/login");
    }

    const tostId = toast.loading(
      type === "add" ? "Adding to wishlist..." : "Removing from wishlist...",
    );

    try {
      const res = await dispatch(
        addOrRemoveWishlistAsync({ productId }),
      ).unwrap();

      toast.success(
        res.message ||
          (type === "remove"
            ? "Product removed from wishlist"
            : "Product added to wishlist."),
        {
          id: tostId,
        },
      );
    } catch (error) {
      toast.error(
        error ||
          (type === "add"
            ? "Failed to add product to wishlist."
            : "Failed to remove from wishlist."),
        {
          id: tostId,
        },
      );
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);

  return (
    <>
      <main
        style={{
          background: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 100%)",
          minHeight: "100vh",
          marginBottom: "5em",
        }}
      >
        {/* ════════════════════════════════
      PRODUCT DETAIL SECTION
  ════════════════════════════════ */}
        <section className="container py-4 py-lg-5">
          <div className="row g-4 align-items-start">
            {/* ── LEFT: Image ── */}
            <div className="col-12 col-md-6 col-lg-5">
              <div className="position-md-sticky" style={{ top: 24 }}>
                <div
                  className="card border-0 overflow-hidden"
                  style={{
                    borderRadius: 16,
                    minHeight: 420,
                    height: "calc(100vh - 120px)",
                    maxHeight: 680,
                    boxShadow: "0 8px 32px rgba(79,70,229,0.1)",
                    border: "1px solid #ede9fe",
                  }}
                >
                  <div className="card-body p-0 d-flex flex-column h-100">
                    <ProductImageCarousel images={productInfo.images} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Details ── */}
            <div className="col-12 col-md-6 col-lg-7">
              <div
                className="bg-white p-4 h-100"
                style={{
                  borderRadius: 16,
                  boxShadow: "0 4px 24px rgba(79,70,229,0.07)",
                  border: "1px solid #ede9fe",
                }}
              >
                {/* Product Name */}
                <h1
                  className="fw-bold mb-3"
                  style={{
                    fontSize: "clamp(1.4rem, 3vw, 2rem)",
                    color: "#1e1b4b",
                    letterSpacing: "-0.5px",
                    lineHeight: 1.25,
                  }}
                >
                  {productInfo.name}
                </h1>

                {/* Rating */}
                <div className="d-flex align-items-center flex-wrap gap-2 mb-4">
                  <div className="d-flex align-items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <i
                        key={index}
                        className={`bi bi-star${index < Math.floor(productInfo.rating) ? "-fill" : ""} text-warning`}
                        style={{ fontSize: "1rem" }}
                      ></i>
                    ))}
                  </div>
                  <span className="fw-bold" style={{ color: "#1e1b4b" }}>
                    {productInfo.rating}
                  </span>
                  <span className="text-muted small">
                    ({productInfo.reviews || 0} reviews)
                  </span>
                </div>

                {/* Pricing */}
                <div
                  className="d-flex align-items-center flex-wrap gap-3 mb-4 pb-4"
                  style={{ borderBottom: "1.5px dashed #ddd6fe" }}
                >
                  <h2
                    className="fw-bold mb-0"
                    style={{ color: "#4f46e5", fontSize: "2rem" }}
                  >
                    ₹{productInfo.discountPrice}
                  </h2>
                  <span
                    className="text-muted fs-5 text-decoration-line-through"
                    style={{ opacity: 0.7 }}
                  >
                    ₹{productInfo.price}
                  </span>
                  <span
                    className="badge rounded-pill px-3 py-2 fw-semibold"
                    style={{
                      background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
                      color: "#065f46",
                      fontSize: "0.8rem",
                    }}
                  >
                    <i className="bi bi-tag-fill me-1"></i>
                    {Math.round(
                      ((productInfo.price - productInfo.discountPrice) /
                        productInfo.price) *
                        100,
                    )}
                    % OFF
                  </span>
                </div>

                {/* Short Description + Material */}
                <div className="mb-4">
                  <p
                    className="text-secondary mb-3"
                    style={{ lineHeight: 1.7, fontSize: "0.95rem" }}
                  >
                    {productInfo.shortDescription}
                  </p>
                  <div
                    className="d-flex align-items-center gap-2 px-3 py-2 rounded-2"
                    style={{
                      background: "#f5f3ff",
                      border: "1px solid #ede9fe",
                    }}
                  >
                    <i
                      className="bi bi-box-seam-fill"
                      style={{ color: "#4f46e5" }}
                    ></i>
                    <span className="small">
                      <strong style={{ color: "#1e1b4b" }}>Material:</strong>{" "}
                      <span className="text-muted">
                        {productInfo.materialType}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Quantity + Actions */}
                <div
                  className="p-3 rounded-3 mb-4"
                  style={{ background: "#f5f3ff", border: "1px solid #ede9fe" }}
                >
                  <label
                    className="form-label fw-bold mb-3 small text-uppercase"
                    style={{ color: "#4f46e5", letterSpacing: "0.8px" }}
                  >
                    <i className="bi bi-bag me-1"></i> Select Quantity
                  </label>

                  <div className="d-flex flex-column flex-sm-row gap-3 align-items-sm-center">
                    {/* Stepper */}
                    <div
                      className="input-group flex-shrink-0"
                      style={{ maxWidth: 130 }}
                    >
                      <button
                        disabled={quantity === 1}
                        onClick={() => setQuantity((prevStat) => prevStat - 1)}
                        className="btn fw-bold"
                        type="button"
                        style={{
                          border: "1.5px solid #ddd6fe",
                          background: "#fff",
                          color: "#4f46e5",
                          borderRight: "none",
                        }}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <input
                        type="text"
                        className="form-control text-center fw-bold border-0 shadow-none"
                        value={quantity}
                        readOnly
                        style={{
                          background: "#fff",
                          color: "#1e1b4b",
                          border: "1.5px solid #ddd6fe",
                          borderLeft: "none",
                          borderRight: "none",
                        }}
                      />
                      <button
                        onClick={() => setQuantity((prevStat) => prevStat + 1)}
                        className="btn fw-bold"
                        type="button"
                        style={{
                          border: "1.5px solid #ddd6fe",
                          background: "#fff",
                          color: "#4f46e5",
                          borderLeft: "none",
                        }}
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>

                    {/* Cart + Wishlist */}
                    <div className="d-flex gap-2 flex-grow-1">
                      {checkProductIsInCart(productInfo.id) ? (
                        <Link
                          to="/cart"
                          className="btn flex-grow-1 fw-semibold py-2 text-white"
                          style={{
                            background:
                              "linear-gradient(135deg, #1e1b4b, #4f46e5)",
                            border: "none",
                            borderRadius: 10,
                          }}
                        >
                          <i className="bi bi-cart-check-fill me-2"></i>Go to
                          Cart
                        </Link>
                      ) : (
                        <button
                          onClick={() =>
                            handleAddToCart(productInfo.id, quantity)
                          }
                          className="btn flex-grow-1 fw-semibold py-2 text-white"
                          style={{
                            background:
                              "linear-gradient(135deg, #1e1b4b, #4f46e5)",
                            border: "none",
                            borderRadius: 10,
                          }}
                        >
                          <i className="bi bi-cart-plus-fill me-2"></i>Add to
                          Cart
                        </button>
                      )}
                      (
                      <button
                        onClick={() =>
                          handleAddToWishList(
                            productInfo.id,
                            checkProductIsWishlist(productInfo.id)
                              ? "remove"
                              : "add",
                          )
                        }
                        className="btn fw-semibold py-2 px-3"
                        style={{
                          border: "1.5px solid #ddd6fe",
                          color: "#7c3aed",
                          borderRadius: 10,
                          background: "#fff",
                          minWidth: 48,
                        }}
                      >
                        <i className="bi bi-heart-fill"></i>
                      </button>
                      )
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="row g-2 mb-4">
                  <div className="col-4">
                    <div
                      className="text-center py-3 rounded-3 h-100"
                      style={{
                        background: "#f5f3ff",
                        border: "1px solid #ede9fe",
                      }}
                    >
                      <img
                        src={COD}
                        className="img-fluid mb-2"
                        style={{ width: 36, height: 36, objectFit: "contain" }}
                        alt="COD"
                      />
                      <p
                        className="mb-0 fw-semibold"
                        style={{
                          fontSize: "0.7rem",
                          color: "#4f46e5",
                          lineHeight: 1.3,
                        }}
                      >
                        Cash on
                        <br />
                        Delivery
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div
                      className="text-center py-3 rounded-3 h-100"
                      style={{
                        background: "#f5f3ff",
                        border: "1px solid #ede9fe",
                      }}
                    >
                      <img
                        src={free}
                        className="img-fluid mb-2"
                        style={{ width: 36, height: 36, objectFit: "contain" }}
                        alt="Free Delivery"
                      />
                      <p
                        className="mb-0 fw-semibold"
                        style={{
                          fontSize: "0.7rem",
                          color: "#4f46e5",
                          lineHeight: 1.3,
                        }}
                      >
                        Free
                        <br />
                        Delivery
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div
                      className="text-center py-3 rounded-3 h-100"
                      style={{
                        background: "#f5f3ff",
                        border: "1px solid #ede9fe",
                      }}
                    >
                      <img
                        src={payment}
                        className="img-fluid mb-2"
                        style={{ width: 36, height: 36, objectFit: "contain" }}
                        alt="Secure Payment"
                      />
                      <p
                        className="mb-0 fw-semibold"
                        style={{
                          fontSize: "0.7rem",
                          color: "#4f46e5",
                          lineHeight: 1.3,
                        }}
                      >
                        Secure
                        <br />
                        Payment
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div
                  className="p-4 rounded-3"
                  style={{ background: "#f5f3ff", border: "1px solid #ede9fe" }}
                >
                  <h6
                    className="fw-bold mb-2 d-flex align-items-center gap-2"
                    style={{ color: "#4f46e5" }}
                  >
                    <i className="bi bi-file-text-fill"></i> Description
                  </h6>
                  <p
                    className="text-secondary mb-0 small"
                    style={{ lineHeight: 1.8 }}
                  >
                    {productInfo.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
      SIMILAR PRODUCTS SECTION
  ════════════════════════════════ */}
        <section
          className="py-4 py-lg-5"
          style={{ background: "#fff", borderTop: "1px solid #ede9fe" }}
        >
          <div className="container">
            {/* Section Header */}
            <div
              className="d-flex justify-content-between align-items-center mb-4 pb-3"
              style={{ borderBottom: "1.5px dashed #ddd6fe" }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3 text-white flex-shrink-0"
                  style={{
                    width: 40,
                    height: 40,
                    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  }}
                >
                  <i className="bi bi-grid-fill" style={{ fontSize: 16 }}></i>
                </div>
                <h2
                  className="fw-bold mb-0"
                  style={{
                    color: "#1e1b4b",
                    fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
                  }}
                >
                  Similar Products
                </h2>
              </div>
              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  background: "#f5f3ff",
                  color: "#4f46e5",
                  border: "1px solid #ddd6fe",
                  fontSize: "0.75rem",
                }}
              >
                {similarProducts?.length || 0} items
              </span>
            </div>

            {/* Mobile: horizontal scroll */}
            <div className="d-lg-none">
              <div
                className="row flex-nowrap overflow-auto pb-3 gx-3"
                style={{
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {similarProducts && similarProducts.length !== 0 ? (
                  similarProducts.map((product) => (
                    <div key={product.id} className="col-9 col-sm-6">
                      <ProductCard product={product} />
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <div
                      className="text-center py-5 rounded-3"
                      style={{
                        background: "#f5f3ff",
                        border: "1px solid #ede9fe",
                      }}
                    >
                      <i
                        className="bi bi-inbox fs-2 d-block mb-3"
                        style={{ color: "#7c3aed" }}
                      ></i>
                      <h6 className="fw-semibold" style={{ color: "#1e1b4b" }}>
                        No similar products found
                      </h6>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop: grid */}
            <div className="row g-3 g-lg-4 d-none d-lg-flex">
              {similarProducts && similarProducts.length !== 0 ? (
                similarProducts.map((product) => (
                  <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <div
                    className="text-center py-5 rounded-3"
                    style={{
                      background: "#f5f3ff",
                      border: "1px solid #ede9fe",
                    }}
                  >
                    <i
                      className="bi bi-inbox fs-1 d-block mb-3"
                      style={{ color: "#7c3aed" }}
                    ></i>
                    <h5 className="fw-semibold" style={{ color: "#1e1b4b" }}>
                      No similar products found
                    </h5>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductItem;

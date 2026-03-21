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
import { privateApi } from "../../utils/axios";

const ProductItem = ({ productData }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { cart: productCart, addTocartLoading } = useSelector(
    (state) => state.cart,
  );
  const { wishlist, toggleWishlistLoading } = useSelector(
    (state) => state.wishlist,
  );
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

  const handleAddToBuyNow = async () => {
    if (!token) {
      return navigate("/login");
    }

    const toastId = toast.loading("Going to checkout...");

    try {
      setIsLoading(true);
      await privateApi.post(`/order/addItemToBuyNow`, {
        product: productId,
        quantity,
      });

      toast.success("Added to checkout.", { id: toastId });
      return navigate(`/buyNow`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add checkout.", {
        id: toastId,
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);

  return (
    <>
      <button
        onClick={handleAddToBuyNow}
        className="btn btn-warning fw-semibold px-4 py-2 rounded-pill d-none"
      >
        <i className="bi bi-lightning-fill me-1"></i>Buy Now
      </button>

      <main className="bg-light min-vh-100 pb-5">
        {/* ════════════════════════════════
            PRODUCT DETAIL SECTION
        ════════════════════════════════ */}
        <section className="container py-4 py-lg-5">
          <div className="row g-4 align-items-start">
            {/* ── LEFT: Image ── */}
            <div className="col-12 col-md-6 col-lg-5">
              <div className="position-md-sticky" style={{ top: 24 }}>
                <div
                  className="card border-0 shadow overflow-hidden rounded-4"
                  style={{
                    minHeight: 420,
                    height: "calc(100vh - 120px)",
                    maxHeight: 680,
                  }}
                >
                  <div className="card-body p-0 d-flex flex-column h-100">
                    <ProductImageCarousel images={productInfo?.images || []} />
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Details ── */}
            <div className="col-12 col-md-6 col-lg-7">
              <div className="card border-0 shadow-sm rounded-4 p-3 p-md-4 h-100">
                {/* Category pill */}
                <div className="mb-2">
                  <span
                    className="badge bg-primary-subtle text-primary rounded-pill px-3 py-1"
                    style={{ fontSize: "0.72rem", letterSpacing: "0.05em" }}
                  >
                    <i className="bi bi-tag me-1"></i>
                    {productInfo.category || "Handicrafts"}
                  </span>
                </div>

                {/* Product Name */}
                <h1
                  className="fw-bold mb-3 text-dark lh-sm"
                  style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
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
                  <span className="fw-bold text-dark">
                    {productInfo.rating}
                  </span>
                  <span className="text-muted small">
                    ({productInfo.reviews || 0} reviews)
                  </span>
                </div>

                {/* Pricing */}
                <div className="d-flex align-items-center flex-wrap gap-3 mb-4 pb-4 border-bottom border-dashed">
                  <h2
                    className="fw-bold mb-0 text-primary"
                    style={{ fontSize: "2rem" }}
                  >
                    ₹{productInfo.discountPrice}
                  </h2>
                  <span className="text-muted fs-5 text-decoration-line-through">
                    ₹{productInfo.price}
                  </span>
                  <span
                    className="badge bg-success-subtle text-success rounded-pill px-3 py-2 fw-semibold"
                    style={{ fontSize: "0.8rem" }}
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
                  <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 bg-primary-subtle border border-primary-subtle">
                    <i className="bi bi-box-seam-fill text-primary"></i>
                    <span className="small">
                      <strong className="text-dark">Material:</strong>{" "}
                      <span className="text-muted">
                        {productInfo.materialType}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Quantity + Actions */}
                <div className="bg-primary-subtle border border-primary-subtle p-3 rounded-3 mb-4">
                  <label
                    className="form-label fw-bold mb-3 small text-uppercase text-primary"
                    style={{ letterSpacing: "0.8px" }}
                  >
                    <i className="bi bi-bag me-1"></i>Select Quantity
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
                        className="btn btn-outline-primary fw-bold"
                        type="button"
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <input
                        type="text"
                        className="form-control text-center fw-bold border-primary shadow-none"
                        value={quantity}
                        readOnly
                      />
                      <button
                        onClick={() => setQuantity((prevStat) => prevStat + 1)}
                        className="btn btn-outline-primary fw-bold"
                        type="button"
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>

                    {/* Cart + Wishlist */}
                    <div className="d-flex gap-2 flex-grow-1">
                      {checkProductIsInCart(productInfo.id) ? (
                        <Link
                          to="/cart"
                          className="btn btn-dark flex-grow-1 fw-semibold py-2 rounded-3"
                        >
                          <i className="bi bi-cart-check-fill me-2"></i>Go to
                          Cart
                        </Link>
                      ) : (
                        <button
                          disabled={addTocartLoading === "loading"}
                          onClick={() =>
                            handleAddToCart(productInfo.id, quantity)
                          }
                          className="btn btn-dark flex-grow-1 fw-semibold py-2 rounded-3"
                        >
                          <i className="bi bi-cart-plus-fill me-2"></i>
                          {addTocartLoading === "loading"
                            ? "Adding to cart"
                            : "Add to Cart"}
                          {addTocartLoading === "loading" && (
                            <span className="spinner-border spinner-border-sm ms-2"></span>
                          )}
                        </button>
                      )}
                      (
                      <button
                        disabled={toggleWishlistLoading === "loading"}
                        onClick={() =>
                          handleAddToWishList(
                            productInfo.id,
                            checkProductIsWishlist(productInfo.id)
                              ? "remove"
                              : "add",
                          )
                        }
                        className="btn border-danger fw-semibold py-2 px-3 rounded-3"
                        style={{ minWidth: 48 }}
                      >
                        {toggleWishlistLoading !== "loading" ? (
                          checkProductIsWishlist(productInfo.id) ? (
                            <i
                              className="bi bi-heart-fill"
                              style={{ color: "#ef4444", fontSize: 15 }}
                            ></i>
                          ) : (
                            <i
                              className="bi bi-heart"
                              style={{ color: "#7c3aed", fontSize: 15 }}
                            ></i>
                          )
                        ) : (
                          ""
                        )}
                        {toggleWishlistLoading === "loading" && (
                          <span className="spinner-border spinner-border-sm ms-2"></span>
                        )}
                      </button>
                      )
                    </div>
                  </div>
                </div>

                {/* Buy Now Button */}
                <div className="d-grid mb-4">
                  <button
                    disabled={isLoading}
                    onClick={handleAddToBuyNow}
                    className="btn btn-warning fw-bold py-2 rounded-3 d-flex align-items-center justify-content-center gap-2"
                  >
                    <i className="bi bi-lightning-charge-fill"></i>

                    {isLoading ? "Buying..." : "Buy Now"}
                    {isLoading && (
                      <span className="spinner-border spinner-border-sm ms-2"></span>
                    )}
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="row g-2 mb-4">
                  {[
                    { src: COD, alt: "COD", label: "Cash on\nDelivery" },
                    {
                      src: free,
                      alt: "Free Delivery",
                      label: "Free\nDelivery",
                    },
                    {
                      src: payment,
                      alt: "Secure Payment",
                      label: "Secure\nPayment",
                    },
                  ].map(({ src, alt, label }) => (
                    <div className="col-4" key={alt}>
                      <div className="text-center py-3 rounded-3 h-100 bg-primary-subtle border border-primary-subtle">
                        <img
                          src={src}
                          className="img-fluid mb-2"
                          style={{
                            width: 36,
                            height: 36,
                            objectFit: "contain",
                          }}
                          alt={alt}
                        />
                        <p
                          className="mb-0 fw-semibold text-primary lh-sm"
                          style={{ fontSize: "0.7rem" }}
                        >
                          {label.split("\n").map((line, i) => (
                            <span key={i}>
                              {line}
                              {i === 0 && <br />}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div className="bg-primary-subtle border border-primary-subtle p-4 rounded-3">
                  <h6 className="fw-bold mb-2 d-flex align-items-center gap-2 text-primary">
                    <i className="bi bi-file-text-fill"></i>Description
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
        <section className="py-4 py-lg-5 bg-white border-top">
          <div className="container">
            {/* Section Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
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
                  className="fw-bold mb-0 text-dark"
                  style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)" }}
                >
                  Similar Products
                </h2>
              </div>
              <span
                className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2"
                style={{ fontSize: "0.75rem" }}
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
                    <div className="text-center py-5 rounded-3 bg-primary-subtle border border-primary-subtle">
                      <i className="bi bi-inbox fs-2 d-block mb-3 text-primary"></i>
                      <h6 className="fw-semibold text-dark">
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
                  <div className="text-center py-5 rounded-3 bg-primary-subtle border border-primary-subtle">
                    <i className="bi bi-inbox fs-1 d-block mb-3 text-primary"></i>
                    <h5 className="fw-semibold text-dark">
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

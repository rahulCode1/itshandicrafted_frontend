import { Link } from "react-router-dom";

import { toast } from "react-hot-toast";
import Loading from "../../components/Loading";
import {
  totalPrice,
  totalQuantity,
  totalDiscount,
} from "../../functions/reUseFunctions";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseCartQuantityAsync,
  decreaseCartQuantityAsync,
  removeFromCartAsync,
  moveToWishlistAsync,
  clearError,
} from "./cartSlice";
import { addToWishlist } from "../wishlist/wishlistSlice";
import ErrorModal from "../../components/ErrorModal";

const Cart = () => {
  const dispatch = useDispatch();
  const {
    cart: productCart,
    increaseQuantityLoading,
    getCartsLoading,
    moveToWishlistLoading,
    error,
  } = useSelector((state) => state.cart);

  const { wishlist } = useSelector((state) => state.wishlist);

  const isExistOnWishlist = (productId) => {
    return wishlist.some((wish) => wish.id === productId);
  };

  const handleIncreaseQuantity = async (productId) => {
    const toastId = toast.loading("Quantity increasing...");
    try {
      const response = await dispatch(
        increaseCartQuantityAsync(productId),
      ).unwrap();
      toast.success(response.message || "Quantity increased successfully.", {
        id: toastId,
      });
    } catch (error) {
      console.log(error);
      toast.error(error || "Failed to  increase quantity.", {
        id: toastId,
      });
    }
  };

  const handleDecreaseQuantity = async (productId) => {
    const toastId = toast.loading("Quantity decreasing...");
    try {
      const response = await dispatch(
        decreaseCartQuantityAsync(productId),
      ).unwrap();
      toast.success(response.message || "Quantity decreased successfully.", {
        id: toastId,
      });
    } catch (error) {
      console.log(error);
      toast.error(error || "Failed to  decrease quantity.", {
        id: toastId,
      });
    }
  };

  const handleRemoveFromCart = async (productId) => {
    const tostId = toast.loading("Remove from cart...");
    try {
      const response = await dispatch(removeFromCartAsync(productId)).unwrap();
      toast.success(response.message || "Successfully removed from cart.", {
        id: tostId,
      });
    } catch (error) {
      toast.error(error || "Failed to remove from cart.");
      console.log(error);
    }
  };

  const handleCartToWishList = async (product) => {
    const toastId = toast.loading("Moving to wishlist...");
    const existingProduct = wishlist.findIndex(
      (wish) => wish.id === product.id,
    );

    if (existingProduct !== -1) {
      return toast("Product already exist in wishlist", {
        id: toastId,
        icon: "ℹ️",
      });
    }
    try {
      const res = await dispatch(
        moveToWishlistAsync({ productId: product.id }),
      ).unwrap();
      dispatch(addToWishlist(product));

      toast.success(res.message || "Successfully moved to wishlist", {
        id: toastId,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to  move to wishlist", { id: toastId });
    }
  };


  
  return (
    <>
      {error && (
        <ErrorModal message={error} onClose={() => dispatch(clearError())} />
      )}
      {getCartsLoading === "loading" ? (
        <Loading />
      ) : (
        <main
          style={{
            background: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 100%)",
            minHeight: "100vh",
            marginBottom: "5em",
          }}
        >
          <div className="container py-4 py-md-5">
            {productCart && productCart.length > 0 ? (
              <>
                {/* ── Page Header ── */}
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-3 text-white flex-shrink-0"
                    style={{
                      width: 48,
                      height: 48,
                      background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                    }}
                  >
                    <i className="bi bi-cart3 fs-5"></i>
                  </div>
                  <div>
                    <h4
                      className="fw-bold mb-0"
                      style={{ color: "#1e1b4b", letterSpacing: "-0.4px" }}
                    >
                      My Cart
                    </h4>
                    <span className="text-muted small">
                      {productCart.length}{" "}
                      {productCart.length === 1 ? "item" : "items"} in your cart
                    </span>
                  </div>
                </div>

                {/* ── Cart Items ── */}
                <div className="d-flex flex-column gap-3 mb-4">
                  {productCart.map((product) => (
                    <div
                      key={product.id}
                      className="card border-0"
                      style={{
                        borderRadius: 14,
                        boxShadow: "0 2px 12px rgba(79,70,229,0.07)",
                        border: "1px solid #ede9fe",
                        overflow: "hidden",
                      }}
                    >
                      <div className="row g-0">
                        {/* Product Image */}
                        <div className="col-3 col-md-2">
                          <Link to={`/products/${product.id}`}>
                            <img
                              src={product?.images[0]?.url}
                              className="w-100 h-100"
                              style={{
                                objectFit: "cover",
                                minHeight: 130,
                                display: "block",
                              }}
                              alt={product.name}
                            />
                          </Link>
                        </div>
                        {/* Product Info */}
                        <div className="col-9 col-md-10">
                          <div className="p-3 p-md-4 h-100 d-flex flex-column justify-content-between">
                            {/* Top: name + savings badge */}
                            <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
                              <h6
                                className="fw-bold mb-0"
                                style={{
                                  color: "#1e1b4b",
                                  fontSize: "clamp(0.85rem, 2vw, 1rem)",
                                  lineHeight: 1.4,
                                }}
                              >
                                {product.name}
                              </h6>
                              <span
                                className="badge rounded-pill flex-shrink-0"
                                style={{
                                  background: "#d1fae5",
                                  color: "#065f46",
                                  fontSize: "0.65rem",
                                  fontWeight: 600,
                                }}
                              >
                                <i className="bi bi-tag-fill me-1"></i>
                                Save ₹{product.price - product.discountPrice}
                              </span>
                            </div>

                            {/* Price */}
                            <div className="d-flex align-items-center gap-2 mb-3">
                              <span
                                className="fw-bold"
                                style={{ color: "#4f46e5", fontSize: "1.1rem" }}
                              >
                                ₹{product.discountPrice}
                              </span>
                              <span className="text-muted small text-decoration-line-through">
                                ₹{product.price}
                              </span>
                            </div>

                            {/* Bottom: stepper + actions */}
                            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                              <div
                                className="d-flex align-items-center rounded-pill"
                                style={{
                                  background: "#f5f3ff",
                                  border: "1.5px solid #ddd6fe",
                                  padding: "3px 6px",
                                  gap: 4,
                                }}
                              >
                                <button
                                  onClick={() =>
                                    handleDecreaseQuantity(product.id)
                                  }
                                  className="btn d-flex align-items-center justify-content-center rounded-circle"
                                  style={{
                                    width: 28,
                                    height: 28,
                                    padding: 0,
                                    background: "#fff",
                                    border: "1px solid #ddd6fe",
                                    color: "#4f46e5",
                                    fontWeight: 700,
                                    fontSize: 15,
                                    lineHeight: 1,
                                  }}
                                >
                                  −
                                </button>
                                <span
                                  className="fw-bold"
                                  style={{
                                    minWidth: 26,
                                    textAlign: "center",
                                    color: "#1e1b4b",
                                    fontSize: "0.9rem",
                                  }}
                                >
                                  {product.quantity}
                                </span>
                                <button
                                  disabled={
                                    increaseQuantityLoading === "loading"
                                  }
                                  onClick={() =>
                                    handleIncreaseQuantity(product.id)
                                  }
                                  className="btn d-flex align-items-center justify-content-center rounded-circle"
                                  style={{
                                    width: 28,
                                    height: 28,
                                    padding: 0,
                                    background: "#fff",
                                    border: "1px solid #ddd6fe",
                                    color: "#4f46e5",
                                    fontWeight: 700,
                                    fontSize: 15,
                                    lineHeight: 1,
                                  }}
                                >
                                  +
                                </button>
                              </div>

                              <div className="d-flex gap-2">
                                <button
                                  onClick={() =>
                                    handleRemoveFromCart(product.id)
                                  }
                                  className="btn btn-sm fw-semibold d-flex align-items-center gap-1"
                                  style={{
                                    border: "1.5px solid #ef4444",
                                    color: "#ef4444",
                                    borderRadius: 8,
                                    background: "transparent",
                                    fontSize: "0.78rem",
                                    padding: "5px 10px",
                                  }}
                                >
                                  <i
                                    className="bi bi-trash3-fill"
                                    style={{ fontSize: 11 }}
                                  ></i>
                                  <span className="d-none d-sm-inline">
                                    Remove
                                  </span>
                                </button>

                                {isExistOnWishlist(product.id) ? (
                                  <Link
                                    to="/wishlist"
                                    className="btn btn-sm fw-semibold d-flex align-items-center gap-1"
                                    style={{
                                      background:
                                        "linear-gradient(135deg, #4f46e5, #7c3aed)",
                                      color: "#fff",
                                      border: "none",
                                      borderRadius: 8,
                                      fontSize: "0.78rem",
                                      padding: "5px 10px",
                                    }}
                                  >
                                    <i
                                      className="bi bi-heart-fill"
                                      style={{ fontSize: 11 }}
                                    ></i>
                                    <span className="d-none d-sm-inline">
                                      Wishlisted
                                    </span>
                                  </Link>
                                ) : (
                                  <button
                                    disabled={
                                      moveToWishlistLoading === "loading"
                                    }
                                    onClick={() =>
                                      handleCartToWishList(product)
                                    }
                                    className="btn btn-sm fw-semibold d-flex align-items-center gap-1"
                                    style={{
                                      border: "1.5px solid #7c3aed",
                                      color: "#7c3aed",
                                      borderRadius: 8,
                                      background: "transparent",
                                      fontSize: "0.78rem",
                                      padding: "5px 10px",
                                    }}
                                  >
                                    <i
                                      className="bi bi-heart"
                                      style={{ fontSize: 11 }}
                                    ></i>
                                    <span className="d-none d-sm-inline">
                                      Wishlist
                                    </span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Order Summary (below products) ── */}
                <div
                  className="card border-0"
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 8px 32px rgba(79,70,229,0.1)",
                    border: "1px solid #ede9fe",
                  }}
                >
                  {/* Header */}
                  <div
                    className="px-4 py-3 d-flex align-items-center gap-2"
                    style={{
                      background:
                        "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    }}
                  >
                    <i className="bi bi-receipt-cutoff text-white fs-6"></i>
                    <h6 className="fw-bold text-white mb-0">Order Summary</h6>
                  </div>

                  <div className="p-4" style={{ background: "#fff" }}>
                    {/* 3 stat boxes */}
                    <div className="row g-3 mb-4">
                      <div className="col-4">
                        <div
                          className="p-3 rounded-3 text-center"
                          style={{
                            background: "#f5f3ff",
                            border: "1px solid #ede9fe",
                          }}
                        >
                          <i
                            className="bi bi-stack d-block mb-1"
                            style={{ color: "#4f46e5", fontSize: 20 }}
                          ></i>
                          <small
                            className="text-muted d-block mb-1"
                            style={{
                              fontSize: "0.65rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.4px",
                            }}
                          >
                            Items
                          </small>
                          <span
                            className="fw-bold d-block"
                            style={{ color: "#1e1b4b", fontSize: "1.05rem" }}
                          >
                            {totalQuantity(productCart)}
                          </span>
                        </div>
                      </div>

                      <div className="col-4">
                        <div
                          className="p-3 rounded-3 text-center"
                          style={{
                            background: "#f0fdf4",
                            border: "1px solid #bbf7d0",
                          }}
                        >
                          <i
                            className="bi bi-tag-fill d-block mb-1"
                            style={{ color: "#16a34a", fontSize: 20 }}
                          ></i>
                          <small
                            className="text-muted d-block mb-1"
                            style={{
                              fontSize: "0.65rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.4px",
                            }}
                          >
                            You Save
                          </small>
                          <span
                            className="fw-bold d-block"
                            style={{ color: "#16a34a", fontSize: "1.05rem" }}
                          >
                            ₹{totalDiscount(productCart)}
                          </span>
                        </div>
                      </div>

                      <div className="col-4">
                        <div
                          className="p-3 rounded-3 text-center"
                          style={{
                            background:
                              "linear-gradient(135deg, #ede9fe, #ddd6fe)",
                            border: "1px solid #c4b5fd",
                          }}
                        >
                          <i
                            className="bi bi-wallet2 d-block mb-1"
                            style={{ color: "#4f46e5", fontSize: 20 }}
                          ></i>
                          <small
                            className="text-muted d-block mb-1"
                            style={{
                              fontSize: "0.65rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.4px",
                            }}
                          >
                            Total
                          </small>
                          <span
                            className="fw-bold d-block"
                            style={{ color: "#4f46e5", fontSize: "1.05rem" }}
                          >
                            ₹{totalPrice(productCart)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      to="/checkout"
                      className="btn w-100 fw-bold py-3 text-white d-flex align-items-center justify-content-center gap-2"
                      style={{
                        background: "linear-gradient(135deg, #1e1b4b, #4f46e5)",
                        border: "none",
                        borderRadius: 12,
                        fontSize: "1rem",
                        letterSpacing: "0.3px",
                      }}
                    >
                      <i className="bi bi-bag-check-fill fs-5"></i>
                      Proceed to Checkout
                    </Link>

                    <p
                      className="text-center text-muted mt-3 mb-0"
                      style={{ fontSize: "0.72rem" }}
                    >
                      <i
                        className="bi bi-shield-lock-fill me-1"
                        style={{ color: "#4f46e5" }}
                      ></i>
                      Secure &amp; encrypted checkout
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="row justify-content-center">
                <div className="col-12 col-md-7 col-lg-5">
                  <div
                    className="card border-0 text-center"
                    style={{
                      borderRadius: 20,
                      boxShadow: "0 4px 20px rgba(79,70,229,0.08)",
                      border: "1px solid #ede9fe",
                    }}
                  >
                    <div className="card-body py-5 px-4">
                      <div
                        className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                        style={{ width: 88, height: 88, background: "#f5f3ff" }}
                      >
                        <i
                          className="bi bi-cart-x"
                          style={{ fontSize: 36, color: "#7c3aed" }}
                        ></i>
                      </div>
                      <h4 className="fw-bold mb-2" style={{ color: "#1e1b4b" }}>
                        Your Cart is Empty
                      </h4>
                      <p className="text-muted mb-4 small">
                        Looks like you haven't added anything yet.
                      </p>
                      <Link
                        to="/products"
                        className="btn fw-semibold px-4 py-2 text-white"
                        style={{
                          background:
                            "linear-gradient(135deg, #4f46e5, #7c3aed)",
                          border: "none",
                          borderRadius: 10,
                        }}
                      >
                        <i className="bi bi-shop me-2"></i>Browse Products
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default Cart;

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../../features/cart/cartSlice";
import { toast } from "react-hot-toast";
import { addOrRemoveWishlistAsync } from "../../features/wishlist/wishlistSlice";
import { useState } from "react";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const { cart: productCart, addTocartLoading } = useSelector(
    (state) => state.cart,
  );
  const { wishlist, toggleWishlistLoading } = useSelector(
    (state) => state.wishlist,
  );
  const [productId, setProductId] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isWishlisted = (id) => wishlist.some((p) => p.id === id);
  const isInCart = (id) => productCart.some((c) => c.id === id);

  const handleAddToCart = async (productId, quantity) => {
    if (!token) return navigate("/login");
    const toastId = toast.loading("Adding to cart...");
    try {
      setProductId(productId);
      const res = await dispatch(
        addToCartAsync({ productId, quantity }),
      ).unwrap();
      setProductId("");
      toast.success(res.message || "Product added to cart.", { id: toastId });
    } catch (error) {
      toast.error(error || "Failed to add product to cart.", { id: toastId });
    }
  };

  const handleAddToWishList = async (productId, type) => {
    if (!token) return navigate("/login");
    const toastId = toast.loading(
      type === "add" ? "Adding to wishlist..." : "Removing from wishlist...",
    );
    try {
      setProductId(productId);
      const res = await dispatch(
        addOrRemoveWishlistAsync({ productId }),
      ).unwrap();
      toast.success(
        res.message ||
          (type === "remove" ? "Removed from wishlist" : "Added to wishlist."),
        { id: toastId },
      );
      setProductId("");
    } catch (error) {
      toast.error(
        error ||
          (type === "add"
            ? "Failed to add to wishlist."
            : "Failed to remove from wishlist."),
        { id: toastId },
      );
    }
  };

  const isCartLoading =
    product.id === productId && addTocartLoading === "loading";
  const isWishlistLoading =
    toggleWishlistLoading === "loading" && product.id === productId;

  return (
    <div className={styles.cardContainer}>
      {/* ── Wishlist Button ── */}
      <button
        disabled={isWishlistLoading}
        onClick={() =>
          handleAddToWishList(
            product.id,
            isWishlisted(product.id) ? "remove" : "add",
          )
        }
        className="btn position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center rounded-circle"
        style={{
          width: 34,
          height: 34,
          zIndex: 10,
          padding: 0,
          background: "rgba(255,255,255,0.95)",
          border: "1.5px solid #ede9fe",
          boxShadow: "0 2px 8px rgba(79,70,229,0.12)",
        }}
      >
        {!isWishlistLoading && (
          <i
            className={`bi bi-heart${isWishlisted(product.id) ? "-fill" : ""}`}
            style={{
              color: isWishlisted(product.id) ? "#ef4444" : "#7c3aed",
              fontSize: 14,
            }}
          />
        )}
        {isWishlistLoading && (
          <span className="spinner-border spinner-border-sm"></span>
        )}
      </button>

      {/* ── Product Image ── */}
      <Link
        to={`/products/${product.id}`}
        className="text-decoration-none d-block overflow-hidden"
      >
        <img
          src={product.images[0].url}
          alt={product.name}
          className={styles.imgStyle}
        />
      </Link>

      {/* ── Card Body ── */}
      <div
        className="d-flex flex-column p-3"
        style={{ background: "#fff", flexGrow: 1 }}
      >
        {/* Name */}
        <Link to={`/products/${product.id}`} className="text-decoration-none">
          <h6
            className="fw-semibold mb-2"
            style={{
              fontSize: "0.88rem",
              lineHeight: 1.4,
              height: "2.5em",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              color: "#1e1b4b",
            }}
          >
            {product.name}
          </h6>
        </Link>

        {/* Rating */}
        <div className="d-flex align-items-center gap-1 mb-2">
          {[...Array(5)].map((_, index) => (
            <i
              key={index}
              className={`bi bi-star${index < Math.floor(product.rating) ? "-fill" : ""}`}
              style={{
                fontSize: 11,
                color:
                  index < Math.floor(product.rating) ? "#f59e0b" : "#d1d5db",
              }}
            />
          ))}
          <span
            className="ms-1 fw-semibold"
            style={{ fontSize: "0.72rem", color: "#6b7280" }}
          >
            {product.rating.toFixed(1)}
          </span>
        </div>

        {/* Price */}
        <div className="mb-3">
          <span
            className="fw-bold"
            style={{ fontSize: "1.05rem", color: "#4f46e5" }}
          >
            ₹{product.discountPrice.toLocaleString()}
          </span>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          {isInCart(product.id) ? (
            <Link
              to="/cart"
              className="btn w-100 fw-semibold d-flex align-items-center justify-content-center gap-2"
              style={{
                border: "1.5px solid #4f46e5",
                color: "#4f46e5",
                borderRadius: 10,
                background: "#f5f3ff",
                fontSize: "0.8rem",
              }}
            >
              <i className="bi bi-cart-check-fill" style={{ fontSize: 13 }} />
              View in Cart
            </Link>
          ) : (
            <button
              disabled={isCartLoading}
              onClick={() => handleAddToCart(product.id, 1)}
              className="btn w-100 fw-semibold d-flex align-items-center justify-content-center gap-2 text-white"
              style={{
                background: "linear-gradient(135deg, #1e1b4b, #4f46e5)",
                border: "none",
                borderRadius: 10,
                fontSize: "0.8rem",
              }}
            >
              <i className="bi bi-cart-plus-fill" style={{ fontSize: 13 }} />
              {isCartLoading ? "Adding…" : "Add to Cart"}
              {isCartLoading && (
                <span className="spinner-border spinner-border-sm ms-1" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

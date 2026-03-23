import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../../features/cart/cartSlice";
import { toast } from "react-hot-toast";
import { addOrRemoveWishlistAsync } from "../../features/wishlist/wishlistSlice";
import { useState } from "react";
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
  const checkProductIsWishlist = (id) => {
    return wishlist.some((product) => product.id === id);
  };

  const checkProductIsInCart = (id) => {
    return productCart.some((cart) => cart.id === id);
  };

  const handleAddToCart = async (productId, quantity) => {
    if (!token) {
      return navigate("/login");
    }

    const tostId = toast.loading("Adding to cart...");

    try {
      setProductId(productId);
      const res = await dispatch(
        addToCartAsync({ productId, quantity }),
      ).unwrap();

      setProductId("");
      toast.success(res.message || "Product added to cart.", { id: tostId });
    } catch (error) {
      toast.error(error || "Failed to add product to cart.", { id: tostId });
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
      setProductId(productId);
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
      setProductId("");
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

  return (
    <div
      className="card border-0 h-100 position-relative overflow-hidden"
      style={{
        borderRadius: 16,
        boxShadow:
          "0 4px 6px -1px rgba(79,70,229,0.07), 0 2px 4px -1px rgba(0,0,0,0.05)",
        border: "1px solid #ede9fe",
      }}
    >
      {/* ── Wishlist Button ── */}
      <button
        disabled={
          toggleWishlistLoading === "loading" && product.id === productId
        }
        onClick={() =>
          handleAddToWishList(
            product.id,
            checkProductIsWishlist(product.id) ? "remove" : "add",
          )
        }
        className="btn position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center rounded-circle"
        style={{
          width: 36,
          height: 36,
          zIndex: 10,
          padding: 0,
          background: "rgba(255,255,255,0.92)",
          border: "1.5px solid #ede9fe",
          boxShadow: "0 2px 8px rgba(79,70,229,0.12)",
        }}
      >
        {checkProductIsWishlist(product.id) ? (
          <i
            className="bi bi-heart-fill"
            style={{ color: "#ef4444", fontSize: 15 }}
          ></i>
        ) : (
          <i
            className="bi bi-heart"
            style={{ color: "#7c3aed", fontSize: 15 }}
          ></i>
        )}
      </button>

      {/* ── Product Image ── */}
      <Link
        to={`/products/${product.id}`}
        className="text-decoration-none d-block"
        style={{ overflow: "hidden" }}
      >
        <img
          src={product.images[0].url}
          alt={product.name}
          className="card-img-top"
          style={{
            height: 400,
            width: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Link>

      {/* ── Card Body ── */}
      <div
        className="card-body d-flex flex-column p-3"
        style={{ background: "#fff" }}
      >
        {/* Name */}
        <Link to={`/products/${product.id}`} className="text-decoration-none">
          <h6
            className="card-title fw-semibold mb-2"
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.4,
              height: "2.8em",
              overflow: "hidden",
              textOverflow: "ellipsis",
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
                fontSize: 12,
                color:
                  index < Math.floor(product.rating) ? "#f59e0b" : "#d1d5db",
              }}
            ></i>
          ))}
          <span
            className="ms-1 fw-semibold"
            style={{ fontSize: "0.75rem", color: "#6b7280" }}
          >
            {product.rating.toFixed(1)}
          </span>
        </div>

        {/* Price */}
        <div className="d-flex align-items-center gap-2 mb-3">
          <span
            className="fw-bold"
            style={{ fontSize: "1.1rem", color: "#4f46e5" }}
          >
            ₹{product.discountPrice.toLocaleString()}
          </span>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          {checkProductIsInCart(product.id) ? (
            <Link
              to="/cart"
              className="btn w-100 fw-semibold d-flex align-items-center justify-content-center gap-2"
              style={{
                border: "1.5px solid #4f46e5",
                color: "#4f46e5",
                borderRadius: 10,
                background: "#f5f3ff",
                fontSize: "0.82rem",
                letterSpacing: "0.3px",
              }}
            >
              <i className="bi bi-cart-check-fill" style={{ fontSize: 14 }}></i>
              View in Cart
            </Link>
          ) : (
            <button
              disabled={
                product.id === productId && addTocartLoading === "loading"
              }
              onClick={() => handleAddToCart(product.id, 1)}
              className="btn w-100 fw-semibold d-flex align-items-center justify-content-center gap-2 text-white"
              style={{
                background: "linear-gradient(135deg, #1e1b4b, #4f46e5)",
                border: "none",
                borderRadius: 10,
                fontSize: "0.82rem",
                letterSpacing: "0.3px",
              }}
            >
              <i className="bi bi-cart-plus-fill" style={{ fontSize: 14 }}></i>
              {addTocartLoading === "loading" && product.id === productId
                ? "Adding to cart"
                : "Add to Cart"}
              {addTocartLoading === "loading" && product.id === productId && (
                <span className="spinner-border spinner-border-sm ms-2"></span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

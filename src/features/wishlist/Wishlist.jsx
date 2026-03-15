import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrRemoveWishlistAsync,
  wishlistToCartAsync,
  clearError,
} from "./wishlistSlice";
import { toast } from "react-hot-toast";
import { addToCart } from "../cart/cartSlice";
import ErrorModal from "../../components/ErrorModal";

const Wishlist = () => {
  const dispatch = useDispatch();

  const {
    wishlist,
    getWishlistLoading,
    addOrRemoveWishlistLoading,
    moveToCartLoading,
    error,
  } = useSelector((state) => state.wishlist);

  const handleRemoveToWishList = async (productId) => {
    const toastId = toast.loading("Removing from wishlist...");
    try {
      const res = await dispatch(
        addOrRemoveWishlistAsync({ productId }),
      ).unwrap();
      toast.success(res.message || "Product removed from wishlist.", {
        id: toastId,
      });
    } catch (error) {
      toast.error(error || "Failed to Product removed from wishlist.", {
        id: toastId,
      });
      console.log(error);
    }
  };

  const handleWishListToCart = async (product) => {
    const toastId = toast.loading("Moving to cart...");
    try {
      dispatch(addToCart({ ...product, quantity: 1 }));
      const res = await dispatch(
        wishlistToCartAsync({ productId: product.id }),
      ).unwrap();
      toast.success(res.message || "Product moved to Cart.", {
        id: toastId,
      });
    } catch (error) {
      toast.error(error || "Failed to Product move to cart.", {
        id: toastId,
      });
      console.log(error);
    }
  };

  return (
    <main className="container py-4 py-md-5 mb-5 mb-md-2">
      {/* ── Page Header ── */}
      <div className="d-flex align-items-center gap-2 mb-4 mb-md-5">
        <div
          className="rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
          style={{
            width: 44,
            height: 44,
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
          }}
        >
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <div>
          <h1
            className="h4 fw-bold mb-0"
            style={{ color: "#1e1b4b", letterSpacing: "-0.01em" }}
          >
            My Wishlist
          </h1>
          {wishlist?.length > 0 && (
            <span className="text-muted" style={{ fontSize: "0.82rem" }}>
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
            </span>
          )}
        </div>
      </div>

      {/* ── Error ── */}
      {error && (
        <ErrorModal message={error} onClose={() => dispatch(clearError())} />
      )}

      {/* ── Loading ── */}
      {getWishlistLoading === "loading" ? (
        <Loading />
      ) : (
        <>
          {wishlist && wishlist.length > 0 ? (
            <div className="row g-3 g-md-4">
              {wishlist.map((product) => (
                <div className="col-12 col-sm-6 col-lg-4" key={product.id}>
                  <div
                    className="card h-100 border-0 rounded-4 overflow-hidden"
                    style={{
                      boxShadow: "0 2px 12px rgba(79,70,229,0.08)",
                      transition: "box-shadow 0.2s, transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 8px 28px rgba(79,70,229,0.18)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        "0 2px 12px rgba(79,70,229,0.08)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {/* Image */}
                    <div
                      className="position-relative overflow-hidden"
                      style={{ height: "220px" }}
                    >
                      <img
                        src={product.images[0].url}
                        className="w-100 h-100 object-fit-cover"
                        alt={product.name}
                        style={{ transition: "transform 0.35s ease" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.06)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      />
                      {/* Wishlist badge */}
                      <span
                        className="position-absolute top-0 end-0 m-2 badge rounded-pill"
                        style={{
                          background:
                            "linear-gradient(135deg, #4f46e5, #7c3aed)",
                          fontSize: "0.7rem",
                          padding: "0.35em 0.75em",
                        }}
                      >
                        ♥ Saved
                      </span>
                    </div>

                    {/* Body */}
                    <div
                      className="card-body d-flex flex-column gap-2 px-3 py-3"
                      style={{ background: "#fff" }}
                    >
                      <h5
                        className="card-title fw-semibold mb-0 text-truncate"
                        style={{ color: "#1e1b4b", fontSize: "0.97rem" }}
                        title={product.name}
                      >
                        {product.name}
                      </h5>

                      <p
                        className="mb-0 fw-bold"
                        style={{
                          background:
                            "linear-gradient(135deg, #4f46e5, #7c3aed)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontSize: "1.05rem",
                        }}
                      >
                        ₹{product.price}
                      </p>

                      {/* Divider */}
                      <hr className="my-1" style={{ borderColor: "#ede9fe" }} />

                      {/* Actions */}
                      <div className="d-flex flex-column gap-2 mt-auto">
                        <button
                          disabled={moveToCartLoading === "loading"}
                          onClick={() => handleWishListToCart(product)}
                          className="btn w-100 fw-semibold rounded-3"
                          style={{
                            background:
                              "linear-gradient(135deg, #4f46e5, #7c3aed)",
                            color: "#fff",
                            border: "none",
                            fontSize: "0.88rem",
                            padding: "0.5rem",
                          }}
                        >
                          Move to Cart
                        </button>

                        <button
                          disabled={addOrRemoveWishlistLoading === "loading"}
                          onClick={() => handleRemoveToWishList(product.id)}
                          className="btn w-100 fw-semibold rounded-3"
                          style={{
                            border: "1.5px solid #f87171",
                            color: "#dc2626",
                            background: "transparent",
                            fontSize: "0.88rem",
                            padding: "0.5rem",
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ── Empty State ── */
            <div className="text-center py-5 my-3">
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: 72,
                  height: 72,
                  background: "#f5f3ff",
                }}
              >
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  stroke="#a5b4fc"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h5 className="fw-semibold mb-1" style={{ color: "#1e1b4b" }}>
                Your wishlist is empty
              </h5>
              <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
                Save products you love and find them here.
              </p>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Wishlist;

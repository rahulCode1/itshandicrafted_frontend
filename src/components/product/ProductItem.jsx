import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

import ProductImageCarousel from "./ProductImageCarousel";
import { addToCartAsync, getAllCartAsync } from "../../features/cart/cartSlice";
import { addOrRemoveWishlistAsync } from "../../features/wishlist/wishlistSlice";
import { privateApi } from "../../utils/axios";
import styles from "./ProductItem.module.css";

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
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();



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
      return navigate("/login", { state: { from: location.pathname } });
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
      return navigate("/login", { state: { from: location.pathname } });
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
      return navigate("/login", { state: { from: location.pathname } });
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
      <main className={styles.mainContainer}>
        <section>
          <div className={styles.container}>
            {/* LEFT IMAGE */}
            <div className={styles["img-container"]}>
              <ProductImageCarousel images={productInfo.images} />
            </div>
            {/* RIGHT DETAILS */}

            <div className={styles["details-container"]}>
              {/* Category */}
              <div>
                <span className={styles.categoryBadge}>
                  {productInfo.category || "Handicrafts"}
                </span>
              </div>

              {/* Title */}
              <h1>{productInfo.name}</h1>

              {/* Rating */}
              <div className={styles.ratingWrapper}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, index) => (
                    <span key={index}>
                      {index < Math.floor(productInfo.rating) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <span className={styles.ratingScore}>{productInfo.rating}</span>
                <span className={styles.reviewCount}>
                  ({productInfo.reviews || 0} reviews)
                </span>
              </div>

              {/* Pricing */}
              <div className={styles.pricingWrapper}>
                <h2>₹{productInfo.discountPrice}</h2>
                <span className={styles.originalPrice}>
                  ₹{productInfo.price}
                </span>
                <span className={styles.discountBadge}>
                  {Math.round(
                    ((productInfo.price - productInfo.discountPrice) /
                      productInfo.price) *
                      100,
                  )}
                  % OFF
                </span>
              </div>

              {/* Short Description + Material */}
              <div className={styles.descriptionBlock}>
                <p>{productInfo.shortDescription}</p>
                <div className={styles.materialLine}>
                  <strong>Material:</strong> {productInfo.materialType}
                </div>
              </div>

              {/* Quantity */}
              <div className={styles.quantitySection}>
                <label>Select Quantity</label>

                <div className={styles.incOrDecContainer}>
                  <button
                    disabled={quantity === 1}
                    onClick={() => setQuantity((prev) => prev - 1)}
                    className={styles.incOrDecBtn}
                  >
                    -
                  </button>

                  <input
                    value={quantity}
                    className={styles.quantityInput}
                    readOnly
                  />

                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className={styles.incOrDecBtn}
                  >
                    +
                  </button>
                </div>

                {/* Cart + Wishlist Buttons */}
                <div className={styles.cartAndWishlistContainer}>
                  {checkProductIsInCart(productInfo.id) ? (
                    <Link to="/cart">Go to Cart</Link>
                  ) : (
                    <button
                      disabled={addTocartLoading === "loading"}
                      onClick={() => handleAddToCart(productInfo.id, quantity)}
                      className={`${styles.btn} ${styles.addToCartBtn}`}
                    >
                      {addTocartLoading === "loading"
                        ? "Adding..."
                        : "Add to Cart"}
                      {addTocartLoading === "loading" && (
                        <span className="spinner-border spinner-border-sm ms-2"></span>
                      )}
                    </button>
                  )}

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
                    className={`${styles.btn} ${styles.addToWishlistBtn}`}
                  >
                    {toggleWishlistLoading !== "loading" &&
                      (checkProductIsWishlist(productInfo.id) ? "❤️" : "🤍")}

                    {toggleWishlistLoading === "loading" && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                  </button>
                </div>
              </div>

              {/* Buy Now */}
              <div>
                <button
                  disabled={isLoading}
                  onClick={handleAddToBuyNow}
                  className={`${styles.btn} ${styles.buyNowBtn}`}
                >
                  {isLoading ? "Buying..." : "Buy Now"}
                  {isLoading && (
                    <span className="spinner-border spinner-border-sm ms-2"></span>
                  )}
                </button>
              </div>

              {/* Trust Icons */}
              <div className={styles.trustIconsWrapper}>
                {[
                  { icon: "bi-wallet2", label: "Cash on Delivery" },
                  { icon: "bi-truck", label: "Free Shipping" },
                  { icon: "bi-shield-check", label: "Secure Payment" },
                ].map(({ icon, label }, i) => (
                  <div
                    key={i}
                    className="d-flex flex-column justify-content-between align-items-center gap-1"
                  >
                    <i
                      className={`bi ${icon}`}
                      style={{ fontSize: "1.6rem" }}
                    />
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 600,
                      }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductItem;

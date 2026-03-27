import { Link } from "react-router-dom";
import styles from "./SimilarProducts.module.css";

const SimilarProducts = ({ similarProducts }) => {
  if (!similarProducts || similarProducts.length === 0) return null;

  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.heading}>You May Also Like</h2>
        <span className={styles.subtext}>Similar handcrafted pieces</span>
      </div>

      {/* Scroll Track */}
      <div className={styles.scrollWrapper}>
        <div className={styles.track}>
          {similarProducts.map((product) => {
            const discount = Math.round(
              ((product.price - product.discountPrice) / product.price) * 100
            );
            const thumbnail = product.images?.[0]?.url || product.images?.[0];

            return (
              <Link
                to={`/products/${product.id || product._id}`}
                key={product.id || product._id}
                className={styles.card}
              >
                {/* Discount badge */}
                {discount > 0 && (
                  <span className={styles.discountBadge}>{discount}% OFF</span>
                )}

                {/* Image */}
                <div className={styles.imgWrapper}>
                  {thumbnail ? (
                    <img
                      src={thumbnail}
                      alt={product.name}
                      className={styles.img}
                    />
                  ) : (
                    <div className={styles.imgPlaceholder}>
                      <i className="bi bi-image" style={{ fontSize: "2rem", color: "#c9a87c" }} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className={styles.info}>
                  <span className={styles.category}>{product.category}</span>
                  <p className={styles.name}>{product.name}</p>

                  {/* Rating */}
                  <div className={styles.ratingRow}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? styles.starFilled : styles.starEmpty}>
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className={styles.priceRow}>
                    <span className={styles.discountPrice}>₹{product.discountPrice}</span>
                    <span className={styles.originalPrice}>₹{product.price}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SimilarProducts;
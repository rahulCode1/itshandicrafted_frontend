import { Link } from "react-router-dom";
import {
  totalPrice,
  totalQuantity,
  totalDiscount,
} from "../../functions/reUseFunctions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { increaseCartQuantityAsync } from "../../features/cart/cartSlice";

const CartList = ({
  productCart,

  handleDecreaseQuantity,
  handleRemoveFromCart,
  handleCartToWishList,
  fetchUserCarts,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserCarts(productCart);
  }, [productCart]);

  const handleIncreaseQuantity = async (productId) => {
    console.log(productId)
    try {
      await dispatch(increaseCartQuantityAsync(productId)).unwrap();
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <main className="container py-4">
        {productCart && productCart.length > 0 ? (
          productCart.map((product) => (
            <div className="card mb-4 shadow-sm border-0 rounded-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={product.images[0].url}
                    className="img-fluid w-100 h-100"
                    style={{
                      objectFit: "cover",
                      borderRadius: "12px 0 0 12px",
                    }}
                    alt={product.name}
                  />
                </div>

                <div className="col-md-8 d-flex align-items-center">
                  <div className="card-body">
                    <h4 className="fw-bold mb-2">{product.name}</h4>

                    <p className="mb-2">
                      <span className="fw-bold text-success fs-4">
                        ₹{product.discountPrice}
                      </span>
                      <span
                        className="text-muted ms-2"
                        style={{ textDecoration: "line-through" }}
                      >
                        ₹{product.price}
                      </span>
                    </p>

                    <p className="text-muted small mb-3">
                      You save ₹{product.price - product.discountPrice}!
                    </p>

                    <div className="d-flex align-items-center mb-3">
                      <span className="me-3 fw-bold">Quantity:</span>

                      <div
                        className="d-flex align-items-center border rounded-pill px-3 py-2"
                        style={{
                          width: "150px",
                          justifyContent: "space-between",
                        }}
                      >
                        <button
                          onClick={() => handleDecreaseQuantity(product.id)}
                          className="btn btn-light btn-sm rounded-circle shadow-sm"
                        >
                          −
                        </button>

                        <span className="fw-bold">{product.quantity}</span>

                        <button
                          onClick={() => handleIncreaseQuantity(product.id)}
                          className="btn btn-light btn-sm rounded-circle shadow-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="d-flex gap-3">
                      <button
                        onClick={() => handleRemoveFromCart(product.id)}
                        className="btn btn-outline-danger px-3"
                      >
                        Remove
                      </button>

                      <button
                        onClick={() => handleCartToWishList(product)}
                        className="btn btn-outline-dark px-3"
                      >
                        Move to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted py-5 fs-5">
            No products found in cart.
          </p>
        )}

        {productCart && productCart.length > 0 && (
          <div className="card shadow-sm border-0 rounded-3 p-4 mt-4">
            <h4 className="fw-bold mb-3">Checkout Summary</h4>

            <p className="mb-1">
              <strong>Total Items:</strong> {totalQuantity(productCart)}
            </p>

            <p className="mb-1">
              <strong>Total Discount:</strong> ₹{totalDiscount(productCart)}
            </p>

            <h5 className="fw-bold mt-2 mb-3">
              Total Payable: ₹{totalPrice(productCart)}
            </h5>

            <Link to="checkout" className="btn btn-primary btn-lg w-100">
              Proceed to Checkout
            </Link>
          </div>
        )}
      </main>
    </>
  );
};

export default CartList;

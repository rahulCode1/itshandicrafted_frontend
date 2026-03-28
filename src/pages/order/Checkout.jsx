import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useEcommerce } from "../../context/EcommerceContext";
import Loading from "../../components/Loading";
import { fetchUserAddressAsync } from "../../features/address/addressSlice";
import { clearCart } from "../../features/cart/cartSlice";
import { privateApi } from "../../utils/axios";
import ErrorModal from "../../components/ErrorModal";

const Checkout = () => {
  const [payment, setPayment] = useState("ONLINE");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { cart: productCart } = useSelector((state) => state.cart);
  const { handleSelectDefaultAddress } = useEcommerce();
  const { address } = useSelector((state) => state.address);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalPrice = productCart.reduce(
    (acc, curr) => acc + Number(curr.discountPrice) * curr.quantity,
    0,
  );

  const totalQuantity = productCart.reduce(
    (acc, curr) => acc + curr.quantity,
    0,
  );

  const totalDiscount = productCart.reduce(
    (acc, curr) =>
      acc + (Number(curr.price) - Number(curr.discountPrice)) * curr.quantity,
    0,
  );

  const selectedAddress =
    address &&
    address.length > 0 &&
    address.find((address) => address.isDefault === true);

  const handleSubmitOrder = async () => {
    if (!selectedAddress) {
      return navigate("/address/addAddress", { state: { from: "/checkout" } });
    }

    const toastId = toast.loading("Place order...");

    const order = {
      address: selectedAddress.id,
      summary: { totalPrice, totalDiscount, totalQuantity },
      paymentMethod: payment,
    };

    try {
      setIsLoading(true);
      if (payment === "ONLINE") {
        const { data } = await privateApi.post(`/order/create-order`, {
          amount: totalPrice,
        });
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: "INR",
          name: "It's Handicrafted",
          order_id: data.id,
          method: { upi: true },
          handler: async function (response) {
            const { data } = await privateApi.post(`/order/placeOrder`, {
              ...response,
              ...order,
            });
            dispatch(clearCart());
            toast.success(data?.message || "Order place successfully.", {
              id: toastId,
            });
            navigate(`/orders/${data.order.id}`);
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        setIsLoading(true);
        const { data } = await privateApi.post(`/order/placeOrder`, order);
        dispatch(clearCart());
        navigate(`/orders/${data.order.id}`);
        toast.success(data?.message || "Order place successfully.", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message || "Error occurred while place order.",
      );
      toast.error(
        error.response?.data?.message || "Error occurred while place order.",
        { id: toastId },
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleGetUserAddress = async () => {
      try {
        await dispatch(fetchUserAddressAsync()).unwrap();
      } catch (error) {
        console.log(error);
      }
    };

    handleGetUserAddress();
  }, [dispatch]);

  return (
    <>
      {/* ── Top Bar ── */}
      <div className="bg-dark text-white d-flex align-items-center gap-2 px-3 py-2 border-bottom border-secondary">
        <i className="bi bi-bag-heart-fill text-warning"></i>
        <span className="fw-semibold small">It's Handicrafted</span>
        <span className="vr mx-1 opacity-25"></span>
        <span className="text-white-50 small">Secure Checkout</span>
        <i className="bi bi-shield-lock-fill text-success ms-auto small"></i>
      </div>

      {error && <ErrorModal message={error} onClose={() => setError(null)} />}

      <div
        className="bg-light min-vh-100 py-3 pb-5"
        style={{ marginBottom: "5em" }}
      >
        <div className="container" style={{ maxWidth: 540 }}>
          {isLoading && (
            <div className="overlay">
              <Loading />
            </div>
          )}

          {/* Page heading */}
          <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
            <i className="bi bi-cart-check text-primary"></i>
            Review &amp; Place Order
          </h5>

          {/* ════════════════════════════
              CARD 1 — Order Summary
          ════════════════════════════ */}
          <div className="card border-0 shadow-sm rounded-4 mb-3 overflow-hidden">
            <div className="card-header bg-white border-bottom px-4 py-3 d-flex align-items-center gap-2">
              <i className="bi bi-box-seam text-primary"></i>
              <span className="fw-semibold text-dark">Order Summary</span>
              <span
                className="badge bg-primary-subtle text-primary rounded-pill ms-auto"
                style={{ fontSize: "0.7rem" }}
              >
                {totalQuantity} {totalQuantity > 1 ? "items" : "item"}
              </span>
            </div>

            <div className="card-body px-4 py-3">
              {/* Product list */}
              <div className="d-flex flex-column gap-3 mb-3">
                {productCart.map((product) => (
                  <div
                    key={product.id}
                    className="d-flex gap-3 align-items-start"
                  >
                    <Link
                      to={`/products/${product.id}`}
                      className="flex-shrink-0"
                    >
                      <img
                        src={product?.images[0]?.url}
                        alt={product.name}
                        className="rounded-3 border"
                        style={{ width: 72, height: 72, objectFit: "cover" }}
                      />
                    </Link>
                    <div className="flex-grow-1 min-w-0">
                      <p
                        className="fw-semibold text-dark mb-1 lh-sm"
                        style={{ fontSize: "0.88rem" }}
                      >
                        {product.name}
                      </p>
                      <div className="d-flex flex-wrap gap-1 mb-1">
                        <span
                          className="badge bg-secondary-subtle text-secondary rounded-pill"
                          style={{ fontSize: "0.65rem" }}
                        >
                          {product.category}
                        </span>
                        <span
                          className="badge bg-light text-muted border rounded-pill"
                          style={{ fontSize: "0.65rem" }}
                        >
                          <i className="bi bi-layers me-1"></i>Qty:{" "}
                          {product.quantity}
                        </span>
                        {product.price - product.discountPrice > 0 && (
                          <span
                            className="badge bg-success-subtle text-success rounded-pill"
                            style={{ fontSize: "0.65rem" }}
                          >
                            {Math.round(
                              ((product.price - product.discountPrice) /
                                product.price) *
                                100,
                            )}
                            % OFF
                          </span>
                        )}
                      </div>
                      <div className="d-flex align-items-baseline gap-2">
                        <span
                          className="fw-bold text-dark"
                          style={{ fontSize: "0.92rem" }}
                        >
                          ₹{product.discountPrice}
                        </span>
                        <span className="text-decoration-line-through text-muted small">
                          ₹{product.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <hr className="my-3" />

              {/* Price breakdown */}
              <div className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-between small text-muted">
                  <span>
                    MRP ({totalQuantity} {totalQuantity > 1 ? "items" : "item"})
                  </span>
                  <span>₹{totalPrice + totalDiscount}</span>
                </div>
                <div className="d-flex justify-content-between small">
                  <span className="text-muted">Discount</span>
                  <span className="text-success fw-medium">
                    − ₹{totalDiscount}
                  </span>
                </div>
                <div className="d-flex justify-content-between small">
                  <span className="text-muted">Delivery Charges</span>
                  {payment === "ONLINE" ? (
                    <span className="text-success fw-medium">
                      <i className="bi bi-truck me-1"></i>FREE
                    </span>
                  ) : (
                    <span className="text-warning fw-medium">+ ₹60</span>
                  )}
                </div>
                <hr className="my-1" />
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold text-dark">Total Payable</span>
                  <span className="fw-bold fs-5 text-dark">
                    ₹{payment === "ONLINE" ? totalPrice : totalPrice + 60}
                  </span>
                </div>
              </div>

              {totalDiscount > 0 && (
                <div className="alert alert-success d-flex align-items-center gap-2 py-2 px-3 mb-0 mt-3 rounded-3 small">
                  <i className="bi bi-piggy-bank-fill fs-5"></i>
                  You're saving{" "}
                  <strong className="ms-1">₹{totalDiscount}</strong> on this
                  order!
                </div>
              )}
            </div>
          </div>

          {/* ════════════════════════════
              CARD 2 — Delivery Address
          ════════════════════════════ */}
          <div className="card border-0 shadow-sm rounded-4 mb-3 overflow-hidden">
            <div className="card-header bg-white border-bottom px-4 py-3 d-flex align-items-center gap-2">
              <i className="bi bi-geo-alt-fill text-danger"></i>
              <span
                className="fw-semibold text-dark"
                style={{ fontSize: "0.92rem" }}
              >
                Delivery Address
              </span>
              <Link
                to="/address/addAddress"
                state={{ from: "/checkout" }}
                className="btn btn-outline-primary btn-sm rounded-3 fw-semibold ms-auto d-flex align-items-center gap-1"
                style={{ fontSize: "0.72rem" }}
              >
                <i className="bi bi-plus-lg"></i> Add New
              </Link>
            </div>

            <div className="card-body px-4 py-3">
              {selectedAddress ? (
                <div
                  className="rounded-3 p-3 border"
                  style={{ background: "#f9fafb" }}
                >
                  {/* Name + Default badge */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span
                      className="fw-semibold text-dark"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {selectedAddress.name}
                    </span>
                    {selectedAddress.isDefault && (
                      <span
                        className="badge bg-primary-subtle text-primary border border-primary border-opacity-25 rounded-pill d-flex align-items-center gap-1"
                        style={{ fontSize: "0.65rem" }}
                      >
                        <i className="bi bi-patch-check-fill"></i> Default
                      </span>
                    )}
                  </div>

                  {/* Detail rows */}
                  <div className="d-flex flex-column gap-2 mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <i
                        className="bi bi-telephone-fill text-muted flex-shrink-0"
                        style={{ fontSize: "0.82rem" }}
                      ></i>
                      <span
                        className="text-muted"
                        style={{ fontSize: "0.82rem" }}
                      >
                        {selectedAddress.phoneNumber}
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <i
                        className="bi bi-mailbox text-muted flex-shrink-0"
                        style={{ fontSize: "0.82rem" }}
                      ></i>
                      <span
                        className="text-muted"
                        style={{ fontSize: "0.82rem" }}
                      >
                        {selectedAddress.zipCode}
                      </span>
                    </div>
                    <div className="d-flex align-items-start gap-2">
                      <i
                        className="bi bi-house-fill text-muted flex-shrink-0 mt-1"
                        style={{ fontSize: "0.82rem" }}
                      ></i>
                      <span
                        className="text-muted"
                        style={{ fontSize: "0.82rem", lineHeight: 1.5 }}
                      >
                        {selectedAddress.fullAddress}
                        {selectedAddress.area &&
                          `, ${selectedAddress.area}`}, {selectedAddress.city},{" "}
                        {selectedAddress.state}
                      </span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="d-flex gap-2">
                    {address.length > 1 && (
                      <Link
                        to="/address"
                        state={{ from: "/checkout" }}
                        className="btn btn-outline-secondary btn-sm flex-fill rounded-3 d-flex align-items-center justify-content-center gap-1"
                        style={{ fontSize: "0.78rem" }}
                      >
                        <i className="bi bi-arrow-left-right"></i> Change
                      </Link>
                    )}
                    {!selectedAddress.isDefault && (
                      <button
                        onClick={() =>
                          handleSelectDefaultAddress(selectedAddress.id)
                        }
                        className="btn btn-outline-success btn-sm flex-fill rounded-3 d-flex align-items-center justify-content-center gap-1"
                        style={{ fontSize: "0.78rem" }}
                      >
                        <i className="bi bi-check2-circle"></i> Set Default
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <i
                    className="bi bi-geo-alt text-muted d-block mb-2"
                    style={{ fontSize: "2.5rem", opacity: 0.3 }}
                  ></i>
                  <p className="text-muted small mb-3">
                    No delivery address found
                  </p>
                  <Link
                    to="/address/addAddress"
                    state={{ from: "/checkout" }}
                    className="btn btn-primary btn-sm rounded-pill px-4 d-inline-flex align-items-center gap-1"
                  >
                    <i className="bi bi-plus-circle-fill"></i> Add Address
                  </Link>
                </div>
              )}

              {/* Quick-action dashed links */}
              <div className="d-flex flex-column gap-2 mt-3">
                <Link
                  to="/address/addAddress"
                  state={{ from: "/checkout" }}
                  className="btn btn-sm d-flex align-items-center justify-content-center gap-2 rounded-3"
                  style={{
                    border: "0.5px dashed #93c5fd",
                    background: "#eff6ff",
                    color: "#1d4ed8",
                    fontSize: "0.8rem",
                    padding: "9px",
                  }}
                >
                  <i className="bi bi-plus-circle-fill"></i> Add New Address
                </Link>
                {address && address.length > 1 && (
                  <Link
                    to="/address"
                    state={{ from: "/checkout" }}
                    className="btn btn-sm d-flex align-items-center justify-content-center gap-2 rounded-3"
                    style={{
                      border: "0.5px dashed #d1d5db",
                      background: "#f9fafb",
                      color: "#6b7280",
                      fontSize: "0.8rem",
                      padding: "9px",
                    }}
                  >
                    <i className="bi bi-arrow-left-right"></i> Switch Address
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* ════════════════════════════
              CARD 3 — Payment Method
          ════════════════════════════ */}
          <div className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
            <div className="card-header bg-white border-bottom px-4 py-3 d-flex align-items-center gap-2">
              <i className="bi bi-wallet2 text-success"></i>
              <span className="fw-semibold text-dark">Payment Method</span>
              <span
                className="badge bg-success-subtle text-success border border-success border-opacity-25 rounded-pill ms-auto"
                style={{ fontSize: "0.65rem" }}
              >
                Save ₹60 online
              </span>
            </div>

            <div className="card-body px-4 py-3">
              <div className="d-flex flex-column gap-2">
                {[
                  {
                    value: "ONLINE",
                    label: "Pay Online",
                    sub: "UPI / Card / Net Banking — Free delivery",
                    icon: "bi-lightning-charge-fill",
                    accent: "primary",
                  },
                  {
                    value: "COD",
                    label: "Cash on Delivery",
                    sub: "Pay when your order arrives — ₹60 charge",
                    icon: "bi-cash-coin",
                    accent: "warning",
                  },
                ].map(({ value, label, sub, icon, accent }) => (
                  <label
                    key={value}
                    className={`d-flex align-items-center gap-3 p-3 rounded-3 border ${payment === value ? `border-${accent} bg-${accent} bg-opacity-10` : "border bg-light"}`}
                    style={{ cursor: "pointer", transition: "all 0.15s" }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={value}
                      checked={payment === value}
                      onChange={(e) => setPayment(e.target.value)}
                      className="form-check-input mt-0 flex-shrink-0"
                    />
                    <div
                      className={`d-flex align-items-center justify-content-center rounded-2 flex-shrink-0 bg-${accent} bg-opacity-10`}
                      style={{ width: 34, height: 34 }}
                    >
                      <i
                        className={`bi ${icon} text-${accent}`}
                        style={{ fontSize: 15 }}
                      ></i>
                    </div>
                    <div>
                      <p
                        className="fw-semibold mb-0 text-dark"
                        style={{ fontSize: "0.88rem" }}
                      >
                        {label}
                      </p>
                      <small
                        className="text-muted"
                        style={{ fontSize: "0.72rem" }}
                      >
                        {sub}
                      </small>
                    </div>
                  </label>
                ))}
              </div>

              <p
                className="text-muted d-flex align-items-center gap-1 mt-3 mb-0"
                style={{ fontSize: "0.72rem" }}
              >
                <i className="bi bi-info-circle text-primary"></i>
                More payment options (UPI, Cards) coming soon.
              </p>
            </div>
          </div>

          {/* ── Place Order Button ── */}
          <div className="d-grid mb-2">
            <button
              onClick={handleSubmitOrder}
              disabled={isLoading}
              className="btn btn-dark fw-bold py-3 rounded-3 d-flex align-items-center justify-content-center gap-2"
              style={{ fontSize: "1rem", letterSpacing: "0.02em" }}
            >
              {isLoading ? (
                <>
                  Placing Order…{" "}
                  <span className="spinner-border spinner-border-sm" />
                </>
              ) : (
                <>
                  <i className="bi bi-bag-check-fill text-warning"></i>
                  Place Order &nbsp;·&nbsp; ₹
                  {payment === "ONLINE" ? totalPrice : totalPrice + 60}
                </>
              )}
            </button>
          </div>

          {/* Secure note */}
          <p
            className="text-center text-muted d-flex align-items-center justify-content-center gap-1 mb-0"
            style={{ fontSize: "0.72rem" }}
          >
            <i className="bi bi-shield-lock-fill text-success"></i>
            100% Secure &amp; Trusted Checkout
          </p>
        </div>
      </div>
    </>
  );
};

export default Checkout;

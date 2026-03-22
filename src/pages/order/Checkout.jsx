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
    if (address.length === 0) {
      return setError("Please add address to place order.");
    }

    if (address.length !== 0 && !selectedAddress) {
      return setError("Select an default address to place order.");
    }

    const toastId = toast.loading("Place order...");



    const order = {
      address: selectedAddress.id,
      summary: {
        totalPrice,
        totalDiscount,
        totalQuantity,
      },

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
          method: {
            upi: true,
          },

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
    dispatch(fetchUserAddressAsync());
  }, [dispatch]);

  return (
    <main
      className="min-vh-100 py-4 py-md-5 bg-light"
      style={{ marginBottom: "5em" }}
    >
      {error && <ErrorModal message={error} onClose={() => setError(null)} />}

      <div className="container" style={{ maxWidth: 1000 }}>
        {isLoading && (
          <div className="overlay">
            <Loading />
          </div>
        )}

        {/* ── Page Header ── */}
        <div className="d-flex align-items-center gap-3 mb-4 mb-md-5">
          <div
            className="d-flex align-items-center justify-content-center rounded-3 bg-primary flex-shrink-0"
            style={{ width: 46, height: 46 }}
          >
            <i className="bi bi-bag-check-fill text-white fs-5"></i>
          </div>
          <div>
            <h4 className="fw-bold mb-0 text-dark">Checkout</h4>
            <span className="text-muted" style={{ fontSize: "0.83rem" }}>
              Review your order and place it securely
            </span>
          </div>
        </div>

        {/* ── Step indicators ── */}
        <div className="d-flex align-items-center gap-2 mb-4 pb-2">
          {[
            { step: 1, label: "Address", icon: "bi-geo-alt-fill", done: true },
            {
              step: 2,
              label: "Review",
              icon: "bi-clipboard2-check-fill",
              done: true,
            },
            {
              step: 3,
              label: "Payment",
              icon: "bi-credit-card-fill",
              done: false,
            },
          ].map(({ step, label, icon, done }, i, arr) => (
            <div
              key={step}
              className="d-flex align-items-center gap-2 flex-shrink-0"
            >
              <div className="d-flex align-items-center gap-2">
                <div
                  className={`d-flex align-items-center justify-content-center rounded-circle fw-bold ${done ? "bg-primary text-white" : "bg-white text-primary border border-primary"}`}
                  style={{ width: 32, height: 32, fontSize: "0.78rem" }}
                >
                  {done ? (
                    <i className={`bi ${icon}`} style={{ fontSize: 13 }}></i>
                  ) : (
                    step
                  )}
                </div>
                <span
                  className={`fw-semibold d-none d-sm-inline ${done ? "text-primary" : "text-muted"}`}
                  style={{ fontSize: "0.82rem" }}
                >
                  {label}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div
                  className="flex-grow-1 mx-1"
                  style={{
                    height: 1.5,
                    width: 32,
                    background: done ? "#4f46e5" : "#dee2e6",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="row g-4 align-items-start">
          {/* ════════════════════════════
          LEFT: Delivery Address
      ════════════════════════════ */}
          <div className="col-12 col-lg-6">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <p
                className="fw-bold mb-0 text-dark d-flex align-items-center gap-2"
                style={{ fontSize: "0.88rem" }}
              >
                <span
                  className="d-inline-flex align-items-center justify-content-center rounded-2 bg-primary"
                  style={{ width: 24, height: 24 }}
                >
                  <i
                    className="bi bi-geo-alt-fill text-white"
                    style={{ fontSize: 11 }}
                  ></i>
                </span>
                Delivery Address
              </p>
              <Link
                to="/address/addAddress"
                state={{ from: "/checkout" }}
                className="btn btn-outline-primary btn-sm rounded-3 fw-semibold d-flex align-items-center gap-1"
                style={{ fontSize: "0.75rem" }}
              >
                <i className="bi bi-plus-lg"></i>
                <span className="d-none d-sm-inline">Add New</span>
              </Link>
            </div>

            {selectedAddress ? (
              <div
                className="card rounded-4 overflow-hidden mb-3"
                style={{
                  border: "2px solid #4f46e5",
                  boxShadow: "0 0 0 4px rgba(79,70,229,0.07)",
                }}
              >
                {/* Top accent */}
                <div style={{ height: 3, background: "#4f46e5" }} />

                <div className="card-body p-3 p-md-4">
                  {/* Name + default badge */}
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 flex-shrink-0"
                        style={{ width: 38, height: 38 }}
                      >
                        <i
                          className="bi bi-person-fill text-primary"
                          style={{ fontSize: 15 }}
                        ></i>
                      </div>
                      <div>
                        <p
                          className="fw-bold mb-0 text-dark"
                          style={{ fontSize: "0.95rem" }}
                        >
                          {selectedAddress.name}
                        </p>
                        {selectedAddress.isDefault && (
                          <span
                            className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill"
                            style={{ fontSize: "0.62rem" }}
                          >
                            <i className="bi bi-patch-check-fill me-1"></i>
                            Default
                          </span>
                        )}
                      </div>
                    </div>
                    <span
                      className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 rounded-pill"
                      style={{ fontSize: "0.65rem" }}
                    >
                      <i className="bi bi-truck me-1"></i>Shipping
                    </span>
                  </div>

                  {/* Phone */}
                  <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 mb-3 bg-light border">
                    <i
                      className="bi bi-telephone-fill text-primary"
                      style={{ fontSize: 12 }}
                    ></i>
                    <span className="small text-muted">
                      {selectedAddress.phoneNumber}
                    </span>
                  </div>

                  {/* ZIP / City / State */}
                  <div className="row g-2 mb-3">
                    {[
                      { label: "ZIP", value: selectedAddress.zipCode },
                      { label: "City", value: selectedAddress.city },
                      { label: "State", value: selectedAddress.state },
                    ].map(({ label, value }) => (
                      <div className="col-4" key={label}>
                        <div className="bg-light border rounded-3 p-2 text-center">
                          <small
                            className="text-muted d-block"
                            style={{
                              fontSize: "0.6rem",
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            {label}
                          </small>
                          <span
                            className="fw-bold d-block text-truncate text-dark"
                            style={{ fontSize: "0.78rem" }}
                          >
                            {value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Full address */}
                  <div
                    className="d-flex align-items-start gap-2 p-3 rounded-3 mb-3 border"
                    style={{ borderStyle: "dashed", background: "#fafafa" }}
                  >
                    <i
                      className="bi bi-geo-alt-fill text-primary mt-1 flex-shrink-0"
                      style={{ fontSize: 13 }}
                    ></i>
                    <p
                      className="mb-0 small text-muted"
                      style={{ lineHeight: 1.7 }}
                    >
                      {selectedAddress.fullAddress}
                    </p>
                  </div>

                  {/* Actions row */}
                  <div className="d-flex gap-2">
                    {!selectedAddress.isDefault && (
                      <button
                        className="btn btn-outline-success btn-sm rounded-3 fw-semibold flex-grow-1"
                        onClick={() =>
                          handleSelectDefaultAddress(selectedAddress.id)
                        }
                        style={{ fontSize: "0.8rem" }}
                      >
                        <i className="bi bi-check2-circle me-1"></i>Set as
                        Default
                      </button>
                    )}
                    {address && address.length > 1 && (
                      <Link
                        to="/address"
                        state={{ from: "/checkout" }}
                        className="btn btn-outline-primary btn-sm rounded-3 fw-semibold flex-grow-1"
                        style={{ fontSize: "0.8rem" }}
                      >
                        <i className="bi bi-arrow-left-right me-1"></i>Change
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="card border text-center rounded-4 mb-3">
                <div className="card-body py-5 px-4">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 mb-3"
                    style={{ width: 64, height: 64 }}
                  >
                    <i
                      className="bi bi-geo-alt text-primary"
                      style={{ fontSize: 28 }}
                    ></i>
                  </div>
                  <h6 className="fw-bold mb-1 text-dark">No Address Found</h6>
                  <p className="text-muted small mb-3">
                    Add a delivery address to continue.
                  </p>
                  <Link
                    to="/address/addAddress"
                    state={{ from: "/checkout" }}
                    className="btn btn-primary fw-semibold px-4 py-2 rounded-3"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <i className="bi bi-plus-circle-fill me-2"></i>Add Address
                  </Link>
                </div>
              </div>
            )}

            {/* Trust badges */}
            <div className="card border-0 bg-white rounded-4 p-3">
              <div className="row g-2 text-center">
                {[
                  {
                    icon: "bi-shield-lock-fill",
                    label: "Secure Checkout",
                    color: "text-success",
                  },
                  {
                    icon: "bi-truck",
                    label: "Fast Delivery",
                    color: "text-primary",
                  },
                  {
                    icon: "bi-arrow-counterclockwise",
                    label: "Easy Returns",
                    color: "text-warning",
                  },
                ].map(({ icon, label, color }) => (
                  <div className="col-4" key={label}>
                    <i
                      className={`bi ${icon} ${color} d-block mb-1`}
                      style={{ fontSize: 18 }}
                    ></i>
                    <span
                      className="text-muted"
                      style={{ fontSize: "0.68rem" }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ════════════════════════════
          RIGHT: Order Summary
      ════════════════════════════ */}
          <div className="col-12 col-lg-6">
            <p
              className="fw-bold mb-3 text-dark d-flex align-items-center gap-2"
              style={{ fontSize: "0.88rem" }}
            >
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-2 bg-primary"
                style={{ width: 24, height: 24 }}
              >
                <i
                  className="bi bi-receipt text-white"
                  style={{ fontSize: 11 }}
                ></i>
              </span>
              Order Summary
            </p>

            {productCart && productCart.length > 0 ? (
              <div className="card border rounded-4 overflow-hidden">
                {/* Summary stats */}
                <div className="p-3 p-md-4 border-bottom">
                  <div className="row g-2 mb-3">
                    {[
                      {
                        label: "Items",
                        value: totalQuantity,
                        icon: "bi-stack",
                        variant: "primary",
                      },

                      {
                        label: "Delivery",
                        value: payment === "ONLINE" ? "FREE" : "+ ₹60",
                        icon: "bi-truck",
                        variant: payment === "ONLINE" ? "success" : "warning",
                      },
                    ].map(({ label, value, icon, variant }) => (
                      <div className="col-6" key={label}>
                        <div
                          className={`d-flex align-items-center gap-2 p-2 rounded-3 bg-${variant === "secondary" ? "light" : `${variant}-subtle`} border border-${variant === "secondary" ? "light" : `${variant}`} border-opacity-25`}
                        >
                          <i
                            className={`bi ${icon} text-${variant === "secondary" ? "muted" : variant}`}
                            style={{ fontSize: 13 }}
                          ></i>
                          <div className="min-w-0">
                            <small
                              className="text-muted d-block"
                              style={{
                                fontSize: "0.62rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.4px",
                              }}
                            >
                              {label}
                            </small>
                            <span
                              className={`fw-bold text-${variant === "secondary" ? "dark" : variant} d-block`}
                              style={{ fontSize: "0.85rem" }}
                            >
                              {value}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Net payable */}
                  <div className="d-flex align-items-center justify-content-between p-3 rounded-3 bg-primary bg-opacity-10 border border-primary border-opacity-25">
                    <div>
                      <small
                        className="text-muted d-block"
                        style={{
                          fontSize: "0.7rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.4px",
                        }}
                      >
                        Net Payable
                      </small>
                      <span
                        className="text-muted"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {payment === "ONLINE"
                          ? "incl. free delivery"
                          : "incl. ₹60 delivery"}
                      </span>
                    </div>
                    <span
                      className="fw-bold text-primary"
                      style={{ fontSize: "1.4rem" }}
                    >
                      ₹
                      {payment === "ONLINE"
                        ? totalPrice
                        : totalPrice + 60}
                    </span>
                  </div>
                </div>

                {/* Payment method */}
                <div className="p-3 p-md-4 border-bottom">
                  <label
                    className="form-label fw-semibold text-dark d-flex align-items-center gap-2 mb-2"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <i className="bi bi-credit-card-fill text-primary"></i>
                    Payment Method
                    <span
                      className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill ms-1"
                      style={{ fontSize: "0.65rem", fontWeight: 500 }}
                    >
                      Save ₹60 online
                    </span>
                  </label>

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
                        className={`d-flex align-items-center gap-3 p-3 rounded-3 border cursor-pointer ${payment === value ? `border-${accent} bg-${accent} bg-opacity-10` : "border bg-light"}`}
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
                </div>

                {/* Place order */}
                <div className="p-3 p-md-4">
                  <button
                    onClick={handleSubmitOrder}
                    disabled={isLoading}
                    className="btn btn-primary w-100 fw-bold py-3 rounded-3 d-flex align-items-center justify-content-center gap-2 mb-3"
                    style={{ fontSize: "1rem", letterSpacing: "0.2px" }}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm" />
                        Placing Order…
                      </>
                    ) : (
                      <>
                        <i className="bi bi-bag-check-fill fs-5"></i>
                        Place Order — ₹
                        {payment === "ONLINE"
                          ? totalPrice
                          : totalPrice + 60}
                      </>
                    )}
                  </button>

                  <div className="d-flex align-items-center justify-content-center gap-3">
                    {[
                      {
                        icon: "bi-shield-lock-fill",
                        label: "SSL Secured",
                        color: "text-success",
                      },
                      {
                        icon: "bi-lock-fill",
                        label: "Encrypted",
                        color: "text-primary",
                      },
                      {
                        icon: "bi-patch-check-fill",
                        label: "Verified",
                        color: "text-warning",
                      },
                    ].map(({ icon, label, color }) => (
                      <span
                        key={label}
                        className={`d-flex align-items-center gap-1 ${color}`}
                        style={{ fontSize: "0.72rem" }}
                      >
                        <i
                          className={`bi ${icon}`}
                          style={{ fontSize: 12 }}
                        ></i>
                        <span className="text-muted">{label}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="card border text-center rounded-4">
                <div className="card-body py-5 px-4">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 mb-3"
                    style={{ width: 72, height: 72 }}
                  >
                    <i
                      className="bi bi-cart-x text-primary"
                      style={{ fontSize: 30 }}
                    ></i>
                  </div>
                  <h6 className="fw-bold mb-1 text-dark">Cart is Empty</h6>
                  <p className="text-muted small mb-3">No products in cart.</p>
                  <Link
                    to="/cart"
                    className="btn btn-primary fw-semibold px-4 py-2 rounded-3"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <i className="bi bi-cart3 me-2"></i>Go to Cart
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;

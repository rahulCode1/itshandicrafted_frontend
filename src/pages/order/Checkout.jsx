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
  const [payment, setPayment] = useState("cod");
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
    (acc, curr) => acc + (Number(curr.price) - Number(curr.discountPrice)),
    0,
  );

  const selectedAddress =
    address &&
    address.length > 0 &&
    address.find((address) => address.isDefault === true);

  const handleSubmitOrder = async () => {
    if (address.length === 0) {
      return alert("Please add address.");
    }

    if (address.length !== 0 && !selectedAddress) {
      return alert("Please select an address.");
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
      paymentStatus: payment === "UPI" ? "completed" : "pending",
    };

    try {
      setIsLoading(true);
      const response = await privateApi.post(`order/placeOrder`, order);

      dispatch(clearCart());
      navigate("/orders");

      toast.success(response.data?.message || "Order place successfully.", {
        id: toastId,
      });
    } catch (error) {
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
      className="mb-5"
      style={{
        background: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 100%)",
        minHeight: "100vh",
      }}
    >
      {error && <ErrorModal message={error} onClose={() => setError(null)} />}
      <div className="container py-4 py-md-5">
        {isLoading && (
          <div className="overlay">
            <Loading />
          </div>
        )}

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
            <i className="bi bi-bag-check-fill fs-5"></i>
          </div>
          <div>
            <h4
              className="fw-bold mb-0"
              style={{ color: "#1e1b4b", letterSpacing: "-0.4px" }}
            >
              Checkout
            </h4>
            <span className="text-muted small">
              Review and place your order
            </span>
          </div>
        </div>

        <div className="row g-4 align-items-start">
          {/* ══════════════════════════
          LEFT: Delivery Addresses
      ══════════════════════════ */}
          <div className="col-12 col-md-6">
            {address && address.length > 0 && (
              <div className="d-flex align-items-center gap-2 mb-3">
                <span
                  className="d-inline-flex align-items-center justify-content-center rounded-2"
                  style={{ width: 28, height: 28, background: "#ede9fe" }}
                >
                  <i
                    className="bi bi-geo-alt-fill"
                    style={{ fontSize: 13, color: "#4f46e5" }}
                  ></i>
                </span>
                <h6 className="fw-bold mb-0" style={{ color: "#1e1b4b" }}>
                  Select Delivery Address
                </h6>
              </div>
            )}

            {address && address.length > 0 ? (
              <div className="d-flex flex-column gap-3">
                {address.map((userAdd) => (
                  <div
                    key={userAdd.id}
                    className="card border-0"
                    style={{
                      borderRadius: 14,
                      boxShadow: userAdd.isDefault
                        ? "0 4px 16px rgba(79,70,229,0.15)"
                        : "0 2px 8px rgba(79,70,229,0.06)",
                      border: userAdd.isDefault
                        ? "1.5px solid #a5b4fc"
                        : "1px solid #ede9fe",
                      overflow: "hidden",
                    }}
                  >
                    {/* Default highlight bar */}
                    {userAdd.isDefault && (
                      <div
                        style={{
                          height: 3,
                          background:
                            "linear-gradient(135deg, #4f46e5, #7c3aed)",
                        }}
                      />
                    )}

                    <div className="card-body p-3 p-md-4">
                      {/* Name + Default badge */}
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                            style={{
                              width: 34,
                              height: 34,
                              background: "#ede9fe",
                            }}
                          >
                            <i
                              className="bi bi-person-fill"
                              style={{ color: "#4f46e5", fontSize: 14 }}
                            ></i>
                          </div>
                          <h6
                            className="fw-bold mb-0"
                            style={{ color: "#1e1b4b" }}
                          >
                            {userAdd.name}
                          </h6>
                        </div>
                        {userAdd.isDefault && (
                          <span
                            className="badge rounded-pill"
                            style={{
                              background:
                                "linear-gradient(135deg, #4f46e5, #7c3aed)",
                              color: "#fff",
                              fontSize: "0.68rem",
                              fontWeight: 600,
                              padding: "4px 10px",
                            }}
                          >
                            <i className="bi bi-check-circle-fill me-1"></i>
                            Default
                          </span>
                        )}
                      </div>

                      {/* Phone */}
                      <div
                        className="d-flex align-items-center gap-2 px-3 py-2 rounded-2 mb-3"
                        style={{
                          background: "#f5f3ff",
                          border: "1px solid #ede9fe",
                        }}
                      >
                        <i
                          className="bi bi-telephone-fill"
                          style={{ color: "#4f46e5", fontSize: 12 }}
                        ></i>
                        <span className="small text-muted">
                          {userAdd.phoneNumber}
                        </span>
                      </div>

                      {/* Zip / City / State chips */}
                      <div className="row g-2 mb-3">
                        {[
                          {
                            label: "ZIP",
                            value: userAdd.zipCode,
                            icon: "bi-mailbox",
                          },
                          {
                            label: "City",
                            value: userAdd.city,
                            icon: "bi-building",
                          },
                          {
                            label: "State",
                            value: userAdd.state,
                            icon: "bi-flag",
                          },
                        ].map(({ label, value, icon }) => (
                          <div className="col-4" key={label}>
                            <div
                              className="p-2 rounded-2 text-center"
                              style={{
                                background: "#f5f3ff",
                                border: "1px solid #ede9fe",
                              }}
                            >
                              <small
                                className="text-muted d-block mb-1"
                                style={{
                                  fontSize: "0.62rem",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.5px",
                                }}
                              >
                                {label}
                              </small>
                              <span
                                className="fw-bold d-block"
                                style={{ color: "#1e1b4b", fontSize: "0.8rem" }}
                              >
                                {value}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Full Address */}
                      <div
                        className="d-flex align-items-start gap-2 p-3 rounded-2 mb-3"
                        style={{
                          background: "#fafafa",
                          border: "2px dashed #ddd6fe",
                        }}
                      >
                        <i
                          className="bi bi-geo-alt-fill mt-1 flex-shrink-0"
                          style={{ color: "#7c3aed", fontSize: 14 }}
                        ></i>
                        <p
                          className="mb-0 small text-muted"
                          style={{ lineHeight: 1.6 }}
                        >
                          {userAdd.fullAddress}
                        </p>
                      </div>

                      {!userAdd.isDefault && (
                        <button
                          className="btn btn-sm w-100 fw-semibold"
                          onClick={() => handleSelectDefaultAddress(userAdd.id)}
                          style={{
                            border: "1.5px solid #10b981",
                            color: "#10b981",
                            borderRadius: 8,
                            background: "transparent",
                            fontSize: "0.8rem",
                          }}
                        >
                          <i className="bi bi-check2-circle me-1"></i>Set as
                          Default
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* No address empty state */
              <div
                className="card border-0 text-center py-4"
                style={{
                  borderRadius: 14,
                  border: "1px solid #ede9fe",
                  background: "#fff",
                }}
              >
                <div className="card-body">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{ width: 64, height: 64, background: "#f5f3ff" }}
                  >
                    <i
                      className="bi bi-geo-alt"
                      style={{ fontSize: 28, color: "#7c3aed" }}
                    ></i>
                  </div>
                  <h6 className="fw-bold mb-1" style={{ color: "#1e1b4b" }}>
                    No Address Found
                  </h6>
                  <p className="text-muted small mb-3">
                    Add a delivery address to continue.
                  </p>
                  <Link
                    to="/address/addAddress"
                    state={{ from: "/checkout" }}
                    className="btn fw-semibold px-4 py-2 text-white"
                    style={{
                      background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                      border: "none",
                      borderRadius: 10,
                      fontSize: "0.85rem",
                    }}
                  >
                    <i className="bi bi-plus-circle-fill me-2"></i>Add New
                    Address
                  </Link>
                </div>
              </div>
            )}

            {/* Add new address link — always visible */}
            {address && address.length > 0 && (
              <div className="mt-3">
                <Link
                  to="/address/addAddress"
                  state={{ from: "/checkout" }}
                  className="btn w-100 fw-semibold d-flex align-items-center justify-content-center gap-2"
                  style={{
                    border: "1.5px dashed #a5b4fc",
                    color: "#4f46e5",
                    borderRadius: 12,
                    background: "#f5f3ff",
                    fontSize: "0.85rem",
                    padding: "10px",
                  }}
                >
                  <i className="bi bi-plus-circle-fill"></i>Add New Address
                </Link>
              </div>
            )}
          </div>

          {/* ══════════════════════════
          RIGHT: Order Review
      ══════════════════════════ */}
          <div className="col-12 col-md-6">
            {productCart && productCart.length > 0 ? (
              <div
                className="card border-0"
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(79,70,229,0.1)",
                  border: "1px solid #ede9fe",
                }}
              >
                {/* Card header */}
                <div
                  className="px-4 py-3 d-flex align-items-center gap-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                  }}
                >
                  <i className="bi bi-clipboard2-check-fill text-white fs-6"></i>
                  <h6 className="fw-bold text-white mb-0">Review Your Order</h6>
                </div>

                <div className="p-4" style={{ background: "#fff" }}>
                  {/* Order stats */}
                  <div className="row g-2 mb-4">
                    {[
                      {
                        label: "Quantity",
                        value: totalQuantity,
                        icon: "bi-stack",
                        color: "#4f46e5",
                        bg: "#f5f3ff",
                        border: "#ede9fe",
                      },
                      {
                        label: "Total Price",
                        value: `₹${totalPrice}`,
                        icon: "bi-currency-rupee",
                        color: "#4f46e5",
                        bg: "#f5f3ff",
                        border: "#ede9fe",
                      },
                      {
                        label: "Discount",
                        value: `₹${totalDiscount}`,
                        icon: "bi-tag-fill",
                        color: "#16a34a",
                        bg: "#f0fdf4",
                        border: "#bbf7d0",
                      },
                      {
                        label: "Delivery",
                        value: "2 days",
                        icon: "bi-truck",
                        color: "#4f46e5",
                        bg: "#f5f3ff",
                        border: "#ede9fe",
                      },
                    ].map(({ label, value, icon, color, bg, border }) => (
                      <div className="col-6" key={label}>
                        <div
                          className="p-3 rounded-3"
                          style={{
                            background: bg,
                            border: `1px solid ${border}`,
                          }}
                        >
                          <div className="d-flex align-items-center gap-2 mb-1">
                            <i
                              className={`bi ${icon}`}
                              style={{ color, fontSize: 13 }}
                            ></i>
                            <small
                              className="text-muted"
                              style={{
                                fontSize: "0.68rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.4px",
                              }}
                            >
                              {label}
                            </small>
                          </div>
                          <span
                            className="fw-bold d-block"
                            style={{ color: "#1e1b4b", fontSize: "0.95rem" }}
                          >
                            {value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      borderTop: "2px dashed #ddd6fe",
                      marginBottom: 20,
                    }}
                  />

                  {/* Payment Method */}
                  <div className="mb-4">
                    <label
                      htmlFor="payment"
                      className="form-label fw-bold d-flex align-items-center gap-2 mb-2"
                      style={{ color: "#1e1b4b", fontSize: "0.875rem" }}
                    >
                      <span
                        className="d-inline-flex align-items-center justify-content-center rounded-2"
                        style={{ width: 26, height: 26, background: "#ede9fe" }}
                      >
                        <i
                          className="bi bi-credit-card-fill"
                          style={{ fontSize: 12, color: "#4f46e5" }}
                        ></i>
                      </span>
                      Payment Method
                    </label>
                    <select
                      onChange={(e) => setPayment(e.target.value)}
                      required
                      id="payment"
                      className="form-select"
                      style={{
                        border: "1.5px solid #ddd6fe",
                        borderRadius: 10,
                        color: "#1e1b4b",
                        fontSize: "0.9rem",
                        padding: "10px 14px",
                      }}
                    >
                      <option value="COD" selected >💵 Cash On Delivery</option>
                    </select>
                  </div>

                  {/* Place Order CTA */}
                  <button
                    onClick={handleSubmitOrder}
                    disabled={isLoading}
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
                    {isLoading ? "Placing Order..." : "Place Order"}
                  </button>

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
            ) : (
              <div
                className="card border-0 text-center"
                style={{
                  borderRadius: 16,
                  border: "1px solid #ede9fe",
                  boxShadow: "0 4px 20px rgba(79,70,229,0.08)",
                }}
              >
                <div className="card-body py-5 px-4">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{ width: 72, height: 72, background: "#f5f3ff" }}
                  >
                    <i
                      className="bi bi-cart-x"
                      style={{ fontSize: 30, color: "#7c3aed" }}
                    ></i>
                  </div>
                  <h6 className="fw-bold mb-1" style={{ color: "#1e1b4b" }}>
                    Cart is Empty
                  </h6>
                  <p className="text-muted small mb-3">No products in cart.</p>
                  <Link
                    to="/cart"
                    className="btn fw-semibold px-4 py-2 text-white"
                    style={{
                      background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                      border: "none",
                      borderRadius: 10,
                      fontSize: "0.85rem",
                    }}
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

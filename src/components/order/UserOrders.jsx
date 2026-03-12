import { Link } from "react-router-dom";
import { useEcommerce } from "../../context/EcommerceContext";
import Loading from "../Loading";

const UserOrders = ({ userOrders }) => {
  const { isLoadingOrders } = useEcommerce();

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "warning",
      completed: "success",
      failed: "danger",
      refunded: "info",
      confirmed: "primary",
      shipped: "info",
      delivered: "success",
      cancelled: "danger",
    };
    return statusColors[status] || "secondary";
  };

  return (
    <>
      <div
        className="container-fluid px-3 px-md-4 py-5"
        style={{
          background: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 100%)",
          minHeight: "100vh",
        }}
      >
        <Link
          to="user"
          className="btn mb-3 text-light"
          style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed" }}
        >
          Back to Profile
        </Link>
        {/* Page Header */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-3 text-white"
                style={{
                  width: 52,
                  height: 52,
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  flexShrink: 0,
                }}
              >
                <i className="bi bi-bag-check-fill fs-5"></i>
              </div>

              <div>
                <h1
                  className="fw-bold mb-0"
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                    color: "#1e1b4b",
                    letterSpacing: "-0.5px",
                  }}
                >
                  My Orders
                </h1>
                <p className="text-muted mb-0 small">
                  Track and manage your orders
                </p>
              </div>
            </div>
          </div>
        </div>

        {isLoadingOrders ? (
          <Loading />
        ) : (
          <div>
            {userOrders && userOrders.length > 0 ? (
              <div className="row g-4">
                {userOrders.map((order, index) => (
                  <div className="col-12" key={order._id || index}>
                    <div
                      className="card border-0 overflow-hidden"
                      style={{
                        borderRadius: 16,
                        boxShadow:
                          "0 4px 6px -1px rgba(79,70,229,0.07), 0 2px 4px -1px rgba(0,0,0,0.06)",
                        transition: "box-shadow 0.2s ease",
                      }}
                    >
                      {/* Card Header */}
                      <div
                        className="card-header border-0 px-4 py-3"
                        style={{
                          background:
                            "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                        }}
                      >
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
                          <div className="d-flex align-items-center gap-3">
                            <div
                              className="d-flex align-items-center justify-content-center rounded-circle bg-white"
                              style={{
                                width: 38,
                                height: 38,
                                opacity: 0.15,
                                position: "absolute",
                              }}
                            ></div>
                            <div>
                              <h5
                                className="mb-0 fw-bold text-white"
                                style={{ letterSpacing: "-0.3px" }}
                              >
                                Order #{index + 1}
                              </h5>
                              <small
                                className="text-white"
                                style={{ opacity: 0.8 }}
                              >
                                <i className="bi bi-calendar3 me-1"></i>
                                {new Date(order.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  },
                                )}
                              </small>
                            </div>
                          </div>
                          <div className="d-flex flex-wrap gap-2 align-items-center">
                            <span
                              className={`badge px-3 py-2 rounded-pill fw-semibold bg-${getStatusBadge(order.paymentStatus)}`}
                              style={{
                                fontSize: "0.75rem",
                                letterSpacing: "0.3px",
                              }}
                            >
                              <i className="bi bi-credit-card me-1"></i>
                              Payment: {order.paymentStatus}
                            </span>
                            <span
                              className="badge px-3 py-2 rounded-pill fw-semibold"
                              style={{
                                background: "rgba(255,255,255,0.2)",
                                color: "#fff",
                                fontSize: "0.75rem",
                              }}
                            >
                              <i className="bi bi-truck me-1"></i>
                              {order.orderStatus}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="card-body p-0">
                        <div className="row g-0">
                          {/* Products Table */}
                          <div className="col-12 col-lg-6 px-2 py-4 border-end-lg">
                            <h6
                              className="fw-bold mb-3 d-flex align-items-center gap-2"
                              style={{ color: "#4f46e5" }}
                            >
                              <span
                                className="d-inline-flex align-items-center justify-content-center rounded-2"
                                style={{
                                  width: 28,
                                  height: 28,
                                  background: "#ede9fe",
                                }}
                              >
                                <i
                                  className="bi bi-box-seam"
                                  style={{ fontSize: 13, color: "#4f46e5" }}
                                ></i>
                              </span>
                              Order Items
                              <span
                                className="badge rounded-pill ms-1"
                                style={{
                                  background: "#ede9fe",
                                  color: "#4f46e5",
                                  fontWeight: 600,
                                  fontSize: "0.7rem",
                                }}
                              >
                                {order.products.length}
                              </span>
                            </h6>

                            <div
                              className="table-responsive"
                              style={{
                                borderRadius: 10,
                                overflow: "hidden",
                                border: "1px solid #e8e4ff",
                              }}
                            >
                              <table
                                className="table table-hover align-middle mb-0"
                                style={{ fontSize: "0.875rem" }}
                              >
                                <thead style={{ background: "#f5f3ff" }}>
                                  <tr>
                                    <th
                                      className="py-2 px-3 fw-semibold"
                                      style={{
                                        color: "#4f46e5",
                                        borderBottom: "1px solid #e8e4ff",
                                      }}
                                    >
                                      Product
                                    </th>

                                    <th
                                      className="py-2 px-3 fw-semibold text-center"
                                      style={{
                                        color: "#4f46e5",
                                        borderBottom: "1px solid #e8e4ff",
                                      }}
                                    >
                                      Qty
                                    </th>
                                    <th
                                      className="py-2 px-3 fw-semibold text-end"
                                      style={{
                                        color: "#4f46e5",
                                        borderBottom: "1px solid #e8e4ff",
                                      }}
                                    >
                                      Price
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {order.products.map((product, pIndex) => (
                                    <tr
                                      key={pIndex}
                                      style={{
                                        borderBottom: "1px solid #f5f3ff",
                                      }}
                                    >
                                      <td className="py-2 px-3">
                                        <div className="d-flex align-items-center gap-2">
                                          <img
                                            src={product.images[0].url}
                                            alt={product.name}
                                            className="rounded-2 flex-shrink-0"
                                            style={{
                                              width: 52,
                                              height: 52,
                                              objectFit: "cover",
                                              border: "2px solid #ede9fe",
                                            }}
                                          />
                                          <div>
                                            <div
                                              className="fw-semibold"
                                              style={{
                                                color: "#1e1b4b",
                                                fontSize: "0.8rem",
                                                lineHeight: 1.3,
                                              }}
                                            >
                                              {product.name}
                                            </div>
                                            <small className="text-muted">
                                              {product.materialType}
                                            </small>
                                          </div>
                                        </div>
                                      </td>

                                      <td className="py-2 px-3 text-center">
                                        <span
                                          className="badge rounded-pill"
                                          style={{
                                            background: "#ede9fe",
                                            color: "#4f46e5",
                                            fontWeight: 600,
                                          }}
                                        >
                                          {product.quantity}
                                        </span>
                                      </td>
                                      <td className="py-2 px-3 text-end">
                                        <span
                                          className="fw-bold"
                                          style={{ color: "#4f46e5" }}
                                        >
                                          ₹{product.discountPrice.toFixed(2)}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* Order Summary */}
                          <div className="px-2 py-4">
                            <div
                              className="px-2 py-4 h-100 rounded-3"
                              style={{
                                background:
                                  "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
                                border: "1px solid #ddd6fe",
                              }}
                            >
                              <h6
                                className="fw-bold mb-3 d-flex align-items-center gap-2"
                                style={{ color: "#4f46e5" }}
                              >
                                <i className="bi bi-receipt"></i> Order Summary
                              </h6>

                              <div
                                className="d-flex justify-content-between align-items-center mb-2"
                                style={{ fontSize: "0.875rem" }}
                              >
                                <span className="text-muted">Total Items</span>
                                <span
                                  className="fw-semibold"
                                  style={{ color: "#1e1b4b" }}
                                >
                                  {order.summary.totalQuantity}
                                </span>
                              </div>

                              <div
                                className="d-flex justify-content-between align-items-center mb-2"
                                style={{ fontSize: "0.875rem" }}
                              >
                                <span className="text-muted">Subtotal</span>
                                <span style={{ color: "#1e1b4b" }}>
                                  ₹
                                  {(
                                    order.summary.totalPrice +
                                    order.summary.totalDiscount
                                  ).toFixed(2)}
                                </span>
                              </div>

                              <div
                                className="d-flex justify-content-between align-items-center mb-3"
                                style={{ fontSize: "0.875rem" }}
                              >
                                <span className="text-success fw-semibold">
                                  <i className="bi bi-tag me-1"></i>Discount
                                </span>
                                <span className="text-success fw-semibold">
                                  -₹{order.summary.totalDiscount.toFixed(2)}
                                </span>
                              </div>

                              <div
                                className="d-flex justify-content-between align-items-center pt-3"
                                style={{ borderTop: "2px dashed #c4b5fd" }}
                              >
                                <span
                                  className="fw-bold"
                                  style={{ color: "#1e1b4b" }}
                                >
                                  Total
                                </span>
                                <span
                                  className="fw-bold fs-5"
                                  style={{ color: "#4f46e5" }}
                                >
                                  ₹{order.summary.totalPrice.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="px-2 mb-4">
                            <Link
                              to={`${order.id}`}
                              className="btn btn-sm fw-semibold text-white d-block py-2"
                              style={{
                                background:
                                  "linear-gradient(135deg, #4f46e5, #7c3aed)",
                                border: "none",
                                borderRadius: 8,
                              }}
                            >
                              <i className="bi bi-eye me-2"></i>Order Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-5">
                  <div
                    className="card border-0 text-center py-5"
                    style={{
                      borderRadius: 20,
                      boxShadow: "0 4px 20px rgba(79,70,229,0.08)",
                    }}
                  >
                    <div className="card-body py-5">
                      <div
                        className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                        style={{ width: 80, height: 80, background: "#f5f3ff" }}
                      >
                        <i
                          className="bi bi-cart-x"
                          style={{ fontSize: 32, color: "#7c3aed" }}
                        ></i>
                      </div>
                      <h3 className="fw-bold mb-2" style={{ color: "#1e1b4b" }}>
                        No Orders Yet
                      </h3>
                      <p className="text-muted mb-4">
                        You haven't placed any orders. Start shopping to see
                        them here.
                      </p>
                      <Link
                        to="/products"
                        className="btn px-4 py-2 fw-semibold text-white"
                        style={{
                          background:
                            "linear-gradient(135deg, #4f46e5, #7c3aed)",
                          border: "none",
                          borderRadius: 10,
                        }}
                      >
                        <i className="bi bi-shop me-2"></i>Start Shopping
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UserOrders;

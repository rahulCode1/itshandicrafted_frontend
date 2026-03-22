import { Link, useSearchParams } from "react-router-dom";
import styles from "./Order.module.css";

const UserOrders = ({ userOrders }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  let filteredOrders = searchParams.get("status")
    ? userOrders.filter(
        (order) => order.orderStatus === searchParams.get("status"),
      )
    : userOrders;

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

  const filterBtns = [
    {
      name: "Delivered Orders",
      value: "delevered",
      class: " border-success ",
    },
    {
      name: "Pending Orders",
      value: "pending",
      class: " border-secondary ",
    },
    {
      name: "Canceled Orders",
      value: "cancelled",
      class: " border-danger",
    },
  ];

  console.log(userOrders);

  return (
    <>
      <div
        className="px-3 px-md-4 py-3 pb-5 mb-5 mb-md-2"
        style={{
          background: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 100%)",
          minHeight: "100vh",
        }}
      >
        {/* Back Button */}
        <Link
          to="/user"
          className="btn mb-4 text-white d-inline-flex align-items-center gap-2"
          style={{
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            borderRadius: 8,
            fontSize: "0.83rem",
            fontWeight: 500,
          }}
        >
          <i className="bi bi-arrow-left"></i> Back to Profile
        </Link>

        {/* Page Header */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <div
            className="d-flex align-items-center justify-content-center rounded-3 text-white flex-shrink-0"
            style={{
              width: "clamp(38px, 6vw, 52px)",
              height: "clamp(38px, 6vw, 52px)",
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              fontSize: "clamp(0.95rem, 2.5vw, 1.2rem)",
            }}
          >
            <i className="bi bi-bag-check-fill"></i>
          </div>
          <div>
            <h1
              className="fw-bold mb-0"
              style={{
                fontSize: "clamp(1.2rem, 4vw, 2rem)",
                color: "#1e1b4b",
                letterSpacing: "-0.5px",
              }}
            >
              My Orders{" "}
              <span style={{ color: "#7c3aed" }}>
                ({filteredOrders.length})
              </span>
            </h1>
            <p
              className="mb-0"
              style={{
                color: "#6b7280",
                fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
              }}
            >
              Track and manage your orders
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div
          className="mb-4 d-flex align-items-center gap-2"
          style={{
            overflowX: "auto",
            paddingBottom: 4,
            scrollbarWidth: "none",
          }}
        >
          <button
            onClick={() => setSearchParams("")}
            className="btn rounded-pill flex-shrink-0"
            style={{
              border: "1.5px solid #a5b4fc",
              background: "#fff",
              color: "#4f46e5",
              fontSize: "0.8rem",
              fontWeight: 500,
              padding: "5px 16px",
              whiteSpace: "nowrap",
            }}
          >
            All Orders
          </button>

          {filterBtns.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setSearchParams(`?status=${btn.value}`)}
              className="btn rounded-pill flex-shrink-0"
              style={{
                fontSize: "0.8rem",
                fontWeight: 500,
                padding: "5px 16px",
                whiteSpace: "nowrap",
                background: "#fff",
                border: `1.5px solid ${
                  btn.class.includes("success")
                    ? "#10b981"
                    : btn.class.includes("danger")
                      ? "#ef4444"
                      : "#9ca3af"
                }`,
                color: btn.class.includes("success")
                  ? "#065f46"
                  : btn.class.includes("danger")
                    ? "#991b1b"
                    : "#374151",
              }}
            >
              {btn.name}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders && filteredOrders.length > 0 ? (
          <div className="d-flex flex-column gap-4">
            {filteredOrders.map((order, index) => (
              <div
                key={order._id || index}
                className="card border-0 overflow-hidden"
                style={{
                  borderRadius: 16,
                  boxShadow:
                    "0 4px 14px -2px rgba(79,70,229,0.09), 0 2px 6px -1px rgba(0,0,0,0.05)",
                  transition: "box-shadow 0.2s ease",
                }}
              >
                {/* Card Header */}
                <div
                  className="card-header border-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                    padding: "clamp(10px, 2vw, 16px) clamp(14px, 3vw, 22px)",
                  }}
                >
                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
                    <div>
                      <div
                        className="fw-bold text-white"
                        style={{
                          fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
                          letterSpacing: "-0.3px",
                        }}
                      >
                        Order #{index + 1}
                      </div>
                      <small
                        className="text-white"
                        style={{
                          opacity: 0.82,
                          fontSize: "clamp(0.68rem, 1.8vw, 0.78rem)",
                        }}
                      >
                        <i className="bi bi-calendar3 me-1"></i>
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </small>
                    </div>
                    <div className="d-flex flex-wrap gap-2 align-items-center">
                      <span
                        className={`badge px-3 py-2 rounded-pill fw-semibold bg-${getStatusBadge(order.paymentStatus)}`}
                        style={{ fontSize: "clamp(0.62rem, 1.8vw, 0.74rem)" }}
                      >
                        <i className="bi bi-credit-card me-1"></i>Payment:{" "}
                        {order.paymentStatus}
                      </span>
                      <span
                        className="badge px-3 py-2 rounded-pill fw-semibold"
                        style={{
                          background: "rgba(255,255,255,0.2)",
                          color: "#fff",
                          fontSize: "clamp(0.62rem, 1.8vw, 0.74rem)",
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
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                    }}
                    className={styles.orderBodyGrid}
                  >
                    {/* Products Table */}
                    <div
                      style={{
                        padding:
                          "clamp(14px, 2.5vw, 22px) clamp(12px, 3vw, 22px)",
                      }}
                    >
                      <h6
                        className="fw-bold mb-3 d-flex align-items-center gap-2"
                        style={{
                          color: "#4f46e5",
                          fontSize: "clamp(0.78rem, 2vw, 0.88rem)",
                        }}
                      >
                        <span
                          className="d-inline-flex align-items-center justify-content-center rounded-2"
                          style={{
                            width: 24,
                            height: 24,
                            background: "#ede9fe",
                          }}
                        >
                          <i
                            className="bi bi-box-seam"
                            style={{ fontSize: 11, color: "#4f46e5" }}
                          ></i>
                        </span>
                        Order Items
                        <span
                          className="badge rounded-pill ms-1"
                          style={{
                            background: "#ede9fe",
                            color: "#4f46e5",
                            fontWeight: 600,
                            fontSize: "0.68rem",
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
                          className="table align-middle mb-0"
                          style={{
                            fontSize: "clamp(0.72rem, 1.8vw, 0.855rem)",
                          }}
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
                                style={{ borderBottom: "1px solid #f5f3ff" }}
                              >
                                <td className="py-2 px-3">
                                  <div className="d-flex align-items-center gap-2">
                                    <img
                                      src={product.images[0].url}
                                      alt={product.name}
                                      className="rounded-2 flex-shrink-0"
                                      style={{
                                        width: "clamp(36px, 5vw, 48px)",
                                        height: "clamp(36px, 5vw, 48px)",
                                        objectFit: "cover",
                                        border: "2px solid #ede9fe",
                                      }}
                                    />

                                    <div>
                                      <div
                                        className="fw-semibold"
                                        style={{
                                          color: "#1e1b4b",
                                          fontSize:
                                            "clamp(0.7rem, 1.7vw, 0.8rem)",
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
                                <td
                                  className="py-2 px-3 text-end fw-bold"
                                  style={{ color: "#4f46e5" }}
                                >
                                  ₹{product.discountPrice.toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Summary + CTA */}
                    <div
                      style={{
                        padding:
                          "clamp(14px, 2.5vw, 22px) clamp(12px, 3vw, 22px)",
                        borderTop: "1px solid #f0ebff",
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                      }}
                      className={styles.orderSummaryCol}
                    >
                      {/* Summary Box */}
                      <div
                        className="rounded-3"
                        style={{
                          background:
                            "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)",
                          border: "1px solid #ddd6fe",
                          padding: "clamp(12px, 2.5vw, 18px)",
                          flex: 1,
                        }}
                      >
                        <h6
                          className="fw-bold mb-3 d-flex align-items-center gap-2"
                          style={{
                            color: "#4f46e5",
                            fontSize: "clamp(0.78rem, 2vw, 0.88rem)",
                          }}
                        >
                          <i className="bi bi-receipt"></i> Order Summary
                        </h6>

                        <div
                          className="d-flex justify-content-between align-items-center mb-2"
                          style={{
                            fontSize: "clamp(0.75rem, 1.8vw, 0.855rem)",
                          }}
                        >
                          <span className="text-muted">Total Items</span>
                          <span
                            className="fw-semibold"
                            style={{ color: "#1e1b4b" }}
                          >
                            {order.summary.totalQuantity}
                          </span>
                        </div>

                        <div>
                          <p>
                            Delivery Charge:{" "}
                            {order.paymentMethod === "COD" ? 60 : 0}
                          </p>
                        </div>

                        <div
                          className="d-flex justify-content-between align-items-center pt-2"
                          style={{ borderTop: "2px dashed #c4b5fd" }}
                        >
                          <span
                            className="fw-bold"
                            style={{
                              color: "#1e1b4b",
                              fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                            }}
                          >
                            Total
                          </span>
                          <span
                            className="fw-bold"
                            style={{
                              color: "#4f46e5",
                              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                            }}
                          >
                            ₹
                            {order.paymentMethod === "COD"
                              ? (order.summary.totalPrice + Number(60)).toFixed(
                                  2,
                                )
                              : order.summary.totalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* View Details CTA */}
                      <Link
                        to={`${order.id}`}
                        className="btn fw-semibold text-white d-flex align-items-center justify-content-center gap-2"
                        style={{
                          background:
                            "linear-gradient(135deg, #4f46e5, #7c3aed)",
                          border: "none",
                          borderRadius: 8,
                          padding: "9px 16px",
                          fontSize: "clamp(0.75rem, 1.8vw, 0.83rem)",
                        }}
                      >
                        <i className="bi bi-eye"></i> Order Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div
            className="d-flex flex-column align-items-center justify-content-center text-center"
            style={{ padding: "clamp(40px, 8vw, 80px) 20px" }}
          >
            <div
              className="d-flex align-items-center justify-content-center rounded-circle mb-4"
              style={{
                width: "clamp(64px, 10vw, 88px)",
                height: "clamp(64px, 10vw, 88px)",
                background: "#f5f3ff",
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                color: "#7c3aed",
              }}
            >
              <i className="bi bi-cart-x"></i>
            </div>
            <h3
              className="fw-bold mb-2"
              style={{
                color: "#1e1b4b",
                fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
              }}
            >
              No Orders Yet
            </h3>
            <p
              className="text-muted mb-4"
              style={{
                maxWidth: 340,
                fontSize: "clamp(0.82rem, 2vw, 0.95rem)",
              }}
            >
              You haven't placed any orders. Start shopping to see them here.
            </p>
            <Link
              to="/products"
              className="btn px-4 py-2 fw-semibold text-white d-inline-flex align-items-center gap-2"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                border: "none",
                borderRadius: 10,
              }}
            >
              <i className="bi bi-shop"></i> Start Shopping
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default UserOrders;

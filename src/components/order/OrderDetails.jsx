import { useRevalidator, Link } from "react-router-dom";
import { useEcommerce } from "../../context/EcommerceContext";

const OrderDetails = ({ order }) => {
  const { isLoading, handleCancelOrder } = useEcommerce();

  const transformedOrder = order.products.map((product) => ({
    ...product.product,
    quantity: product.quantity,
  }));

  const revalidator = useRevalidator();

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
        className="container-fluid px-3 px-md-4 py-3"
        style={{
          background: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 100%)",
          minHeight: "100vh",
          marginBottom: "5em",
        }}
      >
        <Link
          to=".."
          className="btn mb-3 text-light"
          style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed" }}
        >
          Back to All Orders
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
                <i className="bi bi-receipt-cutoff fs-5"></i>
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
                  Order Details
                </h1>
                <p className="text-muted mb-0 small">
                  Track and manage your order
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* ── Card wrapper ── */}
          <div className="col-12">
            <div
              className="card border-0 overflow-hidden"
              style={{
                borderRadius: 16,
                boxShadow:
                  "0 4px 6px -1px rgba(79,70,229,0.07), 0 2px 4px -1px rgba(0,0,0,0.06)",
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
                  <small className="text-white" style={{ opacity: 0.85 }}>
                    <i className="bi bi-calendar3 me-1"></i>
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </small>
                  <div className="d-flex flex-wrap gap-2 align-items-center">
                    <span
                      className={`badge px-3 py-2 rounded-pill fw-semibold bg-${getStatusBadge(order.paymentStatus)}`}
                      style={{ fontSize: "0.75rem", letterSpacing: "0.3px" }}
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
              <div className="card-body p-4">
                <div className="row g-4">
                  {/* ── Products Table ── */}
                  <div className="col-12">
                    <h6
                      className="fw-bold mb-3 d-flex align-items-center gap-2"
                      style={{ color: "#4f46e5" }}
                    >
                      <span
                        className="d-inline-flex align-items-center justify-content-center rounded-2"
                        style={{ width: 28, height: 28, background: "#ede9fe" }}
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
                          {transformedOrder.map((product, pIndex) => (
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

                  {/* ── Bottom 3-col grid: Summary | Placed By | Address ── */}
                  <div className="col-12 col-md-6 col-xl-4">
                    <div className="card border rounded-3 h-100">
                      <div className="card-header bg-white border-bottom px-3 py-2 d-flex align-items-center gap-2">
                        <i
                          className="bi bi-receipt text-primary"
                          style={{ fontSize: 14 }}
                        ></i>
                        <span
                          className="fw-semibold text-dark"
                          style={{ fontSize: "0.88rem" }}
                        >
                          Order Summary
                        </span>
                      </div>

                      <div className="card-body p-3 d-flex flex-column gap-2">
                        {/* Total Items */}
                        <div
                          className="d-flex justify-content-between align-items-center py-1 border-bottom"
                          style={{ fontSize: "0.85rem" }}
                        >
                          <span className="text-muted d-flex align-items-center gap-2">
                            <i
                              className="bi bi-stack text-primary"
                              style={{ fontSize: 13 }}
                            ></i>
                            Total Items
                          </span>
                          <span className="fw-semibold text-dark">
                            {order.summary.totalQuantity}
                          </span>
                        </div>

                        {/* MRP */}
                        <div
                          className="d-flex justify-content-between align-items-center py-1 border-bottom"
                          style={{ fontSize: "0.85rem" }}
                        >
                          <span className="text-muted d-flex align-items-center gap-2">
                            <i
                              className="bi bi-tag text-primary"
                              style={{ fontSize: 13 }}
                            ></i>
                            MRP
                          </span>
                          <span className="fw-semibold text-dark">
                            ₹
                            {order.summary.totalPrice +
                              (order.summary.totalDiscount || 0)}
                          </span>
                        </div>

                        {/* Discount */}
                        {order.summary.totalDiscount > 0 && (
                          <div
                            className="d-flex justify-content-between align-items-center py-1 border-bottom"
                            style={{ fontSize: "0.85rem" }}
                          >
                            <span className="text-muted d-flex align-items-center gap-2">
                              <i
                                className="bi bi-percent text-success"
                                style={{ fontSize: 13 }}
                              ></i>
                              Discount
                            </span>
                            <span className="fw-semibold text-success">
                              − ₹{order.summary.totalDiscount}
                            </span>
                          </div>
                        )}

                        {/* Delivery */}
                        <div
                          className="d-flex justify-content-between align-items-center py-1 border-bottom"
                          style={{ fontSize: "0.85rem" }}
                        >
                          <span className="text-muted d-flex align-items-center gap-2">
                            <i
                              className="bi bi-truck text-primary"
                              style={{ fontSize: 13 }}
                            ></i>
                            Delivery
                          </span>
                          {order.paymentMethod === "COD" ? (
                            <span className="fw-semibold text-warning">
                              + ₹60
                            </span>
                          ) : (
                            <span className="fw-semibold text-success">
                              FREE
                            </span>
                          )}
                        </div>

                        {/* Total */}
                        <div
                          className="d-flex justify-content-between align-items-center mt-auto pt-2"
                          style={{ borderTop: "2px dashed #dee2e6" }}
                        >
                          {order.paymentMethod === "COD" ? (
                            <span className="fw-bold text-dark">
                              Total Payable
                            </span>
                          ) : (
                            <span className="fw-bold text-dark">
                              Paied amount
                            </span>
                          )}
                          <span className="fw-bold text-primary fs-5">
                            ₹
                            {order.paymentMethod === "COD"
                              ? order.summary.totalPrice + 60
                              : order.summary.totalPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6 col-xl-4">
                    {/* Placed By */}
                    <div
                      className="p-4 rounded-3 h-100"
                      style={{
                        background: "#fff",
                        border: "1px solid #e8e4ff",
                      }}
                    >
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
                            className="bi bi-person-fill"
                            style={{ fontSize: 13, color: "#4f46e5" }}
                          ></i>
                        </span>
                        Placed By
                      </h6>

                      <div className="d-flex align-items-center gap-2 mb-3">
                        <div
                          className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                          style={{
                            width: 40,
                            height: 40,
                            background: "#ede9fe",
                          }}
                        >
                          <i
                            className="bi bi-person"
                            style={{ color: "#4f46e5" }}
                          ></i>
                        </div>
                        <div>
                          <div
                            className="fw-semibold"
                            style={{ color: "#1e1b4b", fontSize: "0.9rem" }}
                          >
                            {order.orderPlacedBy.name}
                          </div>
                          <small className="text-muted">Customer</small>
                        </div>
                      </div>

                      <div
                        className="d-flex align-items-center gap-2 p-2 rounded-2"
                        style={{ background: "#f5f3ff", fontSize: "0.875rem" }}
                      >
                        <i
                          className="bi bi-telephone-fill"
                          style={{ color: "#4f46e5" }}
                        ></i>
                        <span style={{ color: "#1e1b4b" }}>
                          {order.orderPlacedBy.phoneNumber}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-xl-4">
                    {/* Delivery Address */}
                    <div
                      className="p-4 rounded-3 h-100"
                      style={{
                        background: "#fff",
                        border: "1px solid #e8e4ff",
                      }}
                    >
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
                            className="bi bi-geo-alt-fill"
                            style={{ fontSize: 13, color: "#4f46e5" }}
                          ></i>
                        </span>
                        Delivery Address
                      </h6>

                      <div
                        className="d-flex flex-column gap-2"
                        style={{ fontSize: "0.875rem" }}
                      >
                        <div className="d-flex align-items-start gap-2">
                          <i
                            className="bi bi-map mt-1 flex-shrink-0"
                            style={{ color: "#7c3aed" }}
                          ></i>
                          <span style={{ color: "#374151" }}>
                            <span className="text-muted me-1">Area:</span>
                            {order.address.area}
                          </span>
                        </div>
                        <div className="d-flex align-items-start gap-2">
                          <i
                            className="bi bi-building mt-1 flex-shrink-0"
                            style={{ color: "#7c3aed" }}
                          ></i>
                          <span style={{ color: "#374151" }}>
                            <span className="text-muted me-1">City:</span>
                            {order.address.city}
                          </span>
                        </div>
                        <div className="d-flex align-items-start gap-2">
                          <i
                            className="bi bi-house mt-1 flex-shrink-0"
                            style={{ color: "#7c3aed" }}
                          ></i>
                          <span style={{ color: "#374151" }}>
                            <span className="text-muted me-1">Address:</span>
                            {order.address.fullAddress}
                          </span>
                        </div>
                        <div className="d-flex align-items-start gap-2">
                          <i
                            className="bi bi-telephone mt-1 flex-shrink-0"
                            style={{ color: "#7c3aed" }}
                          ></i>
                          <span style={{ color: "#374151" }}>
                            <span className="text-muted me-1">Phone:</span>
                            {order.address.phoneNumber}
                          </span>
                        </div>
                        <div className="d-flex align-items-start gap-2">
                          <i
                            className="bi bi-flag mt-1 flex-shrink-0"
                            style={{ color: "#7c3aed" }}
                          ></i>
                          <span style={{ color: "#374151" }}>
                            <span className="text-muted me-1">State:</span>
                            {order.address.state}
                          </span>
                        </div>
                        <div className="d-flex align-items-start gap-2">
                          <i
                            className="bi bi-mailbox mt-1 flex-shrink-0"
                            style={{ color: "#7c3aed" }}
                          ></i>
                          <span style={{ color: "#374151" }}>
                            <span className="text-muted me-1">ZIP:</span>
                            {order.address.zipCode}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── Cancel Button ── */}
                  <div className="col-12">
                    <div
                      className="p-3 rounded-3 d-flex align-items-center justify-content-between flex-wrap gap-3"
                      style={{
                        background: "#fff7f7",
                        border: "1px solid #fee2e2",
                      }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <i
                          className="bi bi-info-circle"
                          style={{ color: "#ef4444" }}
                        ></i>
                        <small className="text-muted">
                          {order.orderStatus === "cancelled"
                            ? "Order calcelled successfully."
                            : order.orderStatus === "delevered"
                              ? "Order delereved already"
                              : "Cancellation is only available for eligible orders."}
                        </small>
                      </div>
                      <button
                        disabled={
                          order.orderStatus === "delivered" ||
                          order.orderStatus === "cancelled" ||
                          isLoading
                        }
                        onClick={() => handleCancelOrder(order.id, revalidator)}
                        className="btn btn-sm fw-semibold px-4"
                        style={{
                          border: "1.5px solid #ef4444",
                          color: "#ef4444",
                          borderRadius: 8,
                          background: "transparent",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {order.orderStatus === "cancelled"
                          ? "Cancelled"
                          : isLoading
                            ? "Canceling..."
                            : "Cancel Order"}
                        {isLoading && (
                          <span className="spinner-border spinner-border-sm ms-2"></span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;

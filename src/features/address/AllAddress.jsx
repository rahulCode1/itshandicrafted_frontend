import { Link } from "react-router-dom";
import { useEcommerce } from "../../context/EcommerceContext";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Loading from "../../components/Loading";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserAddressAsync,
  removeUserAddressAsync,
  clearError,
} from "../../features/address/addressSlice";
import ErrorModal from "../../components/ErrorModal";

const AllAddress = () => {
  const [addressId, setAddressId] = useState(null);
  const { handleSelectDefaultAddress } = useEcommerce();
  const { address, fetchUserAddressLoading, removeAddressLoading, error } =
    useSelector((state) => state.address);
  const dispatch = useDispatch();

  const removeAddress = async (addressId) => {
    const toastId = toast.loading("Address remove...");
    setAddressId(addressId);
    try {
      await dispatch(removeUserAddressAsync(addressId)).unwrap();
      toast.success("Address removed successfully.", { id: toastId });
    } catch (error) {
      toast.error(error || "Failed to remove address.", { id: toastId });
    }
  };

  useEffect(() => {
    dispatch(fetchUserAddressAsync());
  }, [dispatch]);
  return (
    <>
      {fetchUserAddressLoading === "loading" ? (
        <Loading />
      ) : (
        <div
          className="min-vh-100 py-4 py-md-5"
          style={{
            background:
              "linear-gradient(160deg, #f0f4ff 0%, #fafafa 60%, #f5f3ff 100%)",
            marginBottom: "5em",
          }}
        >
          <div className="container">
            {error && (
              <ErrorModal
                message={error}
                onClose={() => dispatch(clearError())}
              />
            )}

            {/* ── Top nav bar ── */}
            <div className="d-flex align-items-center justify-content-between mb-4">
              <Link
                to="/user"
                className="btn fw-semibold rounded-3 d-flex align-items-center gap-2"
                style={{
                  border: "1.5px solid #ddd6fe",
                  color: "#4f46e5",
                  background: "#f5f3ff",
                  fontSize: "0.85rem",
                  padding: "8px 16px",
                }}
              >
                <i className="bi bi-arrow-left"></i>
                <span className="d-none d-sm-inline">Back to Profile</span>
                <span className="d-sm-none">Back</span>
              </Link>

              <Link
                to="addAddress"
                state={{ from: "/address" }}
                className="btn fw-semibold rounded-3 d-flex align-items-center gap-2 text-white"
                style={{
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  border: "none",
                  fontSize: "0.85rem",
                  padding: "8px 16px",
                  boxShadow: "0 2px 10px rgba(79,70,229,0.25)",
                }}
              >
                <i className="bi bi-plus-circle-fill"></i>
                <span className="d-none d-sm-inline">Add Address</span>
                <span className="d-sm-none">Add</span>
              </Link>
            </div>

            {/* ── Page Header ── */}
            <div className="d-flex align-items-center gap-3 mb-4 mb-md-5">
              <div
                className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                style={{
                  width: 48,
                  height: 48,
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  boxShadow: "0 4px 14px rgba(79,70,229,0.28)",
                }}
              >
                <i className="bi bi-geo-alt-fill text-white fs-5"></i>
              </div>
              <div>
                <h4
                  className="fw-bold mb-0 d-flex align-items-center gap-2"
                  style={{ color: "#1e1b4b", letterSpacing: "-0.4px" }}
                >
                  Delivery Addresses
                  <span
                    className="fw-semibold"
                    style={{ color: "#7c3aed", fontSize: "1rem" }}
                  >
                    ({address?.length || 0})
                  </span>
                </h4>
                <span className="text-muted" style={{ fontSize: "0.83rem" }}>
                  Manage your shipping addresses
                </span>
              </div>
            </div>

            {/* ── Address Grid ── */}
            {address && address.length > 0 ? (
              <div className="row row-cols-1 row-cols-md-2 row-cols-xl-2 g-3 g-md-4">
                {address.map((userAdd) => (
                  <div className="col" key={userAdd.id}>
                    <div
                      className="card border-0 h-100 position-relative overflow-hidden rounded-4"
                      style={{
                        boxShadow: userAdd.isDefault
                          ? "0 6px 24px rgba(79,70,229,0.14)"
                          : "0 2px 10px rgba(79,70,229,0.07)",
                        border: userAdd.isDefault
                          ? "1.5px solid #a5b4fc"
                          : "1px solid #ede9fe",
                      }}
                    >
                      {/* Top accent bar */}
                      <div
                        style={{
                          height: 4,
                          background: userAdd.isDefault
                            ? "linear-gradient(90deg, #4f46e5, #7c3aed, #a855f7)"
                            : "#ede9fe",
                        }}
                      />

                      {/* Default ribbon */}
                      {userAdd.isDefault && (
                        <div
                          className="position-absolute text-white px-3 py-1 fw-semibold"
                          style={{
                            background:
                              "linear-gradient(135deg, #10b981, #059669)",
                            top: 18,
                            right: -28,
                            transform: "rotate(45deg)",
                            width: 110,
                            textAlign: "center",
                            fontSize: "0.6rem",
                            letterSpacing: "0.5px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          }}
                        >
                          ✓ DEFAULT
                        </div>
                      )}

                      <div className="card-body p-3 p-md-4">
                        {/* Name + Set Default */}
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div className="d-flex align-items-center gap-2">
                            <div
                              className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                              style={{
                                width: 36,
                                height: 36,
                                background: "#ede9fe",
                              }}
                            >
                              <i
                                className="bi bi-person-fill"
                                style={{ color: "#4f46e5", fontSize: 15 }}
                              ></i>
                            </div>
                            <div>
                              <h6
                                className="mb-0 fw-bold"
                                style={{ color: "#1e1b4b" }}
                              >
                                {userAdd.name}
                              </h6>
                              <span
                                className="badge rounded-pill"
                                style={{
                                  background: "#f5f3ff",
                                  color: "#4f46e5",
                                  fontSize: "0.62rem",
                                  fontWeight: 600,
                                  border: "1px solid #ddd6fe",
                                }}
                              >
                                <i className="bi bi-truck me-1"></i>Shipping
                              </span>
                            </div>
                          </div>

                          {!userAdd.isDefault && (
                            <button
                              onClick={() =>
                                handleSelectDefaultAddress(userAdd.id)
                              }
                              className="btn btn-sm fw-semibold rounded-3 flex-shrink-0"
                              style={{
                                border: "1.5px solid #10b981",
                                color: "#10b981",
                                fontSize: "0.72rem",
                                background: "#f0fdf4",
                                whiteSpace: "nowrap",
                              }}
                            >
                              <i className="bi bi-check2-circle me-1"></i>Set
                              Default
                            </button>
                          )}
                        </div>

                        {/* Phone */}
                        <div
                          className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 mb-3"
                          style={{
                            background: "#f5f3ff",
                            border: "1px solid #ede9fe",
                          }}
                        >
                          <i
                            className="bi bi-telephone-fill"
                            style={{ color: "#4f46e5", fontSize: 12 }}
                          ></i>
                          <span className="text-muted small">
                            {userAdd.phoneNumber}
                          </span>
                        </div>

                        {/* ZIP / City / State chips */}
                        <div className="row g-2 mb-3">
                          {[
                            { label: "ZIP", value: userAdd.zipCode },
                            { label: "City", value: userAdd.city },
                            { label: "State", value: userAdd.state },
                          ].map(({ label, value }) => (
                            <div className="col-4" key={label}>
                              <div
                                className="p-2 rounded-3 text-center"
                                style={{
                                  background: "#f5f3ff",
                                  border: "1px solid #ede9fe",
                                }}
                              >
                                <small
                                  className="text-muted d-block mb-1"
                                  style={{
                                    fontSize: "0.6rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                  }}
                                >
                                  {label}
                                </small>
                                <span
                                  className="fw-bold d-block text-truncate"
                                  style={{
                                    color: "#1e1b4b",
                                    fontSize: "0.78rem",
                                  }}
                                >
                                  {value}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Full Address */}
                        <div
                          className="d-flex align-items-start gap-2 p-3 rounded-3 mb-4"
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

                        {/* Edit / Delete */}
                        <div className="row g-2">
                          <div className="col-6">
                            <Link
                              to={`${userAdd.id}`}
                              state={{ from: "/user" }}
                              className="btn btn-sm w-100 fw-semibold rounded-3 d-flex align-items-center justify-content-center gap-1"
                              style={{
                                border: "1.5px solid #4f46e5",
                                color: "#4f46e5",
                                background: "#f5f3ff",
                                fontSize: "0.82rem",
                              }}
                            >
                              <i
                                className="bi bi-pencil-fill"
                                style={{ fontSize: 11 }}
                              ></i>
                              Edit
                            </Link>
                          </div>
                          <div className="col-6">
                            <button
                              onClick={() => removeAddress(userAdd.id)}
                              disabled={removeAddressLoading === "loading"}
                              className="btn btn-sm w-100 fw-semibold rounded-3 d-flex align-items-center justify-content-center gap-1"
                              style={{
                                border: "1.5px solid #ef4444",
                                color: "#ef4444",
                                background: "#fff1f2",
                                fontSize: "0.82rem",
                              }}
                            >
                              {removeAddressLoading === "loading" &&
                              addressId === userAdd.id ? (
                                <>
                                  Deleting…{" "}
                                  <span className="spinner-border spinner-border-sm"></span>
                                </>
                              ) : (
                                <>
                                  <i
                                    className="bi bi-trash3-fill"
                                    style={{ fontSize: 11 }}
                                  ></i>
                                  Delete
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* ── Empty State ── */
              <div
                className="card border-0 text-center rounded-4"
                style={{
                  boxShadow: "0 4px 20px rgba(79,70,229,0.08)",
                  border: "1px solid #ede9fe",
                }}
              >
                <div className="card-body py-5 px-4">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                    style={{ width: 88, height: 88, background: "#f5f3ff" }}
                  >
                    <i
                      className="bi bi-geo-alt"
                      style={{ fontSize: 36, color: "#7c3aed" }}
                    ></i>
                  </div>
                  <h5 className="fw-bold mb-2" style={{ color: "#1e1b4b" }}>
                    No Addresses Yet
                  </h5>
                  <p className="text-muted mb-4 small">
                    Add your first delivery address to start shopping
                  </p>
                  <Link
                    to="addAddress"
                    className="btn fw-semibold px-4 py-2 text-white rounded-3"
                    style={{
                      background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                      border: "none",
                      fontSize: "0.9rem",
                      boxShadow: "0 2px 10px rgba(79,70,229,0.25)",
                    }}
                  >
                    <i className="bi bi-plus-circle-fill me-2"></i>
                    Add Your First Address
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AllAddress;

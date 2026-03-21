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
  const {
    address,
    fetchUserAddressLoading,
    removeAddressLoading,
    error,
    setDefaultAddressLoading,
  } = useSelector((state) => state.address);
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

  const selectDefaultAddress = async (addressId) => {
    setAddressId(addressId);
    handleSelectDefaultAddress(addressId);
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
          style={{ background: "var(--bs-light)", marginBottom: "5em" }}
        >
          <div className="container-lg px-3 px-md-4">
            {error && (
              <ErrorModal
                message={error}
                onClose={() => dispatch(clearError())}
              />
            )}

            {/* ── Top Nav ── */}
            <div className="d-flex align-items-center justify-content-between mb-4 gap-2">
              <Link
                to="/user"
                className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2 rounded-3 fw-semibold"
              >
                <i className="bi bi-arrow-left"></i>
                <span className="d-none d-sm-inline">Back to Profile</span>
                <span className="d-sm-none">Back</span>
              </Link>

              <Link
                to="addAddress"
                state={{ from: "/address" }}
                className="btn btn-primary btn-sm d-flex align-items-center gap-2 rounded-3 fw-semibold"
              >
                <i className="bi bi-plus-circle-fill"></i>
                <span className="d-none d-sm-inline">Add Address</span>
                <span className="d-sm-none">Add</span>
              </Link>
            </div>

            {/* ── Page Header ── */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <div
                className="d-flex align-items-center justify-content-center rounded-3 bg-primary flex-shrink-0"
                style={{ width: 44, height: 44 }}
              >
                <i className="bi bi-geo-alt-fill text-white fs-5"></i>
              </div>
              <div>
                <h5 className="fw-bold mb-0 text-dark">
                  Delivery Addresses{" "}
                  <span className="text-primary fw-semibold fs-6">
                    ({address?.length || 0})
                  </span>
                </h5>
                <small className="text-muted">
                  Manage your shipping addresses
                </small>
              </div>
            </div>

            {/* ── Address Grid ── */}
            {address && address.length > 0 ? (
              <div className="row g-3 g-md-4 row-cols-1 row-cols-md-2">
                {address.map((userAdd) => (
                  <div className="col" key={userAdd.id}>
                    <div
                      className="card h-100 rounded-4 overflow-hidden"
                      style={{
                        border: userAdd.isDefault
                          ? "2px solid #4f46e5"
                          : "1px solid #e5e7eb",
                        boxShadow: userAdd.isDefault
                          ? "0 0 0 4px rgba(79,70,229,0.08)"
                          : "none",
                      }}
                    >
                      {/* ── Default banner — full width, hard to miss ── */}
                      {userAdd.isDefault ? (
                        <div
                          className="d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold"
                          style={{
                            background: "#4f46e5",
                            color: "#fff",
                            fontSize: "0.78rem",
                            letterSpacing: "0.03em",
                          }}
                        >
                          <i
                            className="bi bi-patch-check-fill"
                            style={{ fontSize: 13 }}
                          ></i>
                          Default Delivery Address
                        </div>
                      ) : (
                        <div style={{ height: 3, background: "#e5e7eb" }} />
                      )}

                      <div className="card-body p-3 p-md-4">
                        {/* Name row */}
                        <div className="d-flex align-items-start justify-content-between gap-2 mb-3">
                          <div className="d-flex align-items-center gap-2 min-w-0">
                            <div
                              className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                              style={{
                                width: 38,
                                height: 38,
                                background: userAdd.isDefault
                                  ? "#ede9fe"
                                  : "#f3f4f6",
                              }}
                            >
                              <i
                                className="bi bi-person-fill"
                                style={{
                                  fontSize: 15,
                                  color: userAdd.isDefault
                                    ? "#4f46e5"
                                    : "#6b7280",
                                }}
                              ></i>
                            </div>
                            <div className="min-w-0">
                              <p
                                className="fw-bold mb-0 text-truncate text-dark"
                                style={{ fontSize: "0.95rem" }}
                              >
                                {userAdd.name}
                              </p>
                              <span
                                className="badge rounded-pill"
                                style={{
                                  fontSize: "0.65rem",
                                  background: "#f0f4ff",
                                  color: "#4f46e5",
                                  border: "1px solid #ddd6fe",
                                }}
                              >
                                <i className="bi bi-truck me-1"></i>Shipping
                              </span>
                            </div>
                          </div>

                          {!userAdd.isDefault && (
                            <button
                              onClick={() => selectDefaultAddress(userAdd.id)}
                              className="btn btn-outline-success btn-sm rounded-3 flex-shrink-0 fw-semibold"
                              style={{
                                fontSize: "0.72rem",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {userAdd.id === addressId &&
                              setDefaultAddressLoading === "loading" ? (
                                <>
                                  Setting…{" "}
                                  <span className="spinner-border spinner-border-sm ms-1"></span>
                                </>
                              ) : (
                                "Set default"
                              )}
                            </button>
                          )}
                        </div>

                        {/* Phone */}
                        <div className="d-flex align-items-center gap-2 px-3 py-2 rounded-3 mb-3 bg-light border">
                          <i
                            className="bi bi-telephone-fill text-primary"
                            style={{ fontSize: 12 }}
                          ></i>
                          <span className="text-muted small">
                            {userAdd.phoneNumber}
                          </span>
                        </div>

                        {/* ZIP / City / State */}
                        <div className="row g-2 mb-3">
                          {[
                            { label: "ZIP", value: userAdd.zipCode },
                            { label: "City", value: userAdd.city },
                            { label: "State", value: userAdd.state },
                          ].map(({ label, value }) => (
                            <div className="col-4" key={label}>
                              <div className="bg-light border rounded-3 p-2 text-center">
                                <small
                                  className="text-muted d-block"
                                  style={{
                                    fontSize: "0.62rem",
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

                        {/* Full Address */}
                        <div
                          className="d-flex align-items-start gap-2 p-3 rounded-3 mb-4 border"
                          style={{
                            borderStyle: "dashed",
                            background: "#fafafa",
                          }}
                        >
                          <i
                            className="bi bi-geo-alt-fill text-primary mt-1 flex-shrink-0"
                            style={{ fontSize: 13 }}
                          ></i>
                          <p
                            className="mb-0 small text-muted"
                            style={{ lineHeight: 1.6 }}
                          >
                            {userAdd.fullAddress}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="row g-2">
                          <div className="col-6">
                            <Link
                              to={`${userAdd.id}`}
                              state={{ from: "/user" }}
                              className="btn btn-outline-primary btn-sm w-100 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-1"
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
                              className="btn btn-outline-danger btn-sm w-100 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-1"
                            >
                              {removeAddressLoading === "loading" &&
                              addressId === userAdd.id ? (
                                <>
                                  Deleting…{" "}
                                  <span className="spinner-border spinner-border-sm ms-1"></span>
                                </>
                              ) : (
                                <>
                                  <i
                                    className="bi bi-trash3-fill"
                                    style={{ fontSize: 11 }}
                                  ></i>{" "}
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
              <div className="card border-0 text-center rounded-4 shadow-sm">
                <div className="card-body py-5 px-4">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 mb-4"
                    style={{ width: 80, height: 80 }}
                  >
                    <i
                      className="bi bi-geo-alt text-primary"
                      style={{ fontSize: 32 }}
                    ></i>
                  </div>
                  <h5 className="fw-bold mb-2 text-dark">No Addresses Yet</h5>
                  <p className="text-muted mb-4 small">
                    Add your first delivery address to start shopping
                  </p>
                  <Link
                    to="addAddress"
                    className="btn btn-primary fw-semibold px-4 py-2 rounded-3"
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

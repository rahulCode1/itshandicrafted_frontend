import { Link } from "react-router-dom";
import { useEcommerce } from "../../context/EcommerceContext";
import { useEffect } from "react";
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
  const { handleSelectDefaultAddress } = useEcommerce();
  const { address, fetchUserAddressLoading, removeAddressLoading, error } =
    useSelector((state) => state.address);
  const dispatch = useDispatch();

  const removeAddress = async (addressId) => {
    const toastId = toast.loading("Address remove...");

    try {
      dispatch(removeUserAddressAsync(addressId));
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
        <div className="p-4 col-lg-8">
          {error && (
            <ErrorModal
              message={error}
              onClose={() => dispatch(clearError())}
            />
          )}
          <div className="d-flex justify-content-between">
            <Link
              to="/user"
              className="btn mb-3 text-light"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed" }}
            >
              Back to Profile
            </Link>

            <Link
              to="addAddress"
              state={{from: "/address"}}
              className="btn mb-3 text-light btn-primary"
            >
              + Add Address
            </Link>
          </div>

          {/* ── Section Header ── */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="d-flex align-items-center gap-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-3 text-white flex-shrink-0"
                style={{
                  width: 48,
                  height: 48,
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                }}
              >
                <i className="bi bi-geo-alt-fill fs-5"></i>
              </div>
              <div>
                <h3
                  className="mb-0 fw-bold"
                  style={{ color: "#1e1b4b", letterSpacing: "-0.4px" }}
                >
                  Delivery Addresses
                </h3>
                <p className="text-muted mb-0 small">
                  Manage your shipping addresses
                </p>
              </div>
            </div>
            <span
              className="d-flex align-items-center justify-content-center rounded-circle fw-bold text-white flex-shrink-0"
              style={{
                width: 40,
                height: 40,
                fontSize: "1rem",
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              }}
            >
              {address?.length || 0}
            </span>
          </div>

          {address && address.length > 0 ? (
            <div className="row row-cols-1 row-cols-xl-2 g-4">
              {address.map((userAdd) => (
                <div className="col" key={userAdd.id}>
                  <div
                    className="card border-0 h-100 position-relative overflow-hidden"
                    style={{
                      borderRadius: 16,
                      boxShadow:
                        "0 4px 6px -1px rgba(79,70,229,0.07), 0 2px 4px -1px rgba(0,0,0,0.05)",
                      border: userAdd.isDefault
                        ? "1.5px solid #a7f3d0 !important"
                        : "1px solid #ede9fe",
                    }}
                  >
                    {/* Default ribbon */}
                    {userAdd.isDefault && (
                      <div
                        className="position-absolute top-0 end-0 text-white px-3 py-1 fw-semibold"
                        style={{
                          background:
                            "linear-gradient(135deg, #10b981, #059669)",
                          transform:
                            "translateX(30%) translateY(0%) rotate(45deg)",
                          transformOrigin: "top left",
                          width: "140px",
                          textAlign: "center",
                          fontSize: "0.65rem",
                          letterSpacing: "0.5px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                        }}
                      >
                        ✓ DEFAULT
                      </div>
                    )}

                    <div className="card-body p-4">
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
                                fontSize: "0.65rem",
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
                            className="btn btn-sm fw-semibold"
                            style={{
                              border: "1.5px solid #10b981",
                              color: "#10b981",
                              borderRadius: 8,
                              fontSize: "0.75rem",
                              background: "transparent",
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
                        className="d-flex align-items-center gap-2 px-3 py-2 rounded-2 mb-3"
                        style={{
                          background: "#f5f3ff",
                          border: "1px solid #ede9fe",
                        }}
                      >
                        <i
                          className="bi bi-telephone-fill"
                          style={{ color: "#4f46e5", fontSize: 13 }}
                        ></i>
                        <span className="text-muted small">
                          {userAdd.phoneNumber}
                        </span>
                      </div>

                      {/* Zip / City / State chips */}
                      <div className="row g-2 mb-3">
                        <div className="col-4">
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
                                fontSize: "0.65rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                              }}
                            >
                              ZIP
                            </small>
                            <span
                              className="fw-bold d-block"
                              style={{ color: "#1e1b4b", fontSize: "0.8rem" }}
                            >
                              {userAdd.zipCode}
                            </span>
                          </div>
                        </div>
                        <div className="col-4">
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
                                fontSize: "0.65rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                              }}
                            >
                              City
                            </small>
                            <span
                              className="fw-bold d-block"
                              style={{ color: "#1e1b4b", fontSize: "0.8rem" }}
                            >
                              {userAdd.city}
                            </span>
                          </div>
                        </div>
                        <div className="col-4">
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
                                fontSize: "0.65rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                              }}
                            >
                              State
                            </small>
                            <span
                              className="fw-bold d-block"
                              style={{ color: "#1e1b4b", fontSize: "0.8rem" }}
                            >
                              {userAdd.state}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Full Address */}
                      <div
                        className="d-flex align-items-start gap-2 p-3 rounded-2 mb-4"
                        style={{
                          background: "#fafafa",
                          border: "2px dashed #ddd6fe",
                        }}
                      >
                        <i
                          className="bi bi-geo-alt-fill mt-1 flex-shrink-0"
                          style={{ color: "#7c3aed", fontSize: 15 }}
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
                            className="btn btn-sm w-100 fw-semibold d-flex align-items-center justify-content-center gap-2"
                            style={{
                              border: "1.5px solid #4f46e5",
                              color: "#4f46e5",
                              borderRadius: 8,
                              background: "transparent",
                              fontSize: "0.8rem",
                            }}
                          >
                            <i
                              className="bi bi-pencil-fill"
                              style={{ fontSize: 12 }}
                            ></i>
                            Edit
                          </Link>
                        </div>
                        <div className="col-6">
                          <button
                            onClick={() => removeAddress(userAdd.id)}
                            disabled={removeAddressLoading === "loading"}
                            className="btn btn-sm w-100 fw-semibold d-flex align-items-center justify-content-center gap-2"
                            style={{
                              border: "1.5px solid #ef4444",
                              color: "#ef4444",
                              borderRadius: 8,
                              background: "transparent",
                              fontSize: "0.8rem",
                            }}
                          >
                            {removeAddressLoading === "loading" ? (
                              <>
                                <span className="spinner-border spinner-border-sm"></span>
                                Deleting...
                              </>
                            ) : (
                              <>
                                <i
                                  className="bi bi-trash3-fill"
                                  style={{ fontSize: 12 }}
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
              className="card border-0 text-center py-5"
              style={{
                borderRadius: 16,
                boxShadow: "0 4px 20px rgba(79,70,229,0.08)",
                border: "1px solid #ede9fe",
              }}
            >
              <div className="card-body py-5">
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
                  className="btn fw-semibold px-4 py-2 text-white"
                  style={{
                    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                    border: "none",
                    borderRadius: 10,
                    fontSize: "0.9rem",
                  }}
                >
                  <i className="bi bi-plus-circle-fill me-2"></i>
                  Add Your First Address
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllAddress;

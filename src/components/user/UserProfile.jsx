import { Link } from "react-router-dom";

const UserProfile = ({ user }) => {
  return (
    <>
      <div
        className="min-vh-100 py-4 py-md-5"
        style={{
          marginBottom: "5em",
          background:
            "linear-gradient(160deg, #f0f4ff 0%, #fafafa 60%, #f5f3ff 100%)",
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-7 col-lg-5">
              <div
                className="card border-0 rounded-4 overflow-hidden"
                style={{
                  boxShadow: "0 8px 40px rgba(79,70,229,0.13)",
                  border: "1.5px solid #ede9fe",
                }}
              >
                {/* ── Gradient Header ── */}
                <div
                  className="position-relative text-white text-center pt-5 pb-5 px-4 overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #4f46e5 0%, #7c3aed 60%, #a855f7 100%)",
                  }}
                >
                  {/* Decorative blobs */}
                  <div
                    className="position-absolute rounded-circle"
                    style={{
                      width: 180,
                      height: 180,
                      top: -70,
                      right: -50,
                      background: "rgba(255,255,255,0.07)",
                    }}
                  />
                  <div
                    className="position-absolute rounded-circle"
                    style={{
                      width: 110,
                      height: 110,
                      bottom: -40,
                      left: -25,
                      background: "rgba(255,255,255,0.06)",
                    }}
                  />
                  <div
                    className="position-absolute rounded-circle"
                    style={{
                      width: 60,
                      height: 60,
                      top: 20,
                      left: 30,
                      background: "rgba(255,255,255,0.05)",
                    }}
                  />

                  {/* Avatar initial */}
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 position-relative"
                    style={{
                      width: 88,
                      height: 88,
                      background: "rgba(255,255,255,0.18)",
                      border: "3px solid rgba(255,255,255,0.45)",
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "#fff",
                      backdropFilter: "blur(8px)",
                      zIndex: 1,
                    }}
                  >
                    {user.name?.charAt(0).toUpperCase()}

                    {/* Online dot */}
                    <span
                      className="position-absolute rounded-circle"
                      style={{
                        width: 16,
                        height: 16,
                        background: "#10b981",
                        border: "2.5px solid #fff",
                        bottom: 4,
                        right: 2,
                      }}
                    />
                  </div>

                  <h5
                    className="fw-bold mb-1 position-relative"
                    style={{ zIndex: 1 }}
                  >
                    {user.name}
                  </h5>
                  <span
                    className="badge rounded-pill position-relative"
                    style={{
                      background: "rgba(255,255,255,0.18)",
                      fontSize: "0.72rem",
                      padding: "4px 12px",
                      zIndex: 1,
                    }}
                  >
                    Member
                  </span>
                </div>

                {/* ── Card Body ── */}
                <div className="card-body p-4">
                  {/* Section label */}
                  <p
                    className="fw-semibold mb-3 d-flex align-items-center gap-2"
                    style={{
                      color: "#4f46e5",
                      fontSize: "0.72rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.6px",
                    }}
                  >
                    <i className="bi bi-person-lines-fill"></i> Contact
                    Information
                  </p>

                  {/* Phone row */}
                  <div
                    className="d-flex align-items-center gap-3 p-3 rounded-3 mb-4"
                    style={{
                      background: "#f5f3ff",
                      border: "1.5px solid #ede9fe",
                    }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                      style={{ width: 40, height: 40, background: "#ede9fe" }}
                    >
                      <i
                        className="bi bi-telephone-fill"
                        style={{ color: "#4f46e5", fontSize: 15 }}
                      ></i>
                    </div>
                    <div>
                      <small
                        className="text-muted d-block"
                        style={{ fontSize: "0.72rem" }}
                      >
                        Phone number
                      </small>
                      <span
                        className="fw-semibold"
                        style={{ color: "#1e1b4b", fontSize: "0.95rem" }}
                      >
                        +91 {user.phoneNumber}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      borderTop: "2px dashed #ddd6fe",
                      marginBottom: 20,
                    }}
                  />

                  {/* Action buttons */}
                  <div className="d-grid gap-2">
                    <Link
                      to="/address"
                      state={{ from: "/user" }}
                      className="btn fw-semibold rounded-3 py-2 text-white d-flex align-items-center justify-content-center gap-2"
                      style={{
                        background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                        border: "none",
                        fontSize: "0.92rem",
                        boxShadow: "0 2px 12px rgba(79,70,229,0.25)",
                      }}
                    >
                      <i className="bi bi-geo-alt-fill"></i>
                      View All Addresses
                    </Link>

                    <Link
                      to="/orders"
                      className="btn fw-semibold rounded-3 py-2 d-flex align-items-center justify-content-center gap-2"
                      style={{
                        border: "1.5px solid #ddd6fe",
                        color: "#4f46e5",
                        background: "#f5f3ff",
                        fontSize: "0.92rem",
                      }}
                    >
                      <i className="bi bi-bag-check-fill"></i>
                      View All Orders
                    </Link>

                    <Link
                      className="btn fw-semibold rounded-3 py-2 d-flex align-items-center justify-content-center gap-2"
                      style={{
                        border: "1.5px solid #ddd6fe",
                        color: "#4f46e5",
                        background: "#f5f3ff",
                        fontSize: "0.92rem",
                      }}
                      to="/address/addAddress"
                    >
                      Add new Address{" "}
                    </Link>
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

export default UserProfile;

import { Link } from "react-router-dom";

const UserProfile = ({ user }) => {
  return (
    <>
      <div className="container-fluid bg-light min-vh-100 py-5">
        <div className="container">
          <div className="row g-4">
            {/* Profile Card */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm overflow-hidden h-100">
                {/* Profile Header with Gradient */}
                <div
                  className="text-white text-center p-4"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  <div className="position-relative d-inline-block mb-3">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
                      className="rounded-circle border border-4 border-white shadow"
                      alt="Profile"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <h4 className="mb-1 fw-bold">{user.name}</h4>
                </div>

                

                {/* Contact Information */}
                <div className="card-body p-4">
                  <h6 className="text-uppercase text-muted small fw-bold mb-3">
                    Contact Information
                  </h6>

                  <div className="mb-4">
                    <div className="d-flex align-items-center p-3 bg-light rounded">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle me-3"
                        style={{
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#e8f5e9",
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          fill="#2e7d32"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                        </svg>
                      </div>
                      <div className="flex-grow-1">
                        <small className="text-muted d-block">
                          Phone number
                        </small>
                        <span className="fw-medium">+91{user.phoneNumber}</span>
                      </div>
                    </div>
                  </div>

                  <hr className="my-4" />

                  {/* Action Buttons */}
                  <div className="d-grid gap-2">
                    <Link
                      to="/address"
                      state={{ from: "/user" }}
                      className="btn btn-lg text-white fw-medium"
                      style={{
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      }}
                    >
                      View All address
                    </Link>
                    <Link
                      to="/orders"
                      className="btn btn-lg btn-outline-primary fw-medium"
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="me-2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                      </svg>
                      View All Orders
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

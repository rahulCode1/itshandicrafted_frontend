import { useSelector } from "react-redux";

const SentOtp = ({ handleOnChange, handleSentOtp, formData }) => {
  const { sentOtpLoading } = useSelector((state) => state.user);

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="w-100" style={{ maxWidth: 480 }}>

        {/* Brand mark */}
        <div className="mb-4 text-center">
          <span
            className="fw-bold d-inline-block mb-2"
            style={{
              fontSize: "1.5rem",
              letterSpacing: "0.12em",
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            It's Handicrafted
          </span>
          <h2
            className="h5 fw-bold mb-1"
            style={{ color: "#1e1b4b", letterSpacing: "-0.01em" }}
          >
            Welcome back
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: "0.88rem" }}>
            Sign in with your phone number to continue
          </p>
        </div>

        {/* Card */}
        <div
          className="w-100 rounded-4 p-4 p-md-5"
          style={{
            background: "#fff",
            border: "1.5px solid #ede9fe",
            boxShadow: "0 4px 24px rgba(79,70,229,0.08)",
          }}
        >
          <form onSubmit={handleSentOtp}>
            {/* Name */}
            <div className="mb-3">
              <label
                htmlFor="name"
                className="form-label fw-semibold"
                style={{ fontSize: "0.85rem", color: "#374151" }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleOnChange}
                value={formData.name}
                placeholder="Enter your name"
                className="form-control rounded-3"
                style={{
                  border: "1.5px solid #ddd6fe",
                  background: "#f5f3ff",
                  fontSize: "0.92rem",
                  padding: "0.6rem 0.9rem",
                  color: "#1e1b4b",
                }}
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="form-label fw-semibold"
                style={{ fontSize: "0.85rem", color: "#374151" }}
              >
                Phone Number
              </label>
              <div className="input-group">
                <span
                  className="input-group-text fw-semibold rounded-start-3"
                  style={{
                    background: "#ede9fe",
                    border: "1.5px solid #ddd6fe",
                    borderRight: "none",
                    color: "#4f46e5",
                    fontSize: "0.9rem",
                  }}
                >
                  +91
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  onChange={handleOnChange}
                  value={formData.phoneNumber}
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  maxLength={10}
                  className="form-control rounded-end-3"
                  style={{
                    border: "1.5px solid #ddd6fe",
                    borderLeft: "none",
                    background: "#f5f3ff",
                    fontSize: "0.92rem",
                    padding: "0.6rem 0.9rem",
                    color: "#1e1b4b",
                  }}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              disabled={sentOtpLoading === "loading"}
              type="submit"
              className="btn w-100 fw-bold rounded-3 py-2"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                border: "none",
                color: "#fff",
                fontSize: "0.95rem",
                letterSpacing: "0.02em",
                boxShadow: "0 2px 12px rgba(79,70,229,0.25)",
              }}
            >
              {sentOtpLoading === "loading" ? "Sending OTP…" : "Send OTP"}
              {sentOtpLoading === "loading" && (
                <span className="spinner-border spinner-border-sm ms-2" />
              )}
            </button>
          </form>
        </div>

        {/* Footer note */}
        <p
          className="text-muted text-center mt-4 mb-0"
          style={{ fontSize: "0.78rem" }}
        >
          By continuing, you agree to our{" "}
          <span style={{ color: "#4f46e5", cursor: "pointer" }}>
            Terms of Service
          </span>{" "}
          &amp;{" "}
          <span style={{ color: "#4f46e5", cursor: "pointer" }}>
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
};

export default SentOtp;
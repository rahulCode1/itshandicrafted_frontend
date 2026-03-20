import { useSelector } from "react-redux";

const VerifyOtp = ({
  handleVerifyOtp,
  setOtp,
  otp,
  handleResentOtp,
  timer,
  isDisabledBtn,
  formData,
}) => {
  const { verifyOtpLoading, resendOtpLoading } = useSelector(
    (state) => state.user,
  );

  return (
    <>
      {/* Header */}
      <div className="text-center mb-4">
        {/* Icon badge */}
        <div
          className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
          style={{
            width: 64,
            height: 64,
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            boxShadow: "0 8px 24px rgba(79,70,229,0.35)",
          }}
        >
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
        </div>

        <h2
          className="h5 fw-bold mb-1"
          style={{ color: "#1e1b4b", letterSpacing: "-0.01em" }}
        >
          Verify OTP
        </h2>
        <p className="mb-0" style={{ color: "#6b7280", fontSize: "0.88rem" }}>
          Code sent to{" "}
          <span className="fw-semibold" style={{ color: "#4f46e5" }}>
            +91 {formData.phoneNumber}
          </span>
        </p>
      </div>

      {/* Form card */}
      <div
        className="rounded-4 p-4"
        style={{
          background: "#fff",
          border: "1.5px solid #ede9fe",
          boxShadow: "0 8px 32px rgba(79,70,229,0.10)",
        }}
      >
        <form onSubmit={handleVerifyOtp}>
          {/* OTP input */}
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="form-label fw-semibold d-flex align-items-center gap-2"
              style={{ fontSize: "0.85rem", color: "#374151" }}
            >
              <span
                className="d-inline-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: 22,
                  height: 22,
                  background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  fontSize: "0.7rem",
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                4
              </span>
              Enter 4-digit OTP
            </label>

            <input
              type="number"
              required
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              id="otp"
              name="otp"
              inputMode="numeric"
              placeholder="• • • •"
              minLength={4}
              maxLength={4}
              className="form-control rounded-3 text-center fw-bold"
              style={{
                border: "1.5px solid #ddd6fe",
                background: "#f5f3ff",
                fontSize: "2rem",
                letterSpacing: "0.6em",
                padding: "0.75rem",
                color: "#1e1b4b",
                boxShadow: "inset 0 2px 6px rgba(79,70,229,0.06)",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#7c3aed";
                e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ddd6fe";
                e.target.style.boxShadow =
                  "inset 0 2px 6px rgba(79,70,229,0.06)";
              }}
            />

            <p
              className="text-center mt-2 mb-0"
              style={{ fontSize: "0.78rem", color: "#9ca3af" }}
            >
              <i className="bi bi-shield-lock me-1"></i>
              Your OTP is secure and expires shortly
            </p>
          </div>

          {/* Divider */}
          <hr style={{ borderColor: "#ede9fe", marginBottom: "1rem" }} />

          {/* Actions */}
          <div className="d-flex flex-column gap-2">
            {/* Verify button */}
            <button
              disabled={verifyOtpLoading === "loading"}
              type="submit"
              className="btn w-100 fw-bold rounded-3 py-2 d-flex align-items-center justify-content-center gap-2"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                border: "none",
                color: "#fff",
                fontSize: "0.95rem",
                boxShadow: "0 4px 16px rgba(79,70,229,0.30)",
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.92")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {verifyOtpLoading === "loading" ? (
                <>
                  <span className="spinner-border spinner-border-sm" />
                  Verifying…
                </>
              ) : (
                <>
                  <i className="bi bi-patch-check-fill"></i>
                  Verify OTP
                </>
              )}
            </button>

            {/* Resend button */}
            <button
              disabled={resendOtpLoading === "loading" || isDisabledBtn}
              onClick={handleResentOtp}
              type="button"
              className="btn w-100 fw-semibold rounded-3 py-2 d-flex align-items-center justify-content-center gap-2"
              style={{
                border: "1.5px solid #ddd6fe",
                color: isDisabledBtn ? "#a5b4fc" : "#4f46e5",
                background: isDisabledBtn ? "#f5f3ff" : "transparent",
                fontSize: "0.92rem",
                transition: "all 0.2s",
              }}
            >
              {resendOtpLoading === "loading" ? (
                <>
                  <span className="spinner-border spinner-border-sm" />
                  Resending…
                </>
              ) : (
                <>
                  <i className="bi bi-arrow-clockwise"></i>
                  Resend OTP
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Timer */}
      {timer < 10 && (
        <div
          className="d-flex align-items-center justify-content-center gap-2 mt-3"
          style={{ fontSize: "0.82rem", color: "#6b7280" }}
        >
          <i className="bi bi-clock" style={{ color: "#4f46e5" }}></i>
          Resend available in{" "}
          <span
            className="fw-bold px-2 py-1 rounded-2"
            style={{
              color: "#4f46e5",
              background: "#ede9fe",
              fontSize: "0.82rem",
            }}
          >
            {timer}s
          </span>
        </div>
      )}

      {/* Warning notice */}
      <div
        className="d-flex align-items-center gap-2 mt-3 rounded-3 px-3 py-2"
        style={{
          background: "#fffbeb",
          border: "1px solid #fde68a",
          fontSize: "0.8rem",
          color: "#92400e",
        }}
      >
        <i
          className="bi bi-exclamation-triangle-fill"
          style={{ color: "#f59e0b", flexShrink: 0 }}
        ></i>
        Please do not refresh the page until OTP is verified.
      </div>
    </>
  );
};

export default VerifyOtp;

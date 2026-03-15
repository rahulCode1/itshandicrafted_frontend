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
      <div className="text-center mb-4" 
      
      >
        <div
          className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
          style={{
            width: 56,
            height: 56,
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
          }}
        >
          <svg
            width="26"
            height="26"
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
          boxShadow: "0 4px 24px rgba(79,70,229,0.08)",
        }}
      >
        <form onSubmit={handleVerifyOtp}>
          {/* OTP input */}
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="form-label fw-semibold"
              style={{ fontSize: "0.85rem", color: "#374151" }}
            >
              Enter OTP
            </label>
            <input
              type="number"
              required
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              id="otp"
              name="otp"
              inputMode="numeric"
              placeholder="Enter 4 digit otp"
              minLength={4}
              maxLength={4}
              className="form-control rounded-3 text-center"
              style={{
                border: "1.5px solid #ddd6fe",
                background: "#f5f3ff",
                fontSize: "1.6rem",
                letterSpacing: "0.5em",
                padding: "0.65rem",
                color: "#1e1b4b",
              }}
            />
          </div>

          {/* Actions */}
          <div className="d-flex flex-column gap-2">
            <button
              disabled={verifyOtpLoading === "loading"}
              type="submit"
              className="btn w-100 fw-bold rounded-3 py-2"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                border: "none",
                color: "#fff",
                fontSize: "0.95rem",
                boxShadow: "0 2px 12px rgba(79,70,229,0.25)",
              }}
            >
              {verifyOtpLoading === "loading" ? "Verifying…" : "Verify OTP"}
              {verifyOtpLoading === "loading" && (
                <span className="spinner-border spinner-border-sm ms-2" />
              )}
            </button>

            <button
              disabled={resendOtpLoading === "loading" || isDisabledBtn}
              onClick={handleResentOtp}
              type="button"
              className="btn w-100 fw-semibold rounded-3 py-2"
              style={{
                border: "1.5px solid #ddd6fe",
                color: isDisabledBtn ? "#a5b4fc" : "#4f46e5",
                background: isDisabledBtn ? "#f5f3ff" : "transparent",
                fontSize: "0.92rem",
              }}
            >
              {resendOtpLoading === "loading" ? "Resending…" : "Resend OTP"}
              {resendOtpLoading === "loading" && (
                <span className="spinner-border spinner-border-sm ms-2" />
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Timer */}
      {timer < 10 && (
        <p
          className="text-center mt-3 mb-0"
          style={{ fontSize: "0.82rem", color: "#6b7280" }}
        >
          Resend available in{" "}
          <span className="fw-bold" style={{ color: "#4f46e5" }}>
            {timer}s
          </span>
        </p>
      )}
    </>
  );
};

export default VerifyOtp;

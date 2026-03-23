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
            Verify your number
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: "0.88rem" }}>
            OTP sent to{" "}
            <span className="fw-semibold" style={{ color: "#4f46e5" }}>
              +91 {formData.phoneNumber}
            </span>
          </p>
        </div>

        {/* Warning notice */}
        <div
          className="d-flex align-items-center gap-2 rounded-3 mb-3 px-3 py-2"
          style={{
            background: "#fffbeb",
            border: "1.5px solid #fde68a",
            fontSize: "0.8rem",
            color: "#92400e",
          }}
        >
          <i className="bi bi-exclamation-triangle-fill flex-shrink-0" style={{ color: "#f59e0b" }} />
          <span>Do not refresh the page until OTP is verified.</span>
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
          <form onSubmit={handleVerifyOtp}>

            {/* OTP label */}
            <div className="mb-4">
              <label
                htmlFor="otp"
                className="form-label fw-semibold mb-2"
                style={{ fontSize: "0.85rem", color: "#374151" }}
              >
                Enter 4-digit OTP
              </label>

              {/* OTP input */}
              <input
                type="text"
                required
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                  setOtp(val);
                }}
                value={otp}
                id="otp"
                name="otp"
                inputMode="numeric"
                placeholder="0 0 0 0"
                className="form-control text-center fw-bold rounded-3"
                style={{
                  border: "1.5px solid #ddd6fe",
                  background: "#f5f3ff",
                  fontSize: "2rem",
                  letterSpacing: "0.6em",
                  padding: "0.7rem 1rem",
                  color: "#1e1b4b",
                  caretColor: "#4f46e5",
                }}
              />

              {/* Dot progress indicators */}
              <div className="d-flex justify-content-center gap-2 mt-3">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-circle"
                    style={{
                      width: 9,
                      height: 9,
                      background: (otp?.length ?? 0) > i ? "#4f46e5" : "#ddd6fe",
                      transition: "background 0.2s",
                    }}
                  />
                ))}
              </div>
              <p
                className="text-center mt-1 mb-0"
                style={{ fontSize: "0.72rem", color: "#9ca3af" }}
              >
                {otp?.length || 0} of 4 digits entered
              </p>
            </div>

            {/* Verify button */}
            <button
              disabled={verifyOtpLoading === "loading"}
              type="submit"
              className="btn w-100 fw-bold rounded-3 py-2 mb-2 d-flex align-items-center justify-content-center gap-2"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                border: "none",
                color: "#fff",
                fontSize: "0.95rem",
                letterSpacing: "0.02em",
                boxShadow: "0 2px 12px rgba(79,70,229,0.25)",
              }}
            >
              {verifyOtpLoading === "loading" ? (
                <>
                  <span className="spinner-border spinner-border-sm" />
                  Verifying…
                </>
              ) : (
                <>
                  <i className="bi bi-patch-check-fill" />
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
                background: "transparent",
                border: "1.5px solid #ddd6fe",
                color: isDisabledBtn ? "#a5b4fc" : "#4f46e5",
                fontSize: "0.92rem",
              }}
            >
              {resendOtpLoading === "loading" ? (
                <>
                  <span className="spinner-border spinner-border-sm" />
                  Resending…
                </>
              ) : (
                <>
                  <i className="bi bi-arrow-clockwise" />
                  Resend OTP
                  {isDisabledBtn && timer > 0 && (
                    <span
                      className="ms-1 px-2 py-0 rounded-2 fw-bold"
                      style={{
                        background: "#ede9fe",
                        color: "#4f46e5",
                        fontSize: "0.78rem",
                      }}
                    >
                      {timer}s
                    </span>
                  )}
                </>
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

export default VerifyOtp;
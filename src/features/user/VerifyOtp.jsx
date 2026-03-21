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
        <h2 className="h5 fw-bold mb-1 text-dark">Verify OTP</h2>
        <p className="text-muted mb-0" style={{ fontSize: "0.88rem" }}>
          Code sent to{" "}
          <span className="fw-semibold text-primary">
            +91 {formData.phoneNumber}
          </span>
        </p>
      </div>

      {/* Warning notice */}
      <div
        className="alert alert-warning d-flex align-items-center gap-2 py-2 px-3 rounded-3 mb-3"
        style={{ fontSize: "0.8rem" }}
      >
        <i className="bi bi-exclamation-triangle-fill text-warning flex-shrink-0"></i>
        <span>Do not refresh the page until OTP is verified.</span>
      </div>

      {/* Form card */}
      <div className="card border rounded-4 shadow-sm">
        <div className="card-body p-4">
          <form onSubmit={handleVerifyOtp}>
            {/* OTP input */}
            <div className="mb-4">
              {/* Label */}
              <label
                htmlFor="otp"
                className="form-label fw-semibold text-dark mb-1"
                style={{ fontSize: "0.85rem" }}
              >
                <i className="bi bi-123 me-2 text-primary"></i>
                Enter your 4-digit OTP
              </label>

              {/* Input */}
              <input
                type="number"
                required
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                id="otp"
                name="otp"
                inputMode="numeric"
                placeholder="0  0  0  0"
                minLength={4}
                maxLength={4}
                className="form-control form-control-lg rounded-3 text-center fw-bold border-primary"
                style={{
                  fontSize: "2rem",
                  letterSpacing: "0.5em",
                  background: "#f8f7ff",
                  color: "#1e1b4b",
                }}
              />

              {/* Below-input hints */}
              <div className="d-flex align-items-center justify-content-between mt-2 px-1">
                <span className="text-muted" style={{ fontSize: "0.75rem" }}>
                  <i className="bi bi-info-circle me-1 text-primary"></i>
                  Enter digits only, no spaces
                </span>
                <span className="text-muted" style={{ fontSize: "0.75rem" }}>
                  <i className="bi bi-shield-lock me-1 text-success"></i>
                  Expires shortly
                </span>
              </div>

              {/* 4 dot indicators */}
              <div className="d-flex justify-content-center gap-2 mt-3">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-circle"
                    style={{
                      width: 10,
                      height: 10,
                      background: otp?.length > i ? "#4f46e5" : "#e5e7eb",
                      transition: "background 0.2s",
                    }}
                  />
                ))}
              </div>
              <p
                className="text-center text-muted mt-1 mb-0"
                style={{ fontSize: "0.72rem" }}
              >
                {otp?.length || 0} of 4 digits entered
              </p>
            </div>

            <hr className="text-muted opacity-25 mb-3" />

            {/* Actions */}
            <div className="d-flex flex-column gap-2">
              <button
                disabled={verifyOtpLoading === "loading"}
                type="submit"
                className="btn btn-primary w-100 fw-bold rounded-3 py-2 d-flex align-items-center justify-content-center gap-2"
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

              <button
                disabled={resendOtpLoading === "loading" || isDisabledBtn}
                onClick={handleResentOtp}
                type="button"
                className="btn btn-outline-primary w-100 fw-semibold rounded-3 py-2 d-flex align-items-center justify-content-center gap-2"
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
      </div>

      {/* Timer */}
      {timer < 10 && (
        <div className="d-flex align-items-center justify-content-center gap-2 mt-3">
          <i
            className="bi bi-clock text-primary"
            style={{ fontSize: "0.85rem" }}
          ></i>
          <span className="text-muted" style={{ fontSize: "0.82rem" }}>
            Resend available in{" "}
            <span className="badge bg-primary bg-opacity-10 text-primary fw-bold px-2 py-1 rounded-2">
              {timer}s
            </span>
          </span>
        </div>
      )}
    </>
  );
};

export default VerifyOtp;

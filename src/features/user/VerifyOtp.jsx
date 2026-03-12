import { useSelector } from "react-redux";

const VerifyOtp = ({
  handleVerifyOtp,
  setOtp,
  otp,
  handleResentOtp,
  timer,
  isDisabledBtn,
}) => {
  const { verifyOtpLoading, resendOtpLoading } = useSelector(
    (state) => state.user,
  );

  return (
    <>
      <h2>Varify otp </h2>
      <form onSubmit={handleVerifyOtp}>
        <div className="mb-3">
          <label htmlFor="otp" className="form-label">
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
            placeholder="Enter your otp"
            minLength={4}
            maxLength={4}
            className="form-control"
          />
        </div>

        <button
          disabled={verifyOtpLoading === "loading"}
          type="submit"
          className="btn border-primary"
        >
          {verifyOtpLoading === "loading" ? "Verifying otp..." : "Verify OTP"}
          {verifyOtpLoading === "loading" && (
            <span className="spinner-border spinner-border-sm ms-2"></span>
          )}
        </button>

        <button
          disabled={resendOtpLoading === "loading" || isDisabledBtn}
          onClick={handleResentOtp}
          className="btn border-primary ms-3"
        >
          {resendOtpLoading === "loading" ? "Resending otp..." : "Resend OTP"}
          {resendOtpLoading === "loading" && (
            <span className="spinner-border spinner-border-sm ms-2"></span>
          )}
        </button>
      </form>
     {timer < 10 && <p>Resent otp after: {timer}</p>}
    </>
  );
};

export default VerifyOtp;

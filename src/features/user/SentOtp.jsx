import { useSelector } from "react-redux";

const SentOtp = ({ handleOnChange, handleSentOtp, formData }) => {
  const { sentOtpLoading } = useSelector((state) => state.user);

  return (
    <>
      <h2>Login with otp</h2>
      <form onSubmit={handleSentOtp}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:{" "}
          </label>
          <input
            type="text"
            required
            id="name"
            name="name"
            onChange={handleOnChange}
            value={formData.name}
            placeholder="Enter your name"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone number
          </label>
          <input
            type="number"
            required
            onChange={handleOnChange}
            value={formData.phoneNumber}
            id="phoneNumber"
            name="phoneNumber"
            inputMode="numeric"
            placeholder="Enter your phone number"
            minLength={10}
            maxLength={10}
            className="form-control"
          />
        </div>

        <button
          disabled={sentOtpLoading === "loading"}
          type="submit"
          className="btn btn-primary fw-bold"
        >
          {sentOtpLoading === "loading" ? "Sending otp..." : "Send OTP"}
          {sentOtpLoading === "loading" && (
            <span className="spinner-border spinner-border-sm ms-2"></span>
          )}
        </button>
      </form>
    </>
  );
};


export default SentOtp;

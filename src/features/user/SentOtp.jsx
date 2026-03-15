import { useSelector } from "react-redux";

const SentOtp = ({ handleOnChange, handleSentOtp, formData }) => {
  const { sentOtpLoading } = useSelector((state) => state.user);

  return (
    <div className="d-flex vh-100 overflow-hidden">
      {/* ── LEFT: Form Panel ── */}
      <div
        className="d-flex flex-column justify-content-center align-items-center px-4 px-md-5 py-5 w-100 h-100 overflow-auto"
        style={{ maxWidth: 480, margin: "0 auto" }}
      >
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
            Handicrafted
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

      {/* ── RIGHT: Decorative Panel — hidden on mobile ── */}
      <div
        className="d-none d-md-flex flex-column justify-content-end align-items-start p-5 flex-grow-1 position-relative overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%)",
          minHeight: "unset",
          height: "100%",
        }}
      >
        {/* Decorative circles */}
        <div
          className="position-absolute rounded-circle"
          style={{
            width: 420,
            height: 420,
            top: -100,
            right: -100,
            background: "rgba(255,255,255,0.07)",
          }}
        />
        <div
          className="position-absolute rounded-circle"
          style={{
            width: 260,
            height: 260,
            top: 120,
            right: 80,
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div
          className="position-absolute rounded-circle"
          style={{
            width: 180,
            height: 180,
            bottom: 180,
            left: -60,
            background: "rgba(255,255,255,0.05)",
          }}
        />

        {/* Floating craft icons */}
        <div
          className="position-absolute d-flex flex-column gap-3"
          style={{
            top: "12%",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: 0.18,
          }}
        >
          {["✦", "◈", "❋", "◇", "✦"].map((s, i) => (
            <span
              key={i}
              style={{ fontSize: "2.5rem", color: "#fff", lineHeight: 1 }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Big image replacement — craft-themed SVG illustration */}
        <div
          className="position-absolute top-50 start-50 translate-middle"
          style={{ opacity: 0.13 }}
        >
          <svg
            width="340"
            height="340"
            viewBox="0 0 340 340"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="170" cy="170" r="160" stroke="white" strokeWidth="2" />
            <circle
              cx="170"
              cy="170"
              r="120"
              stroke="white"
              strokeWidth="1.5"
            />
            <circle cx="170" cy="170" r="80" stroke="white" strokeWidth="1" />
            <path
              d="M170 10 L170 330 M10 170 L330 170"
              stroke="white"
              strokeWidth="1"
            />
            <path
              d="M57 57 L283 283 M283 57 L57 283"
              stroke="white"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Bottom text */}
        <div className="position-relative" style={{ zIndex: 2 }}>
          <p
            className="fw-bold mb-2"
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Authentic · Handmade · Unique
          </p>
          <h3
            className="fw-bold mb-2"
            style={{
              color: "#fff",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            Discover handcrafted
            <br />
            treasures from artisans
          </h3>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "0.9rem",
              maxWidth: 340,
              lineHeight: 1.6,
            }}
          >
            Every piece tells a story. Shop one-of-a-kind creations made with
            care, tradition, and love.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SentOtp;

import { AiOutlineInfoCircle } from "react-icons/ai";

const ErrorModal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "rgba(0,0,0,0.4)", zIndex: 1050 }}
      onClick={onClose}
    >
      <div
        className="bg-white overflow-hidden"
        style={{
          maxWidth: 380,
          width: "90%",
          borderRadius: 16,
          border: "0.5px solid #e5e7eb",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top red accent line */}
        <div style={{ height: 3, background: "#E24B4A" }} />

        <div className="text-center px-4 py-4">
          {/* Icon */}
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
            style={{
              width: 48,
              height: 48,
              background: "#FCEBEB",
              border: "0.5px solid #F7C1C1",
            }}
          >
            <AiOutlineInfoCircle
              style={{ fontSize: "1.4rem", color: "#E24B4A" }}
            />
          </div>

          {/* Title */}
          <p
            className="fw-semibold mb-3"
            style={{ fontSize: "0.95rem", color: "#111827" }}
          >
            Something went wrong
          </p>

          {/* Backend error message — highlighted */}
          <div
            className="text-start rounded-3 px-3 py-2 mb-4"
            style={{
              background: "#FCEBEB",
              border: "0.5px solid #F7C1C1",
            }}
          >
            <p
              className="mb-0"
              style={{ fontSize: "0.82rem", color: "#A32D2D", lineHeight: 1.6 }}
            >
              {message}
            </p>
          </div>

          {/* Action */}
          <button
            onClick={onClose}
            className="btn w-100 fw-semibold rounded-3 py-2 text-white"
            style={{
              background: "#E24B4A",
              border: "none",
              fontSize: "0.88rem",
            }}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;

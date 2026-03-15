import { AiOutlineCloseCircle } from "react-icons/ai";
const ErrorModal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <>
     
     <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: "rgba(15, 10, 40, 0.65)",
          zIndex: 1050,
          backdropFilter: "blur(6px)",
        }}
        onClick={onClose}
      >
        <div
          className="position-relative rounded-4 overflow-hidden"
          style={{
            maxWidth: 440,
            width: "90%",
            background: "#fff",
            border: "1.5px solid #fee2e2",
            boxShadow: "0 8px 40px rgba(220,38,38,0.12), 0 2px 12px rgba(0,0,0,0.08)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top accent bar */}
          <div style={{ height: 4, background: "linear-gradient(90deg, #ef4444, #f87171)" }} />

          {/* Close button */}
          <button
            onClick={onClose}
            className="btn border-0 position-absolute d-flex align-items-center justify-content-center rounded-circle"
            style={{
              top: 14,
              right: 14,
              width: 32,
              height: 32,
              background: "#fff1f2",
              color: "#ef4444",
              fontSize: "1.1rem",
              lineHeight: 1,
              zIndex: 2,
            }}
          >
            ×
          </button>

          {/* Body */}
          <div className="text-center px-4 px-md-5 py-4 py-md-5">

            {/* Icon */}
            <div
              className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
              style={{
                width: 68,
                height: 68,
                background: "#fff1f2",
                border: "1.5px solid #fee2e2",
              }}
            >
              <AiOutlineCloseCircle style={{ fontSize: "2.4rem", color: "#ef4444" }} />
            </div>

            <h3 className="fw-bold mb-2" style={{ color: "#1e1b4b", fontSize: "1.15rem", letterSpacing: "-0.01em" }}>
              Something went wrong
            </h3>

            <p className="mb-4" style={{ color: "#6b7280", fontSize: "0.9rem", lineHeight: 1.6 }}>
              {message}
            </p>

            <button
              onClick={onClose}
              className="btn fw-semibold rounded-3 px-5 py-2"
              style={{
                background: "linear-gradient(135deg, #ef4444, #f87171)",
                border: "none",
                color: "#fff",
                fontSize: "0.92rem",
                boxShadow: "0 2px 12px rgba(239,68,68,0.25)",
              }}
            >
              Dismiss
            </button>

          </div>
        </div>
      </div>
    </>
  );
};
export default ErrorModal;

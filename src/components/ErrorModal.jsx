import { AiOutlineCloseCircle } from "react-icons/ai";
const ErrorModal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <>
     
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1050,
          backdropFilter: "blur(4px)",
        }}
        onClick={onClose}
      >
        <div
          className="card shadow-lg position-relative"
          style={{ maxWidth: "500px", width: "90%" }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="btn btn-link position-absolute text-secondary"
            style={{ top: "15px", right: "15px", fontSize: "1.5rem" }}
          >
            ×
          </button>

          <div className="card-body text-center p-4 p-md-5">
            <div className="mb-4">
              <AiOutlineCloseCircle
                className="text-danger"
                style={{ fontSize: "5rem" }}
              />
            </div>

            <h3 className="card-title fw-bold text-danger mb-3">
              Error Occurred
            </h3>

            {/* ✅ FIXED - just render the string */}
            <p className="card-text text-muted mb-4">{message}</p>

            <button onClick={onClose} className="btn btn-danger btn-lg px-5">
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ErrorModal;

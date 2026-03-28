const Loading = () => {
  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap");

        @keyframes rotateRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 0.2; transform: scale(0.7); }
          50%       { opacity: 1;   transform: scale(1);   }
        }
        @keyframes fadeUpText {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .loading-ring {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid #edd9b8;
          border-top-color: #c97b3a;
          animation: rotateRing 0.9s cubic-bezier(0.6, 0.2, 0.4, 0.8) infinite;
        }

        .loading-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #c97b3a;
          animation: pulseDot 1.2s ease-in-out infinite;
        }
        .loading-dot:nth-child(2) { animation-delay: 0.2s; }
        .loading-dot:nth-child(3) { animation-delay: 0.4s; }

        .loading-label {
          font-family: "DM Sans", sans-serif;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #a08060;
          animation: fadeUpText 0.6s ease both;
          animation-delay: 0.15s;
        }
      `}</style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.6rem",
          minHeight: "300px",
        }}
      >
        <div className="loading-ring" />
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          <div className="loading-dot" />
          <div className="loading-dot" />
          <div className="loading-dot" />
        </div>
        <span className="loading-label">Please wait</span>
      </div>
    </>
  );
};

export default Loading;

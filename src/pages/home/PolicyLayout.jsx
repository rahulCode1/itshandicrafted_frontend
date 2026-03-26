// PolicyLayout.jsx
const PolicyLayout = ({ title, children }) => {
  return (
    <div className="bg-light min-vh-100 py-4 mb-5">
      <div className="container">
        <div className="card shadow-sm border-0 rounded-4 p-4 p-md-5">
          <h1 className="fw-bold mb-4 text-center">{title}</h1>
          <div className="text-secondary" style={{ lineHeight: 1.8 }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyLayout;
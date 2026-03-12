const NotFound = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-lg">
              <div className="card-body text-center py-5 px-4">
                <div className="mb-4">
                  <span className="display-1 fw-bold text-danger">404</span>
                </div>

                <h2 className="h3 fw-bold mb-3">Oops! Page Not Found</h2>

                <p className="text-muted mb-4 lead">
                  The page you're looking for doesn't exist or has been moved.
                </p>

                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  <a href="/" className="btn btn-primary btn-lg px-4">
                    Back to Home
                  </a>

                  <button
                    onClick={() => window.history.back()}
                    className="btn btn-outline-secondary btn-lg px-4"
                  >
                    Go Back
                  </button>
                </div>

                <div className="mt-5 pt-4 border-top">
                  <p className="text-muted small mb-2">Need help?</p>
                  <div className="d-flex gap-3 justify-content-center">
                    <a href="/contact" className="text-decoration-none">
                      Contact Us
                    </a>
                    <span className="text-muted">•</span>
                    <a href="/help" className="text-decoration-none">
                      Help Center
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

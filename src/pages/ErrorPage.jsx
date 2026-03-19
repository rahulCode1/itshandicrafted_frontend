import { isRouteErrorResponse, useRouteError, Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "Please try again later.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 500) {
      message = error.data?.message || "Internal server error occurred.";
    }

    if (error.status === 404) {
      title = "Not found";
      message = "Could not find resource or page.";
    }
  }

  return (
    <>
      <Header />
      <main className="container text-center mt-5">
        <h1 className="display-5 fw-bold text-danger mb-3">{title}</h1>

        <p className="text-muted mb-4">{message}</p>

        <div className="d-flex justify-content-center gap-3">
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="btn btn-outline-secondary"
          >
            Retry
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ErrorPage;

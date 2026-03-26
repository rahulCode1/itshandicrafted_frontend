import PolicyLayout from "./PolicyLayout";

const Contact = () => {
  return (
    <PolicyLayout title="Contact Us">
      <div className="row g-4 text-center">

        <div className="col-md-4">
          <div className="p-3 border rounded-3">
            <i className="bi bi-envelope fs-3 text-primary"></i>
            <h6 className="fw-bold mt-2">Email</h6>
            <p className="mb-0">rahul50665@gmail.com</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-3 border rounded-3">
            <i className="bi bi-telephone fs-3 text-success"></i>
            <h6 className="fw-bold mt-2">Phone</h6>
            <p className="mb-0">+91 6377408633</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-3 border rounded-3">
            <i className="bi bi-geo-alt fs-3 text-danger"></i>
            <h6 className="fw-bold mt-2">Address</h6>
            <p className="mb-0">Kishangarh, Rajasthan, India</p>
          </div>
        </div>

      </div>
    </PolicyLayout>
  );
};

export default Contact;
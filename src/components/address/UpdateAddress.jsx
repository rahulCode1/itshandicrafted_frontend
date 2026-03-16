import { useNavigate, useParams, Form } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import {
  updateAddressAsync,
  fetchUserAddressAsync,
  clearError,
} from "../../features/address/addressSlice";
import { indianStates } from "../../data/states";
import ErrorModal from "../ErrorModal";

const UpdateAddress = ({ addressInfo }) => {
  const { updateAddressLoading, error } = useSelector((state) => state.address);

  const addressId = useParams().id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitToUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const addressData = Object.fromEntries(formData);

    const toastId = toast.loading("Updating address...");
    try {
      const response = await dispatch(
        updateAddressAsync({
          ...addressData,
          addressId,
        }),
      ).unwrap();

      

      toast.success(response.message || "Address updated successfully.", {
        id: toastId,
      });

      navigate(`/address`);
    } catch (error) {
      console.log(error);
      toast.error(error || "Failed to update address.", { id: toastId });
    }
  };

  useEffect(() => {
    dispatch(fetchUserAddressAsync());
  }, [dispatch]);

  return (
    <>
      <main
        style={{
          background: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 100%)",
          minHeight: "100vh",
          padding: "2rem 0",
          marginBottom: "5em"
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-7">
              {/* Card Wrapper */}
              <div
                className="bg-white p-4 p-md-5"
                style={{
                  borderRadius: 20,
                  boxShadow: "0 8px 32px rgba(79,70,229,0.1)",
                  border: "1px solid #ede9fe",
                }}
              >
                {/* Header */}
                <div
                  className="d-flex align-items-center gap-3 mb-4 pb-3"
                  style={{ borderBottom: "1.5px dashed #ddd6fe" }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                    }}
                  >
                    <i
                      className="bi bi-geo-alt-fill text-white"
                      style={{ fontSize: 18 }}
                    ></i>
                  </div>
                  <div>
                    <h1
                      className="fw-bold mb-0"
                      style={{
                        fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
                        color: "#1e1b4b",
                        letterSpacing: "-0.4px",
                      }}
                    >
                      Update Address
                    </h1>
                    <p className="text-muted mb-0 small">
                      Keep your delivery address up to date
                    </p>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <ErrorModal
                    message={error}
                    onClose={() => dispatch(clearError())}
                  />
                )}

                <Form onSubmit={submitToUpdate}>
                  {/* Full Name */}
                  <div className="mb-3">
                    <label
                      htmlFor="name"
                      className="form-label fw-semibold small text-uppercase"
                      style={{ color: "#4f46e5", letterSpacing: "0.6px" }}
                    >
                      <i className="bi bi-person-fill me-1"></i> Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      defaultValue={addressInfo?.name}
                      className="form-control"
                      required
                      style={{
                        borderRadius: 10,
                        border: "1.5px solid #ddd6fe",
                        padding: "0.6rem 1rem",
                        fontSize: "0.95rem",
                        color: "#1e1b4b",
                      }}
                    />
                  </div>

                  {/* Phone + Zip */}
                  <div className="row g-3 mb-3">
                    <div className="col-12 col-sm-6">
                      <label
                        htmlFor="phoneNumber"
                        className="form-label fw-semibold small text-uppercase"
                        style={{ color: "#4f46e5", letterSpacing: "0.6px" }}
                      >
                        <i className="bi bi-telephone-fill me-1"></i> Phone
                        Number
                      </label>
                      <input
                        type="number"
                        id="phoneNumber"
                        name="phoneNumber"
                        defaultValue={addressInfo?.phoneNumber}
                        required
                        minLength={10}
                        maxLength={10}
                        className="form-control"
                        style={{
                          borderRadius: 10,
                          border: "1.5px solid #ddd6fe",
                          padding: "0.6rem 1rem",
                          fontSize: "0.95rem",
                          color: "#1e1b4b",
                        }}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label
                        htmlFor="zipCode"
                        className="form-label fw-semibold small text-uppercase"
                        style={{ color: "#4f46e5", letterSpacing: "0.6px" }}
                      >
                        <i className="bi bi-mailbox-flag me-1"></i> Zip Code
                      </label>
                      <input
                        type="number"
                        id="zipCode"
                        name="zipCode"
                        defaultValue={addressInfo?.zipCode}
                        required
                        className="form-control"
                        style={{
                          borderRadius: 10,
                          border: "1.5px solid #ddd6fe",
                          padding: "0.6rem 1rem",
                          fontSize: "0.95rem",
                          color: "#1e1b4b",
                        }}
                      />
                    </div>
                  </div>

                  {/* Area + City */}
                  <div className="row g-3 mb-3">
                    <div className="col-12 col-sm-6">
                      <label
                        htmlFor="area"
                        className="form-label fw-semibold small text-uppercase"
                        style={{ color: "#4f46e5", letterSpacing: "0.6px" }}
                      >
                        <i className="bi bi-map-fill me-1"></i> Area
                      </label>
                      <input
                        type="text"
                        id="area"
                        name="area"
                        defaultValue={addressInfo?.area}
                        required
                        className="form-control"
                        style={{
                          borderRadius: 10,
                          border: "1.5px solid #ddd6fe",
                          padding: "0.6rem 1rem",
                          fontSize: "0.95rem",
                          color: "#1e1b4b",
                        }}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label
                        htmlFor="city"
                        className="form-label fw-semibold small text-uppercase"
                        style={{ color: "#4f46e5", letterSpacing: "0.6px" }}
                      >
                        <i className="bi bi-buildings-fill me-1"></i> City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        defaultValue={addressInfo?.city}
                        required
                        className="form-control"
                        style={{
                          borderRadius: 10,
                          border: "1.5px solid #ddd6fe",
                          padding: "0.6rem 1rem",
                          fontSize: "0.95rem",
                          color: "#1e1b4b",
                        }}
                      />
                    </div>
                  </div>

                  {/* Full Address */}
                  <div className="mb-3">
                    <label
                      htmlFor="fullAddress"
                      className="form-label fw-semibold small text-uppercase"
                      style={{ color: "#4f46e5", letterSpacing: "0.6px" }}
                    >
                      <i className="bi bi-house-door-fill me-1"></i> Full
                      Address
                    </label>
                    <textarea
                      id="fullAddress"
                      defaultValue={addressInfo?.fullAddress}
                      required
                      name="fullAddress"
                      className="form-control"
                      rows={3}
                      placeholder="Enter your full address with House number, Street, Near landmark"
                      style={{
                        borderRadius: 10,
                        border: "1.5px solid #ddd6fe",
                        padding: "0.6rem 1rem",
                        fontSize: "0.95rem",
                        color: "#1e1b4b",
                        resize: "vertical",
                      }}
                    ></textarea>
                  </div>

                  {/* State */}
                  <div className="mb-4">
                    <label
                      htmlFor="state"
                      className="form-label fw-semibold small text-uppercase"
                      style={{ color: "#4f46e5", letterSpacing: "0.6px" }}
                    >
                      <i className="bi bi-globe-asia-australia me-1"></i> Select
                      State
                    </label>
                    <select
                      id="state"
                      required
                      name="state"
                      className="form-select"
                      defaultValue={addressInfo?.state}
                      style={{
                        borderRadius: 10,
                        border: "1.5px solid #ddd6fe",
                        padding: "0.6rem 1rem",
                        fontSize: "0.95rem",
                        color: "#1e1b4b",
                      }}
                    >
                      <option value={""} disabled selected>
                        Select Your State
                      </option>
                      {indianStates.map((state, index) => (
                        <option key={index} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      borderTop: "1.5px dashed #ddd6fe",
                      marginBottom: "1.25rem",
                    }}
                  />

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={updateAddressLoading === "loading"}
                    className="btn w-100 fw-semibold py-2 text-white"
                    style={{
                      background: "linear-gradient(135deg, #1e1b4b, #4f46e5)",
                      border: "none",
                      borderRadius: 10,
                      fontSize: "1rem",
                      letterSpacing: "0.3px",
                      opacity: updateAddressLoading === "loading" ? 0.7 : 1,
                      transition: "opacity 0.2s",
                    }}
                  >
                    {updateAddressLoading === "loading" ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle-fill me-2"></i>
                        Update Address
                      </>
                    )}
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UpdateAddress;

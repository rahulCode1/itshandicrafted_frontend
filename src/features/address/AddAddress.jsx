import { toast } from "react-hot-toast";
import { useState } from "react";
import { indianStates } from "../../data/states";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorModal from "../../components/ErrorModal";
import { addNewAddressAsync, clearError } from "./addressSlice";
import { useDispatch, useSelector } from "react-redux";

const AddAddress = () => {
  const initialValue = {
    name: "",
    phoneNumber: "",
    zipCode: "",
    area: "",
    city: "",
    fullAddress: "",
    state: "",
  };
  const [formData, setFormData] = useState(initialValue);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const redirectTo = location.state?.from || "/address";
  const { addNewAddressLoading, error } = useSelector((state) => state.address);

  const handleOnChange = (e) => {
    setFormData((prevStat) => ({
      ...prevStat,
      [e.target.id]: e.target.value,
    }));
  };

  

  const submitAddress = async (e) => {
    e.preventDefault();
    const tostId = toast.loading("Adding Addresses...");

    try {
      await dispatch(addNewAddressAsync({ ...formData })).unwrap();

      navigate(redirectTo);

      toast.success("Address added successfully.", { id: tostId });
    } catch (error) {
      toast.error(error || "Something went wrong while add new address", {
        id: tostId,
      });
    }
  };

  return (
    <main className="container py-4 py-md-5" style={{ maxWidth: 680 , marginBottom: "5em"}}>
      {addNewAddressLoading === "loading" && (
        <div className="overlay">
          <Loading />
        </div>
      )}
      {error && (
        <ErrorModal message={error} onClose={() => dispatch(clearError())} />
      )}

      {/* ── Page Header ── */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <div
          className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
          style={{
            width: 48,
            height: 48,
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            boxShadow: "0 4px 14px rgba(79,70,229,0.3)",
          }}
        >
          <i className="bi bi-geo-alt-fill text-white fs-5"></i>
        </div>
        <div>
          <h4
            className="fw-bold mb-0"
            style={{ color: "#1e1b4b", letterSpacing: "-0.4px" }}
          >
            Add New Address
          </h4>
          <span className="text-muted" style={{ fontSize: "0.83rem" }}>
            Fill in your delivery details below
          </span>
        </div>
      </div>

      {/* ── Form Card ── */}
      <div
        className="card border-0 rounded-4 overflow-hidden"
        style={{
          boxShadow: "0 4px 24px rgba(79,70,229,0.09)",
          border: "1.5px solid #ede9fe",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            height: 4,
            background: "linear-gradient(90deg, #4f46e5, #7c3aed, #a855f7)",
          }}
        />

        <div className="card-body p-4 p-md-5">
          <form onSubmit={submitAddress}>
            {/* Full Name */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="form-label fw-semibold"
                style={{ fontSize: "0.85rem", color: "#374151" }}
              >
                <i
                  className="bi bi-person-fill me-2"
                  style={{ color: "#4f46e5" }}
                ></i>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleOnChange}
                placeholder="Enter your full name"
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

            {/* Phone + ZIP */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-sm-6">
                <label
                  htmlFor="phoneNumber"
                  className="form-label fw-semibold"
                  style={{ fontSize: "0.85rem", color: "#374151" }}
                >
                  <i
                    className="bi bi-telephone-fill me-2"
                    style={{ color: "#4f46e5" }}
                  ></i>
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
                      fontSize: "0.88rem",
                    }}
                  >
                    +91
                  </span>
                  <input
                    type="number"
                    id="phoneNumber"
                    onChange={handleOnChange}
                    value={formData.phoneNumber}
                    minLength={10}
                    maxLength={10}
                    placeholder="10-digit number"
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
              <div className="col-12 col-sm-6">
                <label
                  htmlFor="zipCode"
                  className="form-label fw-semibold"
                  style={{ fontSize: "0.85rem", color: "#374151" }}
                >
                  <i
                    className="bi bi-mailbox-fill me-2"
                    style={{ color: "#4f46e5" }}
                  ></i>
                  ZIP Code
                </label>
                <input
                  type="number"
                  id="zipCode"
                  onChange={handleOnChange}
                  value={formData.zipCode}
                  required
                  placeholder="e.g. 400001"
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
            </div>

            {/* Area + City */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-sm-6">
                <label
                  htmlFor="area"
                  className="form-label fw-semibold"
                  style={{ fontSize: "0.85rem", color: "#374151" }}
                >
                  <i
                    className="bi bi-map-fill me-2"
                    style={{ color: "#4f46e5" }}
                  ></i>
                  Area
                </label>
                <input
                  type="text"
                  id="area"
                  onChange={handleOnChange}
                  value={formData.area}
                  required
                  placeholder="e.g. Andheri West"
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
              <div className="col-12 col-sm-6">
                <label
                  htmlFor="city"
                  className="form-label fw-semibold"
                  style={{ fontSize: "0.85rem", color: "#374151" }}
                >
                  <i
                    className="bi bi-building-fill me-2"
                    style={{ color: "#4f46e5" }}
                  ></i>
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  onChange={handleOnChange}
                  value={formData.city}
                  required
                  placeholder="e.g. Mumbai"
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
            </div>

            {/* Full Address */}
            <div className="mb-4">
              <label
                htmlFor="fullAddress"
                className="form-label fw-semibold"
                style={{ fontSize: "0.85rem", color: "#374151" }}
              >
                <i
                  className="bi bi-geo-alt-fill me-2"
                  style={{ color: "#4f46e5" }}
                ></i>
                Full Address
              </label>
              <textarea
                id="fullAddress"
                onChange={handleOnChange}
                value={formData.fullAddress}
                required
                rows={3}
                className="form-control rounded-3"
                placeholder="House no., Street, Near landmark..."
                style={{
                  border: "1.5px solid #ddd6fe",
                  background: "#f5f3ff",
                  fontSize: "0.92rem",
                  padding: "0.6rem 0.9rem",
                  color: "#1e1b4b",
                  resize: "vertical",
                }}
              ></textarea>
            </div>

            {/* State */}
            <div className="mb-4">
              <label
                htmlFor="state"
                className="form-label fw-semibold"
                style={{ fontSize: "0.85rem", color: "#374151" }}
              >
                <i
                  className="bi bi-flag-fill me-2"
                  style={{ color: "#4f46e5" }}
                ></i>
                State
              </label>
              <select
                id="state"
                onChange={handleOnChange}
                required
                className="form-select rounded-3"
                style={{
                  border: "1.5px solid #ddd6fe",
                  background: "#f5f3ff",
                  fontSize: "0.92rem",
                  padding: "0.6rem 0.9rem",
                  color: "#1e1b4b",
                }}
              >
                <option value="" disabled>
                  Select your state
                </option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* Divider */}
            <div
              style={{ borderTop: "2px dashed #ddd6fe", marginBottom: 24 }}
            />

            {/* Submit */}
            <button
              disabled={addNewAddressLoading === "loading"}
              type="submit"
              className="btn w-100 fw-bold py-3 rounded-3 d-flex align-items-center justify-content-center gap-2"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                border: "none",
                color: "#fff",
                fontSize: "0.95rem",
                letterSpacing: "0.02em",
                boxShadow: "0 4px 16px rgba(79,70,229,0.3)",
              }}
            >
              <i className="bi bi-plus-circle-fill fs-6"></i>
              {addNewAddressLoading === "loading" ? "Saving…" : "Save Address"}
              {addNewAddressLoading === "loading" && (
                <span className="spinner-border spinner-border-sm ms-1" />
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AddAddress;

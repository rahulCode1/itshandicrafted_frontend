import { toast } from "react-hot-toast";
import { useState } from "react";
import { indianStates } from "../../data/states";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorModal from "../../components/ErrorModal";
import { addNewAddressAsync } from "./addressSlice";
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
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const redirectTo = location.state?.from || "user";
  const { addNewAddressLoading } = useSelector((state) => state.address);

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
      await dispatch(
        addNewAddressAsync({ ...formData, userId: "69a870245630f0e4e469fc6e" }),
      ).unwrap();
      navigate(redirectTo);

      toast.success("Address added successfully.", { id: tostId });
    } catch (error) {
      toast.error(error || "Something went wrong while add new address", {
        id: tostId,
      });
    }
  };

  return (
    <main className="container">
      <h1>Address </h1>
      {addNewAddressLoading === "loading" && (
        <div className="overlay">
          <Loading />
        </div>
      )}
      {error && <ErrorModal message={error} onClose={() => setError("")} />}
      <form onSubmit={submitAddress}>
        <div className="mb-2">
          <label
            htmlFor="name"
            className="form-labe "
            onChange={handleOnChange}
          >
            Full Name:
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            className="form-control"
            onChange={handleOnChange}
            required
            placeholder="Enter your full name."
          />
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-2">
              <label htmlFor="phoneNumber" className="form-labe ">
                Phone number:
              </label>
              <input
                type="number"
                id="phoneNumber"
                onChange={handleOnChange}
                value={formData.phoneNumber}
                minLength={10}
                maxLength={10}
                required
                placeholder="Enter your 10 digits phone number."
                className="form-control"
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-2">
              <label htmlFor="zipCode" className="form-labe ">
                Zip Code:
              </label>
              <input
                type="number"
                id="zipCode"
                onChange={handleOnChange}
                value={formData.zipCode}
                required
                placeholder="Enter your zipcode."
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-2">
              <label htmlFor="area" className="form-labe ">
                Area:
              </label>
              <input
                type="text"
                id="area"
                onChange={handleOnChange}
                value={formData.area}
                required
                placeholder="Enter your area name."
                className="form-control"
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-2">
              <label htmlFor="city" className="form-labe ">
                City:
              </label>
              <input
                type="text"
                id="city"
                onChange={handleOnChange}
                value={formData.city}
                required
                placeholder="Enter your city name."
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="fullAddress" className="form-labe ">
            Write your full address:
          </label>
          <textarea
            id="fullAddress"
            onChange={handleOnChange}
            value={formData.fullAddress}
            required
            className="form-control"
            placeholder="Enter you full address with House number, Street, Near landmark"
          ></textarea>
        </div>

        <div className="mb-2">
          <label htmlFor="state">Select State: </label>
          <select
            id="state"
            onChange={handleOnChange}
            required
            className="form-select"
          >
            <option value={""} disabled>
              Select Your State
            </option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <button
          disabled={addNewAddressLoading === "loading"}
          type="submit"
          className="btn btn-primary my-3"
        >
          Add Address
        </button>
      </form>
    </main>
  );
};

export default AddAddress;

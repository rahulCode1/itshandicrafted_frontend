import { useEffect } from "react";
import { indianStates } from "../../data/states";
import { useLoaderData, useNavigate, useParams, Form } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  updateAddressAsync,
  fetchUserAddressAsync,
} from "./addressSlice";

const UpdateAddress = () => {
  const { updateAddressLoading } = useSelector((state) => state.address);

  const addressId = useParams().id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useLoaderData();
  const addressInfo = data.data.address;

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
          userId: addressInfo.userId,
        }),
      ).unwrap();

      toast.success(response.msg || "Address updated successfully.", {
        id: toastId,
      });

      navigate(`/allAddress`);
    } catch (error) {
      console.log(error);
      toast.error(error || "Failed to update address.");
    }
  };

  useEffect(() => {
    dispatch(fetchUserAddressAsync());
  }, [dispatch]);

  return (
    <main className="container">
      <h1>Update Address </h1>

      <Form onSubmit={submitToUpdate}>
        <div className="mb-2">
          <label htmlFor="name" className="F-labe ">
            Full Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={addressInfo?.name}
            className="form-control"
            required
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
                name="phoneNumber"
                defaultValue={addressInfo?.phoneNumber}
                required
                minLength={10}
                maxLength={10}
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
                name="zipCode"
                defaultValue={addressInfo?.zipCode}
                required
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
                name="area"
                defaultValue={addressInfo?.area}
                required
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
                name="city"
                defaultValue={addressInfo?.city}
                required
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
            defaultValue={addressInfo?.fullAddress}
            required
            name="fullAddress"
            className="form-control"
            placeholder="Enter you full address with House number, Street, Near landmark"
          ></textarea>
        </div>

        <div className="mb-2">
          <label htmlFor="state">Select State: </label>
          <select
            id="state"
            required
            name="state"
            className="form-select"
            defaultValue={addressInfo?.state}
          >
            <option value={""} disabled selected>
              Select Your State
            </option>
            {indianStates.map((state) => (
              <option value={state}>{state}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={updateAddressLoading === "loading"}
          className="btn btn-primary my-3"
        >
          Update Address
        </button>
      </Form>
    </main>
  );
};

export default UpdateAddress;

export const loader = async ({ request, params }) => {
  const addressId = params.id;

  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}address/address_info/${addressId}`,
  );

  if (!response.ok) {
    throw new Response(
      JSON.stringify(
        { message: "Error occurred while fetching address details." },
        { status: 500 },
      ),
    );
  } else {
    return response;
  }
};

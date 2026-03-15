import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";

import { privateApi } from "../../utils/axios";
import UpdateAddress from "../../components/address/UpdateAddress";
import Loading from "../../components/Loading";

const UpdateAddressPage = () => {
  const { address } = useLoaderData();

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={address}>
        {(isAddressLoad) => (
          <UpdateAddress addressInfo={isAddressLoad.address} />
        )}
      </Await>
    </Suspense>
  );
};

export default UpdateAddressPage;

const address = async (addressId) => {
  try {
    const response = await privateApi.get(`address/address_info/${addressId}`);

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const loader = async ({ request, params }) => {
  const addressId = params.id;

  return {
    address: address(addressId),
  };
};

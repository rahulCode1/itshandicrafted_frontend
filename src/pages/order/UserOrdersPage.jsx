import { Await, useLoaderData } from "react-router-dom";
import { API } from "../../utils/axios";
import UserOrders from "../../components/order/UserOrders";

const UserOrdersPage = () => {
  const { userOrders } = useLoaderData();

  return (
    <>
      <Await resolve={userOrders}>
        {(isOrdersLoad) => <UserOrders userOrders={isOrdersLoad.orders} />}
      </Await>
    </>
  );
};

export default UserOrdersPage;

const userOrders = async () => {
  try {
    const res = await API.get(`order/69a870245630f0e4e469fc6e`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const loader = async () => {
  return {
    userOrders: userOrders(),
  };
};

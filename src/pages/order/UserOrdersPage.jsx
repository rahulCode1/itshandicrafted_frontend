import { Await, useLoaderData } from "react-router-dom";
import { privateApi } from "../../utils/axios";
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
    const res = await privateApi.get(`order/getUserOrders`);

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

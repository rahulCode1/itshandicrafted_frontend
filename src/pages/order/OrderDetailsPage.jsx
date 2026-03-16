import { Await, useLoaderData } from "react-router-dom";
import { privateApi } from "../../utils/axios";
import OrderDetails from "../../components/order/OrderDetails";
import { Suspense } from "react";
import Loading from "../../components/Loading";

const OrderDetailsPage = () => {
  const { orderDetails } = useLoaderData();

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={orderDetails}>
        {(isOrderLoad) => <OrderDetails order={isOrderLoad?.order} />}
      </Await>
    </Suspense>
  );
};

export default OrderDetailsPage;

const orderDetails = async (orderId) => {
  try {
    const res = await privateApi.get(
      `/order/${orderId}/details`,
    );
  
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const loader = async ({ request, params }) => {
  const orderId = params.id;

  return {
    orderDetails: orderDetails(orderId),
  };
};

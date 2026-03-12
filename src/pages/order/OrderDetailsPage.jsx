import { Await, useLoaderData } from "react-router-dom";
import { API } from "../../utils/axios";
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
    const res = await API.get(
      `order/${orderId}/details?userId=69a870245630f0e4e469fc6e`,
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

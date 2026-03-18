import { Await, useLoaderData } from "react-router-dom";
import {  privateApi } from "../../utils/axios";
import BuyNow from "../../components/order/BuyNow";
import { Suspense } from "react";
import Loading from "../../components/Loading";

const BuyNowPage = () => {
  const { buyNow } = useLoaderData();

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={buyNow}>
        {(isDataLoad) => <BuyNow info={isDataLoad.item} />}
      </Await>
    </Suspense>
  );
};

export default BuyNowPage;

const buyNowItem = async () => {
  try {
    const res = await privateApi.get(`/order/getBuyNowItem`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const loader = async () => {
  return {
    buyNow: buyNowItem(),
  };
};

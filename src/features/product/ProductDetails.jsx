import { Await, useLoaderData } from "react-router-dom";
import ProductItem from "../../components/product/ProductItem";
import { Suspense } from "react";
import Loading from "../../components/Loading";
import { API } from "../../utils/axios";

const ProductDetails = () => {
  const { product } = useLoaderData();

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={product}>
        {(isProductDetails) => <ProductItem productData={isProductDetails} />}
      </Await>
    </Suspense>
  );
};

export default ProductDetails;

const productDetails = async (productId) => {
  try {
    const res = await API.get(`/product/${productId}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const loader = async ({ request, params }) => {
  const productId = params.id;

  return {
    product: productDetails(productId),
  };
};

import { Await, useLoaderData } from "react-router-dom";
import ProductItem from "../../components/product/ProductItem";
import { Suspense } from "react";
import Loading from "../../components/Loading";

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
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}product/${productId}`,
  );

  if (!response.ok) {
    throw new Response(
      JSON.stringify(
        { message: "Error occurred while fetching product details." },
        { status: 500 },
      ),
    );
  } else {
    const data = await response.json();

    return data;
  }
};

export const loader = async ({ request, params }) => {
  const productId = params.id;

  return {
    product: productDetails(productId),
  };
};

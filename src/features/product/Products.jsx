import { Await, useLoaderData } from "react-router-dom";

import ProductsList from "./ProductsList";
import { Suspense } from "react";
import Loading from "../../components/Loading";

const Products = () => {
  const { products } = useLoaderData();

  

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Await resolve={products}>
          {(isLoadingProducts) => (
            <ProductsList productsList={isLoadingProducts} />
          )}
        </Await>
      </Suspense>
    </>
  );
};

export default Products;

const products = async () => {
  let url = `${process.env.REACT_APP_BACKEND_URL}products`;

  try {
    const res = await fetch(url);

    const data = await res.json();
    if (!res.ok) {
      throw new Response(
        JSON.stringify({
          message: data.message || "Error occurred while fetching products.",
        }),
        { status: data.status || 500 }
      );
    }

    const products = data.data?.products;
    return products;
  } catch (error) {
    console.error(error || "Failed to fetch products:");
  }
};

export const loader = async () => {
  return {
    products: products(),
  };
};

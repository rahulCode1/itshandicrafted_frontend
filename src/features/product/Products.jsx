import { Await, useLoaderData } from "react-router-dom";
import { API } from "../../utils/axios";

import ProductsList from "./ProductsList";
import { Suspense } from "react";
import Loading from "../../components/Loading";

const Products = () => {
  const { products } = useLoaderData();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Await resolve={products}>
          {(isLoadProducts) => (
            <ProductsList productsList={isLoadProducts} />
          )}
        </Await>
      </Suspense>
    </>
  );
};

export default Products;

const products = async () => {
  try {
    const res = await API.get("/products");

    const products = res.data?.products;
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

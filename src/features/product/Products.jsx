import ProductsList from "./ProductsList";
import Loading from "../../components/Loading";
import { useSelector } from "react-redux";

const Products = () => {
  const { products, fetchAllProductLoading } = useSelector(
    (state) => state.product,
  );

  

  return (
    <>
      {fetchAllProductLoading === "loading" ? (
        <Loading />
      ) : (
        <ProductsList productsList={products} />
      )}
    </>
  );
};

export default Products;


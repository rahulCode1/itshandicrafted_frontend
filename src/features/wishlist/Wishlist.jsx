import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addOrRemoveWishlistAsync, wishlistToCartAsync } from "./wishlistSlice";
import { toast } from "react-hot-toast";
import { addToCart } from "../cart/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();

  const {
    wishlist,
    getWishlistLoading,
    addOrRemoveWishlistLoading,
    moveToCartLoading,
  } = useSelector((state) => state.wishlist);

  const handleRemoveToWishList = async (productId) => {
    const toastId = toast.loading("Removing from wishlist...");
    try {
      const res = await dispatch(
        addOrRemoveWishlistAsync({ productId }),
      ).unwrap();
      toast.success(res.message || "Product removed from wishlist.", {
        id: toastId,
      });
    } catch (error) {
      toast.error(error || "Failed to Product removed from wishlist.", {
        id: toastId,
      });
      console.log(error);
    }
  };

  const handleWishListToCart = async (product) => {
    const toastId = toast.loading("Moving to cart...");
    try {
      dispatch(addToCart({ ...product, quantity: 1 }));
      const res = await dispatch(
        wishlistToCartAsync({ productId: product.id }),
      ).unwrap();
      toast.success(res.message || "Product moved to Cart.", {
        id: toastId,
      });
    } catch (error) {
      toast.error(error || "Failed to Product move to cart.", {
        id: toastId,
      });
      console.log(error);
    }
  };

  return (
    <main className="container py-4">
      <h1 className="mb-4">My Wishlist</h1>

      {getWishlistLoading === "loading" ? (
        <Loading />
      ) : (
        <div className="row g-4">
          {wishlist && wishlist.length > 0 ? (
            wishlist.map((product) => (
              <div className="col-md-4" key={product.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={product.images[0].url}
                    className="card-img-top object-fit-cover"
                    style={{ height: "250px" }}
                    alt={product.name}
                  />

                  <div className="card-body text-center d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="mb-3">Price: ₹{product.price}</p>

                    <div className="mt-auto">
                      <button
                        disabled={moveToCartLoading === "loading"}
                        onClick={() => handleWishListToCart(product)}
                        className="btn btn-primary w-100 mb-2"
                      >
                        Move to Cart
                      </button>

                      <button
                        disabled={addOrRemoveWishlistLoading === "loading"}
                        onClick={() => handleRemoveToWishList(product.id)}
                        className="btn btn-outline-danger w-100"
                      >
                        Remove from Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products on wishlist.</p>
          )}
        </div>
      )}
    </main>
  );
};

export default Wishlist;

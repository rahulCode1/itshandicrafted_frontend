import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setDefaultAddressAsync } from "../features/address/addressSlice";
import { API } from "../utils/axios";

const EcommerceContext = createContext();

export const useEcommerce = () => useContext(EcommerceContext);

const EcommerceProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleSelectDefaultAddress = async (addressId) => {
    const toastId = toast.loading("Setting default address...");
    try {
      const res = dispatch(setDefaultAddressAsync(addressId)).unwrap();
      toast.success(res.msg || "Status updated successfully.", { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error(error || "Status updated successfully.", { id: toastId });
    }
  };

  const handleCancelOrder = async (id, revalidator) => {
    const toastId = toast.loading("Order cancel...");
    try {
      setIsLoading(true);
      await API.patch(`order/${id}/cancel`);
      revalidator.revalidate();

      toast.success("Order canceled successfully.", { id: toastId });
    } catch (error) {
      toast.error("Error occurred while cancel order.", { id: toastId });
      throw new Error("Failed to cancel order.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EcommerceContext.Provider
      value={{
        error,
        setError,
        isLoading,
        setIsLoading,
        handleCancelOrder,
        searchText,
        setSearchText,
        handleSelectDefaultAddress,
      }}
    >
      {children}
    </EcommerceContext.Provider>
  );
};
export default EcommerceProvider;

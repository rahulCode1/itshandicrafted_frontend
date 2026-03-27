import { privateApi } from "../../utils/axios";
import UserProfile from "../../components/user/UserProfile";
import {  useEffect } from "react";
import Loading from "../../components/Loading";
import { useState } from "react";
import ErrorModal from "../../components/ErrorModal";

const UserProfilePage = () => {
  const [userDetails, setUser] = useState({
    name: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleFetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await privateApi.get("/user/userDetails");

        const user = res.data?.user;
        setUser({ name: user.name, phoneNumber: user.phoneNumber });
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message || "Failed to fetch user.");
      } finally {
        setIsLoading(false);
      }
    };

    handleFetchUser();
  }, []);



  return (
    <>
      {error && <ErrorModal />}
      {isLoading ? <Loading /> : <UserProfile user={userDetails} />}
    </>
  );
};

export default UserProfilePage;


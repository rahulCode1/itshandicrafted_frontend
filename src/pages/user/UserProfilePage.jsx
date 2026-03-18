import { Await, useLoaderData } from "react-router-dom";
import { privateApi } from "../../utils/axios";
import UserProfile from "../../components/user/UserProfile";
import { Suspense } from "react";
import Loading from "../../components/Loading";

const UserProfilePage = () => {
  const { user } = useLoaderData();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Await resolve={user}>
          {(isUserLoad) => <UserProfile user={isUserLoad.user} />}
        </Await>
      </Suspense>
    </>
  );
};

export default UserProfilePage;

const user = async () => {
  try {
    const res = await privateApi.get("/user/userDetails");

   
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const loader = async () => {
  return {
    user: user(),
  };
};

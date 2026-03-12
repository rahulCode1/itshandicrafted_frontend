import { Outlet, useNavigation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Footer from "./Footer";
const Layout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      <Header />
      {isLoading && <div className="global-loader">Loading...</div>}
      <Toaster position="top-center" />
      <Outlet />

      <Footer />
    </>
  );
};
export default Layout;

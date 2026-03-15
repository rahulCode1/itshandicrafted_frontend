import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  sentOtpAsync,
  verifyOtpAsync,
  setIsOtpSent,
  reSentOtpAsync,
  clearError,
} from "./userSlice";
import SentOtp from "./SentOtp";
import VerifyOtp from "./VerifyOtp";
import { toast } from "react-hot-toast";
import ErrorModal from "../../components/ErrorModal";
import { getAllWishlistAsync } from "../wishlist/wishlistSlice";
import { getAllCartAsync } from "../cart/cartSlice";

const LoginWithOtp = () => {
  const initialValue = {
    name: "",
    phoneNumber: "",
  };

  const [formData, setFormData] = useState(initialValue);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(10);
  const [isDisabledBtn, setIsBtnDisabled] = useState(true);
  const { isOtpSent, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData((prevStat) => ({
      ...prevStat,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSetTimer = () => {
    setIsBtnDisabled(true);
    setTimer(10);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsBtnDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSentOtp = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Sending OTP...");

    if (formData.name.length === 0) {
      return toast.error("Please enter your name", { id: toastId });
    }

    if (formData.phoneNumber.length < 10) {
      return toast.error("Phone number digits sort then 10.", { id: toastId });
    } else if (formData.phoneNumber.length > 10) {
      return toast.error("Phone number digits more then 10.", { id: toastId });
    }

    try {
      const res = await dispatch(sentOtpAsync(formData)).unwrap();
      handleSetTimer();
      toast.success(res.message || "OTP sent successfully", { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error(error || "Failed to sent otp", { id: toastId });
    }
  };

  const handleResentOtp = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Resending OTP...");
    if (formData.phoneNumber.length !== 10) {
      return toast.error("Phone number 10 digits long.", { id: toastId });
    }

    try {
      const res = await dispatch(
        reSentOtpAsync({ phoneNumber: formData.phoneNumber }),
      ).unwrap();
      handleSetTimer();
      setIsBtnDisabled(true);
      setOtp("");
      toast.success(res.message || "OTP re-sent successfully", { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error(error || "Failed to re-sent otp", { id: toastId });
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Verifying OTP...");
    if (otp.length !== 4) {
      return toast.error("4 digits otp required.", { id: toastId });
    }

    if (formData.phoneNumber.length !== 10) {
      return toast.error("Please enter  phone number", { id: toastId });
    }

    const data = {
      otp,
      phoneNumber: formData.phoneNumber,
    };

    try {
      const res = await dispatch(verifyOtpAsync(data)).unwrap();
      dispatch(setIsOtpSent());
      setFormData(initialValue);
      dispatch(getAllWishlistAsync());
      dispatch(getAllCartAsync());
      toast.success(res.message || "OTP verified successfully", {
        id: toastId,
      });
      navigate("/products");
    } catch (error) {
      console.log(error);
      toast.error(error || "Failed to verify otp", { id: toastId });
    }
  };

  return (
    <main 
    style={{maxWidth: '1200px', margin: 'auto'}}
    >
      {error && (
        <ErrorModal message={error} onClose={() => dispatch(clearError())} />
      )}

      {isOtpSent ? (
        <VerifyOtp
          formData={formData}
          setOtp={setOtp}
          otp={otp}
          timer={timer}
          isDisabledBtn={isDisabledBtn}
          handleVerifyOtp={handleVerifyOtp}
          handleResentOtp={handleResentOtp}
        />
      ) : (
        <SentOtp
          formData={formData}
          handleOnChange={handleOnChange}
          handleSentOtp={handleSentOtp}
        />
      )}
    </main>
  );
};

export default LoginWithOtp;

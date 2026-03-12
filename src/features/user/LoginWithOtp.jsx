import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import {
  sentOtpAsync,
  verifyOtpAsync,
  setIsOtpSent,
  reSentOtpAsync,
} from "./userSlice";
import SentOtp from "./SentOtp";
import VerifyOtp from "./VerifyOtp";
import { toast } from "react-hot-toast";

const LoginWithOtp = () => {
  const initialValue = {
    name: "",
    phoneNumber: "",
  };

  const [formData, setFormData] = useState(initialValue);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(10);
  const [isDisabledBtn, setIsBtnDisabled] = useState(true);
  const { isOtpSent } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    setFormData((prevStat) => ({
      ...prevStat,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSetTimer = () => {
    const timerIntervalId = setInterval(() => {
      setTimer((prevStat) => prevStat - 1);
    }, 1000);
    setTimeout(() => {
      setIsBtnDisabled(false);
      setTimer(10)
      clearInterval(timerIntervalId);
    }, 10000);
  };

  const handleSentOtp = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Sending OTP...");
    if (formData.name.length === 0 || formData.phoneNumber.length !== 10) {
      return toast.error("Please enter name & phone number", { id: toastId });
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
      setIsBtnDisabled(true)
      setOtp("")
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
      toast.success(res.message || "OTP verified successfully", {
        id: toastId,
      });
      navigate('/products')
    } catch (error) {
      console.log(error);
      toast.error(error || "Failed to verify otp", { id: toastId });
    }
  };

  return (
    <main className="container py-4">
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

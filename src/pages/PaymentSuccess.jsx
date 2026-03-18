import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const searchParams = useSearchParams()[0]

  console.log(searchParams[0]);

  return (
    <>
      <h1>ORDER SUCCESSFULL</h1>
      <p>Reference No. ${searchParams.get("reference")}</p>
    </>
  );
};

export default PaymentSuccess;

import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "300px" }}
    >
      <ClipLoader size={50} color="#4f46e5" speedMultiplier={1.3} />
    </div>
  );
};

export default Loading;

import PolicyLayout from "./PolicyLayout";

const Shipping = () => {
  return (
    <PolicyLayout title="Shipping Policy">
      <h5 className="fw-semibold mt-3">Processing Time</h5>
      <p>Orders are processed within 1–3 business days.</p>

      <h5 className="fw-semibold mt-4">Delivery Time</h5>
      <p>Delivery takes 3–7 business days across India.</p>

      <h5 className="fw-semibold mt-4">Shipping Charges</h5>
      <p>Free shipping on most products unless specified.</p>
    </PolicyLayout>
  );
};

export default Shipping;
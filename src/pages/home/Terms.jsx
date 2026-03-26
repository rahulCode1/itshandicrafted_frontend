import PolicyLayout from "./PolicyLayout";

const Terms = () => {
  return (
    <PolicyLayout title="Terms of Service">
      <h5 className="fw-semibold mt-3">Products</h5>
      <p>
        All our products are handcrafted stone items. Slight variations in color,
        texture, and size may occur due to natural materials.
      </p>

      <h5 className="fw-semibold mt-4">Pricing</h5>
      <p>Prices are listed in INR and may change without notice.</p>

      <h5 className="fw-semibold mt-4">Orders</h5>
      <p>We reserve the right to cancel or refuse any order.</p>

      <h5 className="fw-semibold mt-4">Usage</h5>
      <p>You agree not to misuse our website or engage in fraud.</p>
    </PolicyLayout>
  );
};

export default Terms;
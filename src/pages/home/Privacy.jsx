import PolicyLayout from "./PolicyLayout";

const Privacy = () => {
  return (
    <PolicyLayout title="Privacy Policy">
      <h5 className="fw-semibold mt-3">Information We Collect</h5>
      <p>Name, email, phone number, address, and payment details.</p>

      <h5 className="fw-semibold mt-4">Usage</h5>
      <p>Your data is used only to process orders and improve services.</p>

      <h5 className="fw-semibold mt-4">Security</h5>
      <p>We do not sell your data and keep it सुरक्षित (secure).</p>
    </PolicyLayout>
  );
};

export default Privacy;
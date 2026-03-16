import { useEffect, useRef, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loading from "../../components/Loading";
import ErrorModal from "../../components/ErrorModal";
import { useDispatch, useSelector } from "react-redux";
import {
  inputFields,
  seoInputs,
  categoryField,
  ratingField,
  materialTypeField,
} from "../../utils/arrays";
import { addProductAsync, clearError } from "./productSlice";

const AddProducts = () => {
  const initialFormData = {
    name: "",
    shortDescription: "",
    description: "",
    price: "",
    discountPrice: "",
    rating: "",
    costPrice: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    materialType: "",
    care: "",
    category: "",

    metaTitle: "",
    metaDescription: "",
    keywords: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imgPreviewUrl, setImgPreviewUrl] = useState([]);

  const { status, error } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const dispatch = useDispatch();

  const onPickedFile = (event) => {
    const files = Array.from(event.target.files);

    setSelectedFiles(files);

    const previewUrl = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setImgPreviewUrl(previewUrl);
  };

  useEffect(() => {
    return () => {
      imgPreviewUrl.forEach((img) => {
        URL.revokeObjectURL(img.previewUrl);
      });
    };
  }, [imgPreviewUrl]);

  const handleOnChange = (e) => {
    setFormData((prevStat) => ({ ...prevStat, [e.target.id]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const tostId = toast.loading("Adding products...");

    try {
      const appendData = new FormData();

      // basic fields
      appendData.append("name", formData.name);
      appendData.append("shortDescription", formData.shortDescription);
      appendData.append("description", formData.description);
      appendData.append("price", formData.price);
      appendData.append("discountPrice", formData.discountPrice);
      appendData.append("costPrice", formData.costPrice);
      appendData.append("length", formData.length);
      appendData.append("width", formData.width);
      appendData.append("height", formData.height);
      appendData.append("weight", formData.weight);
      appendData.append("materialType", formData.materialType);
      appendData.append("category", formData.category);
      appendData.append("care", formData.care);
      appendData.append("rating", formData.rating);
      appendData.append("metaTitle", formData.metaTitle);
      appendData.append("metaDescription", formData.metaDescription);
      appendData.append("keywords", formData.keywords);

      selectedFiles.forEach((img) => {
        appendData.append("images", img);
      });

      await dispatch(addProductAsync(appendData)).unwrap();

      toast.success("Product added successfully.", { id: tostId });

      setFormData(initialFormData);
      setSelectedFiles([]);
      setImgPreviewUrl([]);
      fileInputRef.current.value = "";

      navigate("/products");
    } catch (error) {
      console.log(error);

      toast.error(error || "An error occurred while add new product.", {
        id: tostId,
      });
    }
  };

  return (
    <>
      {/* <main className="container py-4 " style={{ marginBottom: "5em" }}>
        <h1>Add Product </h1>

        {status === "loading" && (
          <div className="overlay">
            <Loading />
          </div>
        )}

        {status === "error" && (
          <ErrorModal message={error} onClose={() => dispatch(clearError())} />
        )}

        <Form
          onSubmit={handleFormSubmit}
          className="p-4 bg-white shadow-sm rounded"
        >
          <div className="row g-3 mb-4">
            {inputFields.map((field) => (
              <div className="col-md-6" key={field.id}>
                <label htmlFor={field.id} className="form-label fw-semibold">
                  {field.label}
                </label>

                <input
                  type={field.type}
                  id={field.id}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="form-control"
                  value={formData[field.name]}
                  onChange={handleOnChange}
                  required
                />
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="form-label fw-semibold">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              className="form-control"
              rows={8}
              required
              onChange={handleOnChange}
              placeholder="Enter product description"
            />
          </div>

          <div className="mb-4">
            <label htmlFor={ratingField.id} className="form-label fw-semibold">
              {ratingField.label}
            </label>

            <select
              id={ratingField.id}
              name={ratingField.name}
              className="form-select"
              value={formData[ratingField.name]}
              onChange={handleOnChange}
            >
              <option value="" disabled>
                {ratingField.placeholder}
              </option>

              {ratingField.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="row g-3 mb-4">
            {[materialTypeField, categoryField].map((field) => (
              <div className="col-md-6" key={field.id}>
                <label htmlFor={field.id} className="form-label fw-semibold">
                  {field.label}
                </label>

                <select
                  id={field.id}
                  name={field.name}
                  className="form-select"
                  value={formData[field.name]}
                  onChange={handleOnChange}
                  required
                >
                  <option value="" disabled>
                    {field.placeholder}
                  </option>

                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label htmlFor="care" className="form-label fw-semibold">
              Care Instructions
            </label>
            <textarea
              id="care"
              name="care"
              className="form-control"
              rows={8}
              required
              placeholder="Enter product care instructions (comma separated)"
              onChange={handleOnChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="images" className="form-label fw-semibold">
              Image:
            </label>
            <input
              type="file"
              id="images"
              name="images"
              required
              multiple
              accept=".jpg,.png,.jpeg"
              onChange={onPickedFile}
              ref={fileInputRef}
              className="form-control"
            />
          </div>
          <div className=" d-none d-md-flex  flex-row gap-2 flex-wrap">
            {imgPreviewUrl && imgPreviewUrl.length !== 0 ? (
              imgPreviewUrl.map((img, index) => (
                <img
                  key={index}
                  src={img.previewUrl}
                  className="img-fluid rounded shadow mb-2"
                  style={{ width: "200px", objectFit: "cover" }}
                />
              ))
            ) : (
              <p>No images selected.</p>
            )}
          </div>
          <div className="  d-md-none d-flex flex-row gap-1 flex-wrap">
            {imgPreviewUrl && imgPreviewUrl.length !== 0 ? (
              imgPreviewUrl.map((img) => (
                <img
                  src={img.previewUrl}
                  className="img-fluid rounded shadow mb-2"
                  style={{ width: "120px", objectFit: "cover" }}
                />
              ))
            ) : (
              <p>No images selected.</p>
            )}
          </div>

          <hr className="my-5" />

          <h5 className="mb-3 text-primary">SEO Information</h5>

          <div className="row g-3 mb-4">
            {seoInputs.map((field) => (
              <div className="col-md-12" key={field.id}>
                <label htmlFor={field.id} className="form-label fw-semibold">
                  {field.label}
                </label>

                <input
                  type={field.type}
                  id={field.id}
                  name={field.name}
                  placeholder={field.placeholder}
                  className="form-control"
                  value={formData[field.name]}
                  onChange={handleOnChange}
                  required
                />
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label htmlFor="metaDescription" className="form-label fw-semibold">
              Meta Description
            </label>
            <textarea
              id="metaDescription"
              name="metaDescription"
              className="form-control"
              rows="3"
              placeholder="Enter SEO description (max 160 characters)"
              maxLength="160"
              required
              onChange={handleOnChange}
              value={formData.metaDescription}
            ></textarea>
            <div className="form-text">
              {formData.metaDescription?.length || 0}/160 characters
            </div>
          </div>

          <div className="d-grid gap-2">
            <button
              disabled={status === "loading"}
              type="submit"
              className="btn btn-primary btn-lg"
            >
              {status === "loading" ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Adding...
                </>
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </Form>
      </main> */}

      <main
        className="container py-5"
        style={{ marginBottom: "5em", maxWidth: "860px" }}
      >
        {/* Page Header */}
        <div className="mb-4 pb-2 border-bottom border-2">
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center rounded-3 bg-primary text-white"
              style={{
                width: "44px",
                height: "44px",
                fontSize: "20px",
                flexShrink: 0,
              }}
            >
              +
            </div>
            <div>
              <h1 className="mb-0 fw-bold fs-3">Add Product</h1>
              <p className="text-muted mb-0 small">
                Fill in the details to list a new product
              </p>
            </div>
          </div>
        </div>

        {status === "loading" && (
          <div className="overlay">
            <Loading />
          </div>
        )}

        {status === "error" && (
          <ErrorModal message={error} onClose={() => dispatch(clearError())} />
        )}

        <Form onSubmit={handleFormSubmit}>
          {/* ── Section 1: Basic Info ── */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-header bg-white border-bottom rounded-top-4 px-4 py-3">
              <h6 className="mb-0 fw-semibold text-dark">
                <span className="badge bg-primary me-2 rounded-pill">1</span>
                Basic Information
              </h6>
            </div>
            <div className="card-body px-4 py-4">
              {/* Text input fields */}
              <div className="row g-3 mb-4">
                {inputFields.map((field) => (
                  <div className="col-md-6" key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="form-label fw-semibold small text-secondary text-uppercase"
                      style={{ letterSpacing: "0.05em" }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      placeholder={field.placeholder}
                      className="form-control form-control-lg border-2"
                      style={{ borderRadius: "10px" }}
                      value={formData[field.name]}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="form-label fw-semibold small text-secondary text-uppercase"
                  style={{ letterSpacing: "0.05em" }}
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  className="form-control border-2"
                  style={{ borderRadius: "10px", resize: "vertical" }}
                  rows={6}
                  required
                  onChange={handleOnChange}
                  placeholder="Enter product description"
                />
              </div>

              {/* Rating */}
              <div className="mb-3">
                <label
                  htmlFor={ratingField.id}
                  className="form-label fw-semibold small text-secondary text-uppercase"
                  style={{ letterSpacing: "0.05em" }}
                >
                  {ratingField.label}
                </label>
                <select
                  id={ratingField.id}
                  name={ratingField.name}
                  className="form-select form-select-lg border-2"
                  style={{ borderRadius: "10px" }}
                  value={formData[ratingField.name]}
                  onChange={handleOnChange}
                >
                  <option value="" disabled>
                    {ratingField.placeholder}
                  </option>
                  {ratingField.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ── Section 2: Classification ── */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-header bg-white border-bottom rounded-top-4 px-4 py-3">
              <h6 className="mb-0 fw-semibold text-dark">
                <span className="badge bg-primary me-2 rounded-pill">2</span>
                Classification
              </h6>
            </div>
            <div className="card-body px-4 py-4">
              <div className="row g-3">
                {[materialTypeField, categoryField].map((field) => (
                  <div className="col-md-6" key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="form-label fw-semibold small text-secondary text-uppercase"
                      style={{ letterSpacing: "0.05em" }}
                    >
                      {field.label}
                    </label>
                    <select
                      id={field.id}
                      name={field.name}
                      className="form-select form-select-lg border-2"
                      style={{ borderRadius: "10px" }}
                      value={formData[field.name]}
                      onChange={handleOnChange}
                      required
                    >
                      <option value="" disabled>
                        {field.placeholder}
                      </option>
                      {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Section 3: Care & Images ── */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-header bg-white border-bottom rounded-top-4 px-4 py-3">
              <h6 className="mb-0 fw-semibold text-dark">
                <span className="badge bg-primary me-2 rounded-pill">3</span>
                Care & Media
              </h6>
            </div>
            <div className="card-body px-4 py-4">
              {/* Care Instructions */}
              <div className="mb-4">
                <label
                  htmlFor="care"
                  className="form-label fw-semibold small text-secondary text-uppercase"
                  style={{ letterSpacing: "0.05em" }}
                >
                  Care Instructions
                </label>
                <textarea
                  id="care"
                  name="care"
                  className="form-control border-2"
                  style={{ borderRadius: "10px", resize: "vertical" }}
                  rows={5}
                  required
                  placeholder="Enter product care instructions (comma separated)"
                  onChange={handleOnChange}
                />
                <div className="form-text">
                  Separate multiple instructions with commas.
                </div>
              </div>

              {/* Image Upload */}
              <div className="mb-4">
                <label
                  htmlFor="images"
                  className="form-label fw-semibold small text-secondary text-uppercase"
                  style={{ letterSpacing: "0.05em" }}
                >
                  Product Images
                </label>
                <div
                  className="border border-2 border-dashed rounded-3 p-4 text-center"
                  style={{
                    borderColor: "#dee2e6",
                    background: "#f8f9fa",
                    cursor: "pointer",
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-muted mb-1" style={{ fontSize: "2rem" }}>
                    🖼️
                  </div>
                  <p className="mb-1 fw-semibold text-primary">
                    Click to upload images
                  </p>
                  <p className="mb-0 text-muted small">
                    JPG, JPEG, PNG accepted · Multiple files allowed
                  </p>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    required
                    multiple
                    accept=".jpg,.png,.jpeg"
                    onChange={onPickedFile}
                    ref={fileInputRef}
                    className="form-control d-none"
                  />
                </div>
              </div>

              {/* Image Previews — desktop */}
              <div className="d-none d-md-flex flex-row gap-3 flex-wrap">
                {imgPreviewUrl && imgPreviewUrl.length !== 0 ? (
                  imgPreviewUrl.map((img, index) => (
                    <div key={index} className="position-relative">
                      <img
                        src={img.previewUrl}
                        className="rounded-3 shadow-sm"
                        style={{
                          width: "180px",
                          height: "180px",
                          objectFit: "cover",
                        }}
                        alt={`Preview ${index + 1}`}
                      />
                      <span
                        className="position-absolute top-0 start-0 badge bg-dark text-white m-1"
                        style={{ fontSize: "10px", borderRadius: "6px" }}
                      >
                        {index + 1}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-muted fst-italic small">
                    No images selected yet.
                  </p>
                )}
              </div>

              {/* Image Previews — mobile */}
              <div className="d-md-none d-flex flex-row gap-2 flex-wrap">
                {imgPreviewUrl && imgPreviewUrl.length !== 0 ? (
                  imgPreviewUrl.map((img, index) => (
                    <img
                      key={index}
                      src={img.previewUrl}
                      className="rounded-3 shadow-sm"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      alt={`Preview ${index + 1}`}
                    />
                  ))
                ) : (
                  <p className="text-muted fst-italic small">
                    No images selected yet.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ── Section 4: SEO ── */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-header bg-white border-bottom rounded-top-4 px-4 py-3">
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="mb-0 fw-semibold text-dark">
                  <span className="badge bg-primary me-2 rounded-pill">4</span>
                  SEO Information
                </h6>
                <span className="badge bg-success-subtle text-success border border-success-subtle small">
                  Boost visibility
                </span>
              </div>
            </div>
            <div className="card-body px-4 py-4">
              <div className="row g-3 mb-4">
                {seoInputs.map((field) => (
                  <div className="col-md-12" key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="form-label fw-semibold small text-secondary text-uppercase"
                      style={{ letterSpacing: "0.05em" }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.name}
                      placeholder={field.placeholder}
                      className="form-control border-2"
                      style={{ borderRadius: "10px" }}
                      value={formData[field.name]}
                      onChange={handleOnChange}
                      required
                    />
                  </div>
                ))}
              </div>

              {/* Meta Description */}
              <div className="mb-2">
                <label
                  htmlFor="metaDescription"
                  className="form-label fw-semibold small text-secondary text-uppercase"
                  style={{ letterSpacing: "0.05em" }}
                >
                  Meta Description
                </label>
                <textarea
                  id="metaDescription"
                  name="metaDescription"
                  className="form-control border-2"
                  style={{ borderRadius: "10px", resize: "none" }}
                  rows="3"
                  placeholder="Enter SEO description (max 160 characters)"
                  maxLength="160"
                  required
                  onChange={handleOnChange}
                  value={formData.metaDescription}
                />
                <div className="d-flex justify-content-between form-text mt-1">
                  <span>
                    Recommended: 120–160 characters for best SEO results.
                  </span>
                  <span
                    className={`fw-semibold ${
                      (formData.metaDescription?.length || 0) > 140
                        ? "text-danger"
                        : "text-muted"
                    }`}
                  >
                    {formData.metaDescription?.length || 0}/160
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Submit ── */}
          <div className="d-grid mt-2">
            <button
              disabled={status === "loading"}
              type="submit"
              className="btn btn-primary btn-lg py-3 fw-semibold"
              style={{
                borderRadius: "12px",
                fontSize: "1.05rem",
                letterSpacing: "0.02em",
              }}
            >
              {status === "loading" ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                  Adding Product...
                </>
              ) : (
                "Add Product →"
              )}
            </button>
          </div>
        </Form>
      </main>
      
    </>
  );
};

export default AddProducts;

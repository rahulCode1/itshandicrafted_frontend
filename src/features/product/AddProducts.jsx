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
import {
  addProductAsync,
  clearError,
} from "./productSlice";

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

  const {  status, error } = useSelector((state) => state.product);
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
    <main className="container py-4 mb-4">
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
    </main>
  );
};

export default AddProducts;

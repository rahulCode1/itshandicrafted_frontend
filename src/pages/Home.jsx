import { Link, useNavigate, useSearchParams } from "react-router-dom";
import kitchenCategory from "../imgs/kitchen.jpg";
import { useState } from "react";
import giftCategory from "../imgs/gifts.jpg";
import religiousCategory from "../imgs/religious.jpg";
import decoreCategory from "../imgs/decores.jpg";
import ganesh from "../imgs/ganesh.png";
import tray from "../imgs/tray.jpg";
import newArrivals from "../imgs/new.jpg";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const categories = [
    {
      name: "Home Decor",
      category: "HomeDecor",
      imgUrl: decoreCategory,
    },
    {
      name: "Kitchen & Dining",
      category: "KitchenDining",
      imgUrl: kitchenCategory,
    },

    {
      name: "Corporate Gifts",
      category: "CorporateGifts",
      imgUrl: giftCategory,
    },
    {
      name: "Religious Items",
      category: "ReligiousItems",
      imgUrl: religiousCategory,
    },
  ];

  const newArrival = [
    {
      name: "Tray",
      image: tray,
      details: "White marble tray crafted from premium Makrana stone.",
      category: "HomeDecor",
    },
    {
      name: "Basket",
      image: newArrivals,
      details:
        "Handcrafted white marble basket with detailed carving work, ideal for gifting.",
      category: "CorporateGifts",
    },
  ];

  const handleUpdateParams = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params);

    navigate(`/products?${params}`);
  };

  return (
    <main
      className="py-5"
      style={{
        background: "linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)",
      }}
    >
      <section className="container">
        <div
          className="d-flex gap-4 w-100 mb-5 pb-3"
          style={{ overflowX: "auto" }}
        >
          {categories.map((data, i) => (
            <div
              key={i}
              onClick={() => handleUpdateParams("category", data.category)}
              className="flex-fill text-center position-relative"
              style={{
                minWidth: "140px",
                cursor: "pointer",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-8px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div
                className={`position-relative overflow-hidden ${
                  selectedCategory === data.category
                    ? "border border-3 border-dark"
                    : ""
                }`}
                style={{ borderRadius: "16px" }}
              >
                <img
                  src={data.imgUrl}
                  alt={data.name}
                  className="img-fluid w-100"
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    filter: "brightness(0.95)",
                  }}
                />
                <div
                  className="position-absolute bottom-0 start-0 end-0 text-white py-3 px-2"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
                    backdropFilter: "blur(2px)",
                  }}
                >
                  <p
                    className="mb-0 fw-semibold text-uppercase"
                    style={{ fontSize: "0.85rem", letterSpacing: "1px" }}
                  >
                    {data.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="my-5 position-relative pointer"
          onClick={() => handleUpdateParams("category", "StatuesIdols")}
          style={{ cursor: "pointer" }}
        >
          <div className="rounded-4 overflow-hidden shadow-lg position-relative">
            <img
              src={ganesh}
              className="img-fluid w-100 h-100"
              alt="Banner"
              style={{
                maxHeight: "700px",
                objectFit: "cover",
                filter: "brightness(0.9)",
              }}
            />
            <div
              className="position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,0,0,0.3), rgba(0,0,0,0.6))",
              }}
            >
              <div className="text-center text-white px-4">
                <div className="mb-4" style={{ fontFamily: "Georgia, serif" }}>
                  <div
                    className="mb-2"
                    style={{
                      fontSize: "0.9rem",
                      letterSpacing: "3px",
                      fontWeight: "300",
                    }}
                  >
                    LUXURY MARBLE COLLECTION
                  </div>
                  <h1
                    className="display-2 fw-bold mb-3"
                    style={{ letterSpacing: "2px" }}
                  >
                    Timeless Elegance
                  </h1>
                  <div
                    className="mx-auto mb-4"
                    style={{
                      width: "120px",
                      height: "2px",
                      background: "white",
                    }}
                  ></div>
                  <p
                    className="fs-5 fw-light mb-4"
                    style={{
                      maxWidth: "600px",
                      margin: "0 auto",
                      lineHeight: "1.8",
                    }}
                  >
                    Discover exquisite handcrafted masterpieces that transform
                    spaces into sanctuaries of refined beauty
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4" style={{ cursor: "pointer" }}>
          {newArrival.map((product, i) => (
            <div
              onClick={() => handleUpdateParams("category", product.category)}
              className="col-md-6"
              key={i}
            >
              <div
                className="p-4 bg-white rounded-4 shadow h-100 position-relative"
                style={{
                  border: "1px solid #e9ecef",
                  transition: "all 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div
                  className="position-absolute top-0 start-0 m-3 px-3 py-1 bg-dark text-white"
                  style={{
                    fontSize: "0.7rem",
                    letterSpacing: "2px",
                    fontWeight: "600",
                    borderRadius: "4px",
                    zIndex: 10,
                  }}
                >
                  NEW
                </div>

                <div className="d-flex">
                  <div className="flex-shrink-0 me-4">
                    <div
                      className="overflow-hidden shadow-sm"
                      style={{ borderRadius: "12px" }}
                    >
                      <img
                        src={product.image}
                        className="object-fit-cover"
                        style={{
                          height: "220px",
                          width: "160px",
                          transition: "transform 0.5s ease",
                        }}
                        alt={product.name}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-column justify-content-between flex-grow-1 py-2">
                    <div>
                      <p
                        className="text-uppercase mb-2 text-muted fw-semibold"
                        style={{ fontSize: "0.75rem", letterSpacing: "2px" }}
                      >
                        NEW ARRIVALS
                      </p>
                      <h5
                        className="fw-bold mb-3"
                        style={{
                          fontFamily: "Georgia, serif",
                          fontSize: "1.5rem",
                          color: "#212529",
                        }}
                      >
                        {product.name}
                      </h5>
                      <p
                        className="mb-0 text-muted"
                        style={{ lineHeight: "1.7", fontSize: "0.95rem" }}
                      >
                        {product.details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;

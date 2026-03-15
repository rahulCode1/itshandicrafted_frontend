import { useNavigate, useSearchParams } from "react-router-dom";
import kitchenCategory from "../imgs/kitchen.jpg";
import { useState } from "react";
import giftCategory from "../imgs/gifts.jpg";
import religiousCategory from "../imgs/religious.jpg";
import decoreCategory from "../imgs/decores.jpg";
import ganesh from "../imgs/ganesh.png";
import tray from "../imgs/tray.jpg";
import newArrivals from "../imgs/new.jpg";
import deepakCategoryImg from "../imgs/deepak.png";
import decorativeBowl from "../imgs/bowl.jpg";

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
    {
      name: "Statues & Idols",
      category: "StatuesIdols",
      imgUrl: ganesh,
    },
    {
      name: "Candle Holders",
      category: "CandleHolders",
      imgUrl: deepakCategoryImg,
    },
    {
      name: "Decorative Bowls",
      category: "DecorativeBowls",
      imgUrl: decorativeBowl,
    },
    { name: "Serving Platters", category: "ServingPlatters", imgUrl: tray },
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
      className="py-4 py-md-5 mb-5 mb-md-0"
      style={{
        background: "linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)",
      }}
    >
      <section className="container">
        {/* 1. Categories - Horizontal Scroll with improved touch target */}
        <div
          className="d-flex gap-3 gap-md-4 w-100 mb-5 pb-3 custom-scrollbar"
          style={{
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none", // Hides scrollbar for Firefox
          }}
        >
          {categories.map((data, i) => (
            <div
              key={i}
              onClick={() => handleUpdateParams("category", data.category)}
              className="text-center flex-shrink-0"
              style={{
                width: "120px",
                cursor: "pointer",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div
                className={`rounded-circle mx-auto mb-2 overflow-hidden border-2 ${
                  selectedCategory === data.category
                    ? "border border-dark"
                    : "border border-transparent"
                }`}
                style={{ width: "85px", height: "85px" }}
              >
                <img
                  src={data?.imgUrl}
                  alt={data.name}
                  className="w-100 h-100 object-fit-cover"
                  style={{ filter: "brightness(0.95)" }}
                />
              </div>
              <p
                className="mb-0 fw-bold text-uppercase"
                style={{ fontSize: "0.7rem", letterSpacing: "1px" }}
              >
                {data.name}
              </p>
            </div>
          ))}
        </div>

        {/* 2. Hero Banner - Responsive text and height */}
        <div
          className="my-4 my-md-5 position-relative rounded-4 overflow-hidden shadow-lg"
          onClick={() => handleUpdateParams("category", "StatuesIdols")}
          style={{ cursor: "pointer", minHeight: "400px" }}
        >
          <img
            src={ganesh}
            alt="Stone Handicraft"
            className="position-absolute w-100 h-100 object-fit-cover"
            style={{ filter: "brightness(0.7)" }}
          />

          <div
            className="position-relative d-flex align-items-center justify-content-center text-center p-4 py-5"
            style={{
              minHeight: "400px",
              background: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5))",
            }}
          >
            <div className="text-white" style={{ maxWidth: "800px" }}>
              <p
                className="text-uppercase mb-2"
                style={{ letterSpacing: "3px", fontSize: "0.75rem" }}
              >
                Premium Stone Handicrafts
              </p>

              <h1 className="fw-bold display-4 display-md-3 mb-3">
                Timeless Stone Art
              </h1>

              <div
                className="mx-auto mb-4 bg-white"
                style={{ width: "60px", height: "2px" }}
              />

              <p className="lead fs-6 fs-md-5 mb-4 opacity-90 px-md-5">
                Handcrafted marble sculptures and decor pieces that bring
                heritage, spirituality and elegance into your home.
              </p>

              <button className="btn btn-light rounded-pill px-4 py-2 fw-bold text-uppercase small">
                Explore Collection
              </button>
            </div>
          </div>
        </div>

        {/* 3. New Arrivals - Responsive Grid */}
        <div className="row g-4">
          {newArrival.map((product, i) => (
            <div
              className="col-12 col-lg-6"
              key={i}
              onClick={() => handleUpdateParams("category", product.category)}
            >
              <div
                className="card border-0 shadow-sm h-100 overflow-hidden rounded-4 transition-hover"
                style={{
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {/* New Badge */}
                <span className="position-absolute top-0 start-0 m-3 badge bg-dark px-3 py-2 z-1">
                  NEW
                </span>

                <div className="row g-0 h-100">
                  {/* Image Column */}
                  <div className="col-4 col-sm-5 col-md-4">
                    <img
                      src={product.image}
                      className="w-100 h-100 object-fit-cover"
                      style={{ minHeight: "200px" }}
                      alt={product.name}
                    />
                  </div>

                  {/* Content Column */}
                  <div className="col-8 col-sm-7 col-md-8">
                    <div className="card-body d-flex flex-column justify-content-center h-100 p-3 p-md-4">
                      <p
                        className="text-primary fw-bold text-uppercase mb-1"
                        style={{ fontSize: "0.65rem", letterSpacing: "1.5px" }}
                      >
                        New Arrival
                      </p>
                      <h5
                        className="card-title fw-bold mb-2 fs-5 fs-md-4"
                        style={{ fontFamily: "serif" }}
                      >
                        {product.name}
                      </h5>
                      <p className="card-text text-muted small d-none d-sm-block">
                        {product.details}
                      </p>
                      <div className="mt-auto">
                        <span
                          className="text-dark fw-bold border-bottom border-dark border-2 pb-1"
                          style={{ fontSize: "0.8rem" }}
                        >
                          VIEW DETAILS
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CSS for hiding scrollbars while keeping functionality */}
      <style>{`
    .custom-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .transition-hover:hover {
      transform: translateY(-5px);
      box-shadow: 0 1rem 3rem rgba(0,0,0,0.1) !important;
    }
  `}</style>
    </main>
  );
};

export default Home;

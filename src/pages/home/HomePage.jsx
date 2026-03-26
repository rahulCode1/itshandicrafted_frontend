import { useNavigate, useSearchParams } from "react-router-dom";
import kitchenCategory from "../../imgs/kitchen.jpg";
import giftCategory from "../../imgs/gifts.jpg";
import religiousCategory from "../../imgs/religious.jpg";
import decoreCategory from "../../imgs/decores.jpg";
import ganesh from "../../imgs/ganesh.png";
import tray from "../../imgs/tray.jpg";
import newArrivals from "../../imgs/new.jpg";
import deepakCategoryImg from "../../imgs/deepak.png";
import decorativeBowl from "../../imgs/bowl.jpg";
import MakingProcess from "./MakingProcess";
import styles from "./HomePage.module.css";
import HomeFooter from "./HomeFooter";

const HomePage = () => {
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
      className="py-4 py-md-5  mb-md-0"
      style={{
        background: "linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)",
        marginBottom: "5em",
      }}
    >
      <section className="container">
        {/* 1. Categories - Horizontal Scroll with improved touch target */}
        <div
          className="d-flex gap-3 gap-md-4 w-100  pb-3 custom-scrollbar"
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
                  "all" === data.category
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
          className={styles.container}
          onClick={() => handleUpdateParams("category", "StatuesIdols")}
        >
          {/* Background Image */}
          <img src={ganesh} alt="Stone Handicraft" className={styles.bgImage} />

          {/* Overlay Content */}
          <div className={styles.overlay}>
            <div className={styles.content}>
              <p className={styles.subtitle}>Premium Stone Handicrafts</p>

              <h1 className={styles.title}>Timeless Stone Art</h1>

              <div className={styles.divider} />

              <p className={styles.description}>
                Handcrafted marble sculptures and decor pieces that bring
                heritage, spirituality and elegance into your home.
              </p>

              <button className={styles.button}>Explore Collection</button>
            </div>
          </div>
        </div>

        <MakingProcess />

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

      <HomeFooter />
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

export default HomePage;

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";


const ProductImageCarousel = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
   <div className="d-flex flex-column h-100" style={{ gap: 0 }}>

  {/* ── Main Slider ── */}
  <div className="flex-grow-1" style={{ minHeight: 0 }}>
    <Swiper
      modules={[Navigation, Thumbs]}
      thumbs={{ swiper: thumbsSwiper }}
      navigation
      spaceBetween={0}
      className="h-100"
      style={{ height: "100%", borderRadius: "12px 12px 0 0", overflow: "hidden" }}
    >
      {images.map((img, index) => (
        <SwiperSlide
          key={index}
          className="d-flex align-items-center justify-content-center"
          style={{ background: "#f5f3ff" }}
        >
          <img
            src={img.url}
            alt=""
            className="w-100"
            style={{
              height: "100%",
              maxHeight: "calc(100% - 0px)",
              objectFit: "cover",
              display: "block",
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>

  {/* ── Thumbnails ── */}
  <div
    style={{
      height: 88,
      background: "#f5f3ff",
      borderRadius: "0 0 12px 12px",
      padding: "6px 8px 8px",
      borderTop: "2px solid #ede9fe",
    }}
  >
    <Swiper
      onSwiper={setThumbsSwiper}
      modules={[Thumbs]}
      slidesPerView={4}
      spaceBetween={6}
      watchSlidesProgress
      className="h-100"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index} style={{ borderRadius: 8, overflow: "hidden" }}>
          <img
            src={img.url}
            alt=""
            className="w-100"
            style={{
              height: 68,
              objectFit: "cover",
              cursor: "pointer",
              borderRadius: 8,
              border: "2px solid transparent",
              display: "block",
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>

</div>
  );
};

export default ProductImageCarousel;

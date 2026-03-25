// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Thumbs } from "swiper/modules";
// import { useState } from "react";

// const ProductImageCarousel = ({ images }) => {
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);

//   return (
//     <div className="d-flex flex-column h-100" style={{ gap: 0 }}>
//       {/* ── Main Slider ── */}
//       <div className="flex-grow-1" style={{ minHeight: 0 }}>
//         <Swiper
//           modules={[Navigation, Thumbs]}
//           thumbs={
//             thumbsSwiper && !thumbsSwiper.destroyed
//               ? { swiper: thumbsSwiper }
//               : undefined
//           }
//           navigation
//           spaceBetween={0}
//           className="h-100"
//           style={{
//             height: "100%",
//             borderRadius: "12px 12px 0 0",
//             overflow: "hidden",
//             objectFit: "contain"
//           }}
//         >
//           {images?.map((img, index) => (
//             <SwiperSlide
//               key={index}
//               className="d-flex align-items-center justify-content-center"
//               style={{ background: "#f5f3ff" }}
//             >
//               <img
//                 src={img.url}
//                 alt=""
//                 className="w-100"
//                 style={{
//                   height: "100%",
//                   maxHeight: "calc(100% - 0px)",
//                   objectFit: "cover",
//                   display: "block",
//                 }}
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* ── Thumbnails ── */}
//       <div
//         style={{
//           height: 88,
//           background: "#f5f3ff",
//           borderRadius: "0 0 12px 12px",
//           padding: "6px 8px 8px",
//           borderTop: "2px solid #ede9fe",
//         }}
//       >
//         <Swiper
//           onSwiper={setThumbsSwiper}
//           modules={[Thumbs]}
//           slidesPerView={4}
//           spaceBetween={6}
//           watchSlidesProgress
//           className="h-100"
//         >
//           {images.map((img, index) => (
//             <SwiperSlide
//               key={index}
//               style={{ borderRadius: 8, overflow: "hidden" }}
//             >
//               <img
//                 src={img.url}
//                 alt=""
//                 className="w-100"
//                 style={{
//                   height: 68,
//                   objectFit: "cover",
//                   cursor: "pointer",
//                   borderRadius: 8,
//                   border: "2px solid transparent",
//                   display: "block",
//                 }}
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default ProductImageCarousel;

import { useState, useRef, useEffect, useCallback } from "react";

const ProductImageCarousel = ({ images = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const touchStartX = useRef(null);

  const goTo = useCallback(
    (index) => {
      if (isTransitioning || index === activeIndex) return;
      setIsTransitioning(true);
      setActiveIndex(index);
      setTimeout(() => setIsTransitioning(false), 420);
    },
    [isTransitioning, activeIndex],
  );

  const prev = useCallback(() => {
    goTo(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  }, [activeIndex, images.length, goTo]);

  const next = useCallback(() => {
    goTo(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
  }, [activeIndex, images.length, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setIsZoomed(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  // Touch / swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  // Mouse drag for desktop swipe feel
  const handleMouseDown = (e) => {
    setIsDragging(false);
    setDragStartX(e.clientX);
  };
  const handleMouseMove = (e) => {
    if (Math.abs(e.clientX - dragStartX) > 5) setIsDragging(true);
  };
  const handleMouseUp = (e) => {
    const diff = dragStartX - e.clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  };

  // Zoom on desktop hover
  const handleMouseMoveZoom = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  if (!images.length) return null;

  return (
    <div style={styles.wrapper}>
      {/* ── Main Image Area ── */}
      <div
        ref={containerRef}
        style={styles.mainStage}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={(e) => {
          handleMouseMove(e);
          handleMouseMoveZoom(e);
        }}
        onMouseUp={handleMouseUp}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        {/* Images */}
        {images.map((img, i) => (
          <div
            key={i}
            style={{
              ...styles.slide,
              opacity: i === activeIndex ? 1 : 0,
              transform:
                i === activeIndex
                  ? "scale(1)"
                  : i < activeIndex
                    ? "scale(0.96) translateX(-10px)"
                    : "scale(0.96) translateX(10px)",
              zIndex: i === activeIndex ? 1 : 0,
              pointerEvents: i === activeIndex ? "auto" : "none",
            }}
          >
            <img
              src={img.url}
              alt={`Product image ${i + 1}`}
              style={{
                ...styles.img,
                ...(isZoomed && i === activeIndex
                  ? {
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      transform: "scale(1.55)",
                      cursor: "zoom-in",
                    }
                  : { cursor: images.length > 1 ? "grab" : "default" }),
              }}
              draggable={false}
            />
          </div>
        ))}

        {/* Gradient overlays for depth */}
        <div style={styles.gradientBottom} />

        {/* ── Navigation Arrows ── */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              style={{ ...styles.arrowBtn, left: 12 }}
              aria-label="Previous image"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              style={{ ...styles.arrowBtn, right: 12 }}
              aria-label="Next image"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}

        {/* ── Image Counter Badge ── */}
        {images.length > 1 && (
          <div style={styles.counterBadge}>
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* ── Dot Indicators ── */}
      {images.length > 1 && (
        <div style={styles.dotsRow}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                ...styles.dot,
                ...(i === activeIndex ? styles.dotActive : {}),
              }}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* ── Thumbnail Strip (hidden on mobile via CSS-in-JS media) ── */}
      {images.length > 1 && (
        <div style={styles.thumbsRow}>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                ...styles.thumb,
                ...(i === activeIndex ? styles.thumbActive : {}),
              }}
            >
              <img
                src={img.url}
                alt={`Thumbnail ${i + 1}`}
                style={styles.thumbImg}
                draggable={false}
              />
              {i === activeIndex && <div style={styles.thumbOverlay} />}
            </button>
          ))}
        </div>
      )}

      {/* Responsive styles injected */}
      <style>{`
        @media (max-width: 768px) {
          .pic-thumbs-row { display: none !important; }
        }
        @media (min-width: 769px) {
          .pic-dots-row { display: none !important; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    gap: 0,
    userSelect: "none",
  },

  mainStage: {
    position: "relative",
    flex: "1 1 auto",
    minHeight: 0,
    borderRadius: 16,
    overflow: "hidden",
    background: "#f5f3ff",
    boxShadow:
      "0 4px 6px -1px rgba(0,0,0,0.07), 0 10px 40px -5px rgba(109,40,217,0.10)",
  },

  slide: {
    position: "absolute",
    inset: 0,
    transition:
      "opacity 0.38s cubic-bezier(.4,0,.2,1), transform 0.38s cubic-bezier(.4,0,.2,1)",
    overflow: "hidden",
  },

  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.15s ease",
    willChange: "transform",
  },

  gradientBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    background:
      "linear-gradient(to top, rgba(0,0,0,0.22) 0%, transparent 100%)",
    pointerEvents: "none",
    zIndex: 2,
  },

  arrowBtn: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    width: 38,
    height: 38,
    borderRadius: "50%",
    border: "none",
    background: "rgba(255,255,255,0.88)",
    backdropFilter: "blur(8px)",
    color: "#3b0764",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
    transition: "background 0.2s, transform 0.15s",
    padding: 0,
  },

  counterBadge: {
    position: "absolute",
    bottom: 12,
    right: 14,
    zIndex: 10,
    background: "rgba(0,0,0,0.45)",
    backdropFilter: "blur(6px)",
    color: "#fff",
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.06em",
    padding: "3px 10px",
    borderRadius: 20,
  },

  dotsRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
    paddingTop: 10,
    paddingBottom: 2,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    border: "none",
    background: "#c4b5fd",
    cursor: "pointer",
    padding: 0,
    transition: "background 0.2s, transform 0.2s",
  },

  dotActive: {
    background: "#7c3aed",
    transform: "scale(1.3)",
  },

  thumbsRow: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    paddingTop: 10,
    overflowX: "auto",
    scrollbarWidth: "none",
  },

  thumb: {
    position: "relative",
    flexShrink: 0,
    width: 68,
    height: 68,
    borderRadius: 10,
    overflow: "hidden",
    border: "2.5px solid transparent",
    cursor: "pointer",
    padding: 0,
    background: "#ede9fe",
    transition: "border-color 0.2s, transform 0.15s",
  },

  thumbActive: {
    borderColor: "#7c3aed",
    transform: "scale(1.06)",
  },

  thumbImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  thumbOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(109,40,217,0.12)",
    pointerEvents: "none",
  },
};

export default ProductImageCarousel;

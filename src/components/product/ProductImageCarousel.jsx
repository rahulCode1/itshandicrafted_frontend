import { useState, useCallback } from "react";

// ─── Inline styles as a style object (mirrors your CSS aesthetic) ───────────
const S = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
    width: "100%",
    fontFamily: "'DM Sans', sans-serif",
  },

  // ── Main image stage ─────────────────────────────────────────────────────
  stage: {
    position: "relative",
    width: "100%",
    aspectRatio: "6 / 7", // square keeps ratio stable on all screens
    background: "#fdf6ee",
    borderRadius: "0.75rem 0.75rem 0 0",
    overflow: "hidden",
    userSelect: "none",
    touchAction: "pan-y",
  },

  mainImg: (entering, direction) => ({
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    display: "block",
    // CSS transition handled via className + keyframe (see <style> tag below)
  }),

  // ── Arrow buttons ────────────────────────────────────────────────────────
  arrow: (side) => ({
    position: "absolute",
    top: "50%",
    [side]: "0.6rem",
    transform: "translateY(-50%)",
    zIndex: 10,
    width: "2rem",
    height: "2rem",
    borderRadius: "50%",
    border: "1.5px solid rgba(212,184,150,0.7)",
    background: "rgba(253,246,238,0.88)",
    backdropFilter: "blur(4px)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#5c4430",
    fontSize: "0.8rem",
    transition: "background 0.2s, transform 0.15s",
    boxShadow: "0 2px 8px rgba(26,18,8,0.12)",
    flexShrink: 0,
  }),

  // ── Dot indicators ───────────────────────────────────────────────────────
  dots: {
    position: "absolute",
    bottom: "0.65rem",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "0.35rem",
    zIndex: 10,
  },

  dot: (active) => ({
    width: active ? "1.4rem" : "0.45rem",
    height: "0.45rem",
    borderRadius: "0.25rem",
    background: active ? "#c97b3a" : "rgba(255,255,255,0.7)",
    transition: "width 0.3s ease, background 0.3s ease",
    cursor: "pointer",
    border: "none",
    padding: 0,
  }),

  // ── Thumbnail strip ──────────────────────────────────────────────────────
  thumbStrip: {
    display: "flex",
    gap: "0.45rem",
    padding: "0.5rem",
    background: "#fbeeda",
    borderRadius: "0 0 0.75rem 0.75rem",
    border: "1px solid #edd9b8",
    borderTop: "2px solid #edd9b8",
    overflowX: "auto",
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE
    WebkitOverflowScrolling: "touch",
  },

  thumb: (active) => ({
    flexShrink: 0,
    width: "4rem",
    height: "4rem",
    borderRadius: "0.4rem",
    overflow: "hidden",
    cursor: "pointer",
    border: active ? "2px solid #c97b3a" : "2px solid transparent",
    boxShadow: active ? "0 0 0 1px #c97b3a" : "none",
    transition: "border-color 0.2s, box-shadow 0.2s, transform 0.15s",
    transform: active ? "scale(1.05)" : "scale(1)",
    background: "#f7ede2",
  }),

  thumbImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
};

// ─── Keyframe CSS injected once ──────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes slideInRight {
    from { transform: translateX(60px); opacity: 0; }
    to   { transform: translateX(0);    opacity: 1; }
  }
  @keyframes slideInLeft {
    from { transform: translateX(-60px); opacity: 0; }
    to   { transform: translateX(0);     opacity: 1; }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .img-slide-right { animation: slideInRight 0.32s cubic-bezier(.25,.8,.25,1) both; }
  .img-slide-left  { animation: slideInLeft  0.32s cubic-bezier(.25,.8,.25,1) both; }
  .img-fade        { animation: fadeIn        0.25s ease both; }

  /* Hide scrollbar track on webkit for thumb strip */
  .thumb-strip::-webkit-scrollbar { display: none; }
`;

let injected = false;
function injectKeyframes() {
  if (injected || typeof document === "undefined") return;
  const el = document.createElement("style");
  el.textContent = KEYFRAMES;
  document.head.appendChild(el);
  injected = true;
}

// ─── Component ───────────────────────────────────────────────────────────────
const ProductImageCarousel = ({ images = [] }) => {
  injectKeyframes();

  const [current, setCurrent] = useState(0);
  const [animClass, setAnimClass] = useState("img-fade");
  const [key, setKey] = useState(0); // forces re-mount → re-animates

  const go = useCallback(
    (nextIndex, direction = "right") => {
      if (nextIndex === current) return;
      setAnimClass(
        direction === "right" ? "img-slide-right" : "img-slide-left",
      );
      setKey((k) => k + 1);
      setCurrent(nextIndex);
    },
    [current],
  );

  const prev = () => {
    const idx = (current - 1 + images.length) % images.length;
    go(idx, "left");
  };

  const next = () => {
    const idx = (current + 1) % images.length;
    go(idx, "right");
  };

  // ── Touch / swipe support ─────────────────────────────────────────────────
  const touchStart = useCallback((e) => {
    touchStart._x = e.touches[0].clientX;
  }, []);

  const touchEnd = useCallback(
    (e) => {
      const dx = e.changedTouches[0].clientX - (touchStart._x || 0);
      if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [current, images.length],
  );

  if (!images || images.length === 0) return null;

  return (
    <div style={S.wrapper}>
      {/* ── Stage ── */}
      <div
        style={S.stage}
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
        role="region"
        aria-label="Product images"
      >
        {/* Main image */}
        <img
          key={key}
          src={images[current]?.url}
          alt={images[current]?.alt || `Product image ${current + 1}`}
          style={S.mainImg()}
          className={animClass}
          draggable={false}
        />

        {/* Arrows — only show if more than 1 image */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              style={S.arrow("left")}
              aria-label="Previous image"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f0dfc4";
                e.currentTarget.style.transform =
                  "translateY(-50%) scale(1.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(253,246,238,0.88)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
              }}
            >
              ‹
            </button>
            <button
              onClick={next}
              style={S.arrow("right")}
              aria-label="Next image"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f0dfc4";
                e.currentTarget.style.transform =
                  "translateY(-50%) scale(1.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(253,246,238,0.88)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
              }}
            >
              ›
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div style={S.dots} role="tablist" aria-label="Image navigation">
            {images.map((_, i) => (
              <button
                key={i}
                style={S.dot(i === current)}
                onClick={() => go(i, i > current ? "right" : "left")}
                aria-label={`Image ${i + 1}`}
                aria-selected={i === current}
                role="tab"
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Thumbnail strip ── */}
      {images.length > 1 && (
        <div style={S.thumbStrip} className="thumb-strip">
          {images.map((img, i) => (
            <div
              key={i}
              style={S.thumb(i === current)}
              onClick={() => go(i, i > current ? "right" : "left")}
              role="button"
              aria-label={`View image ${i + 1}`}
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === "Enter" && go(i, i > current ? "right" : "left")
              }
            >
              <img
                src={img.url}
                alt={img.alt || `Thumbnail ${i + 1}`}
                style={S.thumbImg}
                draggable={false}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageCarousel;

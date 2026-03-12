// StarRating.jsx
import React from "react";

function StarSvg({ className = "", ariaHidden = true }) {
  // simple 5-point star path
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden={ariaHidden}>
      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.167L12 18.896 4.664 23.165l1.402-8.167L.132 9.21l8.2-1.192L12 .587z" />
    </svg>
  );
}

export default function StarRating({ rating = 0, size = 20, color = "text-yellow-400", emptyColor = "text-gray-300", ariaLabel }) {
  // Ensure rating is between 0 and 5
  const r = Math.max(0, Math.min(5, Number(rating)));

  // compute fills for 5 stars
  const fills = [1,2,3,4,5].map((i) => {
    const raw = r - (i - 1);          // e.g. rating=4.5, for i=5 -> raw = 0.5
    const fill = Math.max(0, Math.min(1, raw)); // clamp between 0 and 1
    return fill; // 0, fractional, or 1
  });

  return (
    <div
      className="inline-flex items-center"
      role="img"
      aria-label={ariaLabel || `Rating: ${r.toFixed(1)} out of 5`}
    >
      {fills.map((fill, idx) => {
        const id = `clip-${idx}-${Math.round(fill * 100)}`; // unique-ish
        const starSize = `${size}px`;
        return (
          <div key={idx} className="relative" style={{ width: starSize, height: starSize }}>
            <svg viewBox="0 0 24 24" width={size} height={size} className={`absolute inset-0 ${emptyColor}`}>
              <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.167L12 18.896 4.664 23.165l1.402-8.167L.132 9.21l8.2-1.192L12 .587z" />
            </svg>

            {/* Filled layer clipped to percent width */}
            <svg viewBox="0 0 24 24" width={size} height={size} className={`absolute inset-0 ${color}`} style={{ overflow: "visible" }}>
              <defs>
                <clipPath id={id}>
                  {/* width is percentage equal to fill*100 */}
                  <rect x="0" y="0" width={`${fill * 100}%`} height="100%" />
                </clipPath>
              </defs>
              <g clipPath={`url(#${id})`}>
                <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.167L12 18.896 4.664 23.165l1.402-8.167L.132 9.21l8.2-1.192L12 .587z" />
              </g>
            </svg>
          </div>
        );
      })}
    </div>
  );
}

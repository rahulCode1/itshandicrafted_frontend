import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopBtn = () => {
  const [showBtn, setShowBtn] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBtn(window.scrollY > 800);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    showBtn && (
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="btn position-fixed d-flex align-items-center justify-content-center rounded-circle shadow-lg border-0"
        style={{
          bottom: "5rem",
          right: "1rem",
          width: 48,
          height: 48,
          zIndex: 1050,
          background: isHovered
            ? "linear-gradient(135deg, #7c3aed, #4f46e5)"
            : "linear-gradient(135deg, #4f46e5, #7c3aed)",
          color: "#fff",
          boxShadow: isHovered
            ? "0 8px 24px rgba(79,70,229,0.55)"
            : "0 4px 14px rgba(79,70,229,0.35)",
          transform: isHovered ? "scale(1.15) translateY(-2px)" : "scale(1)",
          transition: "all 0.3s ease",
        }}
        title="Back to top"
      >
        <FaArrowUp size={16} />
      </button>
    )
  );
};

export default ScrollToTopBtn;

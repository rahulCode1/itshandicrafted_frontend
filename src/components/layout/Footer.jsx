import {
  FiShoppingBag,
  FiShoppingCart,
  FiUser,
  FiHome,
  FiLogOut,
  FiLock,
} from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEcommerce } from "../../context/EcommerceContext";

const Footer = () => {
  const { cart: productCart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { handleLogout } = useEcommerce();
  const token = localStorage.getItem("token");

  const totalItemsInCart =
    productCart && productCart.length > 0
      ? productCart.reduce((acc, curr) => acc + curr.quantity, 0)
      : 0;

  const getLinkStyle = (isActive) => ({
    color: isActive ? "#4f46e5" : "#6b7280",
    background: "transparent",
    borderTop: isActive ? "2.5px solid #4f46e5" : "2.5px solid transparent",
    padding: "8px 14px 4px",
    transition: "color 0.18s, border-color 0.18s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  });

  const labelStyle = {
    fontSize: "0.6rem",
    fontWeight: 600,
    marginTop: 3,
    letterSpacing: "0.4px",
    lineHeight: 1,
  };

  return (
    <footer
      className="position-fixed bottom-0 start-0 w-100 d-block d-md-none shadow-sm"
      style={{
        background: "#fff",
        borderTop: "1px solid #ede9fe",
        zIndex: 1030,
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <ul className="nav d-flex flex-row justify-content-around align-items-stretch mb-0 list-unstyled">
        {/* Home */}
        <li className="nav-item flex-fill">
          <NavLink to="/" end className="nav-link p-0 h-100">
            {({ isActive }) => (
              <div style={getLinkStyle(isActive)}>
                <FiHome size={21} />
                <span style={labelStyle}>Home</span>
              </div>
            )}
          </NavLink>
        </li>

        {/* Shop */}
        <li className="nav-item flex-fill">
          <NavLink to="/products" className="nav-link p-0 h-100">
            {({ isActive }) => (
              <div style={getLinkStyle(isActive)}>
                <FiShoppingBag size={21} />
                <span style={labelStyle}>Shop</span>
              </div>
            )}
          </NavLink>
        </li>

        {/* Cart — only if logged in */}
        {token && (
          <li className="nav-item flex-fill">
            <NavLink to="/cart" className="nav-link p-0 h-100">
              {({ isActive }) => (
                <div style={getLinkStyle(isActive)}>
                  <span
                    style={{ position: "relative", display: "inline-flex" }}
                  >
                    <FiShoppingCart size={21} />
                    {totalItemsInCart > 0 && (
                      <span
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.52rem",
                          fontWeight: 800,
                          color: "#fff",
                          pointerEvents: "none",
                          textShadow: "0 0 3px rgba(0,0,0,0.5)",
                        }}
                      >
                        {totalItemsInCart}
                      </span>
                    )}
                  </span>
                  <span style={labelStyle}>Cart</span>
                </div>
              )}
            </NavLink>
          </li>
        )}

        {/* Profile or Login */}
        <li className="nav-item flex-fill">
          <NavLink
            to={token ? "/user" : "/login"}
            className="nav-link p-0 h-100"
          >
            {({ isActive }) => (
              <div style={getLinkStyle(isActive)}>
                {token ? <FiUser size={21} /> : <FiLock size={21} />}
                <span style={labelStyle}>{token ? "Profile" : "Login"}</span>
              </div>
            )}
          </NavLink>
        </li>

        {/* Logout — only if logged in */}
        {token && (
          <li className="nav-item flex-fill">
            <button
              onClick={() => handleLogout(navigate)}
              className="btn border-0 p-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center"
              style={{
                color: "#6b7280",
                borderTop: "2.5px solid transparent",
                padding: "8px 14px 4px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
            >
              <FiLogOut size={21} />
              <span style={labelStyle}>Logout</span>
            </button>
          </li>
        )}
      </ul>
    </footer>
  );
};

export default Footer;

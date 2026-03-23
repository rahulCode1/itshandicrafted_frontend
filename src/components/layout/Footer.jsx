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

  return (
    <footer
      className="position-fixed bottom-0 start-0 w-100 d-block d-md-none shadow-lg"
      style={{
        background: "#ffffff",
        borderTop: "1px solid #f1f5f9",
        zIndex: 1030,
        // safe-area padding for modern notch phones
        paddingBottom: "calc(env(safe-area-inset-bottom) + 2px)",
      }}
    >
      <div className="container-fluid">
        <ul className="nav d-flex flex-row justify-content-around align-items-center py-1 mb-0 list-unstyled">
          {/* Home */}
          <li className="nav-item">
            <NavLink to="/" end className="nav-link p-0">
              {({ isActive }) => (
                <div
                  className="d-flex flex-column align-items-center justify-content-center rounded-3"
                  style={{
                    color: isActive ? "#4f46e5" : "#64748b",
                    background: isActive ? "#f5f3ff" : "transparent",
                    padding: "6px 12px",
                    transition: "none", // Removed hover/transition effects
                  }}
                >
                  <FiHome size={22} />
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      marginTop: "2px",
                    }}
                  >
                    Home
                  </span>
                </div>
              )}
            </NavLink>
          </li>

          {/* Products */}
          <li className="nav-item">
            <NavLink to="/products" className="nav-link p-0">
              {({ isActive }) => (
                <div
                  className="d-flex flex-column align-items-center justify-content-center rounded-3"
                  style={{
                    color: isActive ? "#4f46e5" : "#64748b",
                    background: isActive ? "#f5f3ff" : "transparent",
                    padding: "6px 12px",
                  }}
                >
                  <FiShoppingBag size={22} />
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      marginTop: "2px",
                    }}
                  >
                    Shop
                  </span>
                </div>
              )}
            </NavLink>
          </li>

          {/* Cart - Only if Token */}
          {token && (
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link p-0">
                {({ isActive }) => (
                  <div
                    className="position-relative d-flex flex-column align-items-center justify-content-center rounded-3"
                    style={{
                      color: isActive ? "#4f46e5" : "#64748b",
                      background: isActive ? "#f5f3ff" : "transparent",
                      padding: "6px 12px",
                    }}
                  >
                    <FiShoppingCart size={22} />
                    {totalItemsInCart > 0 && (
                      <span
                        className="position-absolute translate-middle badge rounded-pill bg-danger"
                        style={{
                          top: "8px",
                          right: "2px",
                          fontSize: "0.55rem",
                          border: "2px solid #fff",
                        }}
                      >
                        {totalItemsInCart}
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        marginTop: "2px",
                      }}
                    >
                      Cart
                    </span>
                  </div>
                )}
              </NavLink>
            </li>
          )}

          {/* Profile or Login */}
          <li className="nav-item">
            <NavLink to={token ? "/user" : "/login"} className="nav-link p-0">
              {({ isActive }) => (
                <div
                  className="d-flex flex-column align-items-center justify-content-center rounded-3"
                  style={{
                    color: isActive ? "#4f46e5" : "#64748b",
                    background: isActive ? "#f5f3ff" : "transparent",
                    padding: "6px 12px",
                  }}
                >
                  {token ? <FiUser size={22} /> : <FiLock size={22} />}
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 600,
                      marginTop: "2px",
                    }}
                  >
                    {token ? "Profile" : "Login"}
                  </span>
                </div>
              )}
            </NavLink>
          </li>

          {/* Logout - Simplified Button */}
          {token && (
            <li className="nav-item">
              <button
                onClick={() => handleLogout(navigate)}
                className="btn border-0 p-0 d-flex flex-column align-items-center justify-content-center"
                style={{ color: "#64748b", padding: "6px 12px" }}
              >
                <FiLogOut size={22} />
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    marginTop: "2px",
                  }}
                >
                  Logout 
                </span>
              </button>
            </li>
          )}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

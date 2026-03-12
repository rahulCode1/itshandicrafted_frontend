import { FiSearch, FiShoppingCart, FiUser, FiHome } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const { cart: productCart } = useSelector((state) => state.cart);

  const totalItemsInCart =
    productCart && productCart.length > 0
      ? productCart.reduce((acc, curr) => acc + curr.quantity, 0)
      : 0;

  return (
    <footer
      className="position-fixed bottom-0 start-0 w-100"
      style={{
        background: "#fff",
        borderTop: "1px solid #ede9fe",
        boxShadow: "0 -4px 24px rgba(79,70,229,0.08)",
        zIndex: 1030,
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="container">
        <ul className="navbar-nav d-flex flex-row justify-content-evenly align-items-center py-2 mb-0">
          {/* Home */}
          <li className="nav-item">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link d-flex flex-column align-items-center justify-content-center px-3 py-2 rounded-3 ${
                  isActive ? "active-tab" : ""
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? "#4f46e5" : "#9ca3af",
                background: isActive ? "#f5f3ff" : "transparent",
                minWidth: 56,
              })}
            >
              <FiHome size={21} />
              <span
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  marginTop: 3,
                  letterSpacing: "0.3px",
                }}
              >
                Home
              </span>
            </NavLink>
          </li>

          {/* Products / Search */}
          <li className="nav-item">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `nav-link d-flex flex-column align-items-center justify-content-center px-3 py-2 rounded-3 ${
                  isActive ? "active-tab" : ""
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? "#4f46e5" : "#9ca3af",
                background: isActive ? "#f5f3ff" : "transparent",
                minWidth: 56,
              })}
            >
              <FiSearch size={21} />
              <span
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  marginTop: 3,
                  letterSpacing: "0.3px",
                }}
              >
                Search
              </span>
            </NavLink>
          </li>

          {/* Cart */}
          <li className="nav-item">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `nav-link position-relative d-flex flex-column align-items-center justify-content-center px-3 py-2 rounded-3 ${
                  isActive ? "active-tab" : ""
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? "#4f46e5" : "#9ca3af",
                background: isActive ? "#f5f3ff" : "transparent",
                minWidth: 56,
              })}
            >
              <FiShoppingCart size={21} />
              {totalItemsInCart > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{
                    fontSize: "0.58rem",
                    padding: "0.22em 0.45em",
                    minWidth: 16,
                    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                  }}
                >
                  {totalItemsInCart}
                </span>
              )}
              <span
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  marginTop: 3,
                  letterSpacing: "0.3px",
                }}
              >
                Cart
              </span>
            </NavLink>
          </li>

          {/* User */}
          <li className="nav-item">
            <NavLink
              to="/user"
              className={({ isActive }) =>
                `nav-link d-flex flex-column align-items-center justify-content-center px-3 py-2 rounded-3 ${
                  isActive ? "active-tab" : ""
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? "#4f46e5" : "#9ca3af",
                background: isActive ? "#f5f3ff" : "transparent",
                minWidth: 56,
              })}
            >
              <FiUser size={21} />
              <span
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  marginTop: 3,
                  letterSpacing: "0.3px",
                }}
              >
                Profile
              </span>
            </NavLink>
          </li>
          {/* User */}
          <li className="nav-item">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `nav-link d-flex flex-column align-items-center justify-content-center px-3 py-2 rounded-3 ${
                  isActive ? "active-tab" : ""
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? "#4f46e5" : "#9ca3af",
                background: isActive ? "#f5f3ff" : "transparent",
                minWidth: 56,
              })}
            >
              <FiUser size={21} />
              <span
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  marginTop: 3,
                  letterSpacing: "0.3px",
                }}
              >
                Login 
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

import {
  FiHeart,
  FiShoppingCart,
  FiLock,
  FiHome,
  FiShoppingBag,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEcommerce } from "../../context/EcommerceContext";
import { useSelector, useDispatch } from "react-redux";
import { getAllCartAsync } from "../../features/cart/cartSlice";
import { getAllWishlistAsync } from "../../features/wishlist/wishlistSlice";
import { fetchAllProductsAsync } from "../../features/product/productSlice";

const Header = () => {
  const { handleLogout } = useEcommerce();
  const { cart: productCart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const totalItemsInCart =
    productCart && productCart.length > 0
      ? productCart.reduce((acc, curr) => acc + curr.quantity, 0)
      : 0;

  useEffect(() => {
    if (token) {
      dispatch(getAllCartAsync());
      dispatch(getAllWishlistAsync());
    }
  }, [token, dispatch]);

  const navLinkClass =
    "nav-link d-flex flex-column align-items-center justify-content-center pb-1 px-2 px-md-3";

  const getLinkStyle = (isActive) => ({
    color: isActive ? "#4f46e5" : "#6b7280",
    background: "transparent",
    borderBottom: isActive ? "2.5px solid #4f46e5" : "2.5px solid transparent",
    borderRadius: 0,
    transition: "color 0.18s, border-color 0.18s",
    minWidth: 48,
  });

  const labelStyle = {
    fontSize: "0.6rem",
    fontWeight: 600,
    marginTop: 3,
    letterSpacing: "0.4px",
    lineHeight: 1,
  };

  // Icon wrapper — relative so badge can sit inside
  const iconWrap = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const badgeStyle = {
    position: "absolute",
    top: -6,
    right: -8,
    fontSize: "0.55rem",
    fontWeight: 700,
    lineHeight: 1,
    padding: "2px 5px",
    borderRadius: 99,
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "#fff",
    minWidth: 16,
    textAlign: "center",
    boxShadow: "0 1px 4px rgba(79,70,229,0.35)",
    pointerEvents: "none",
  };

  useEffect(() => {
    const handleFetchProducts = async () => {
      try {
        dispatch(fetchAllProductsAsync());
      } catch (error) {
        console.log(error);
      }
    };

    handleFetchProducts();
  }, [dispatch]);

  return (
    <nav
      className="sticky-top shadow-sm"
      style={{
        background: "#fff",
        borderBottom: "1px solid #ede9fe",
        zIndex: 1030,
      }}
    >
      <div
        className="container-fluid px-3 px-md-4 d-flex align-items-center justify-content-between"
        style={{ height: 56 }}
      >
        {/* ── Logo ── */}
        <NavLink
          to="/"
          style={{
            fontSize: "clamp(1.05rem, 3vw, 1.3rem)",
            letterSpacing: "0.1em",
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textDecoration: "none",
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          It's Handicrafted
        </NavLink>

        {/* ── Nav items ── */}
        <ul className="navbar-nav d-flex flex-row align-items-stretch mb-0 h-100">
          {/* Home — md+ only */}
          <li className="nav-item d-none d-md-flex align-items-stretch">
            <NavLink
              to="/"
              end
              className={navLinkClass}
              style={({ isActive }) => getLinkStyle(isActive)}
            >
              <span style={iconWrap}>
                <FiHome size={20} />
              </span>
              <span style={labelStyle}>Home</span>
            </NavLink>
          </li>

          {/* Shop — md+ only */}
          <li className="nav-item d-none d-md-flex align-items-stretch">
            <NavLink
              to="/products"
              className={navLinkClass}
              style={({ isActive }) => getLinkStyle(isActive)}
            >
              <span style={iconWrap}>
                <FiShoppingBag size={20} />
              </span>
              <span style={labelStyle}>Shop</span>
            </NavLink>
          </li>

          {/* Wishlist — logged in */}
          {token && (
            <li className="nav-item d-flex align-items-stretch">
              <NavLink
                to="/wishlist"
                className={navLinkClass}
                style={({ isActive }) => getLinkStyle(isActive)}
              >
                <span style={iconWrap}>
                  <FiHeart size={20} />
                  {wishlist.length > 0 && (
                    <span style={badgeStyle}>{wishlist.length}</span>
                  )}
                </span>
                <span style={labelStyle}>Wishlist</span>
              </NavLink>
            </li>
          )}

          {/* Cart — logged in */}
          {token && (
            <li className="nav-item d-flex align-items-stretch">
              <NavLink
                to="/cart"
                className={navLinkClass}
                style={({ isActive }) => getLinkStyle(isActive)}
              >
                <span style={iconWrap}>
                  <FiShoppingCart size={20} />
                  {totalItemsInCart > 0 && (
                    <span style={badgeStyle}>{totalItemsInCart}</span>
                  )}
                </span>
                <span style={labelStyle}>Cart</span>
              </NavLink>
            </li>
          )}

          {/* Profile — logged in, md+ only */}
          {token && (
            <li className="nav-item d-none d-md-flex align-items-stretch">
              <NavLink
                to="/user"
                className={navLinkClass}
                style={({ isActive }) => getLinkStyle(isActive)}
              >
                <span style={iconWrap}>
                  <FiUser size={20} />
                </span>
                <span style={labelStyle}>Profile</span>
              </NavLink>
            </li>
          )}

          {/* Logout — logged in, md+ only */}
          {token && (
            <li className="nav-item d-none d-md-flex align-items-stretch">
              <button
                onClick={() => handleLogout(navigate)}
                className="btn border-0 p-0 d-flex flex-column align-items-center justify-content-center pb-1 px-2 px-md-3"
                style={{
                  color: "#6b7280",
                  background: "transparent",
                  borderBottom: "2.5px solid transparent",
                  borderRadius: 0,
                  minWidth: 48,
                  transition: "color 0.18s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
              >
                <FiLogOut size={20} />
                <span style={labelStyle}>Logout</span>
              </button>
            </li>
          )}

          {/* Login — not logged in */}
          {!token && (
            <li className="nav-item d-flex align-items-stretch">
              <NavLink
                to="/login"
                end
                className={navLinkClass}
                style={({ isActive }) => getLinkStyle(isActive)}
              >
                <span style={iconWrap}>
                  <FiLock size={20} />
                </span>
                <span style={labelStyle}>Login</span>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;

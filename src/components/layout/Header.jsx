import {
  FiSearch,
  FiX,
  FiHeart,
  FiShoppingCart,
  FiLock,
  FiHome,
  FiShoppingBag,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { useEffect } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useEcommerce } from "../../context/EcommerceContext";
import { useSelector, useDispatch } from "react-redux";
import { getAllCartAsync } from "../../features/cart/cartSlice";
import { getAllWishlistAsync } from "../../features/wishlist/wishlistSlice";

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSearchText, searchText, handleLogout } = useEcommerce();
  const { cart: productCart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const totalItemsInCart =
    productCart && productCart.length > 0
      ? productCart.reduce((acc, curr) => acc + curr.quantity, 0)
      : 0;

  const updateQuaryParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params);
    navigate(`/products?${params}`);
  };

  const clearSearch = () => {
    setSearchText("");
    updateQuaryParam("search", "");
  };

  useEffect(() => {
    if (token) {
      dispatch(getAllCartAsync());
      dispatch(getAllWishlistAsync());
    }
  }, [token, dispatch ]);

  // Shared styles for nav tab items
  const tabStyle = (isActive) => ({
    color: isActive ? "#4f46e5" : "#9ca3af",
    background: isActive ? "#f5f3ff" : "transparent",
    minWidth: 56,
  });

  const tabLabelStyle = {
    fontSize: "0.62rem",
    fontWeight: 600,
    marginTop: 3,
    letterSpacing: "0.3px",
  };

  const badgeStyle = {
    fontSize: "0.58rem",
    padding: "0.22em 0.45em",
    minWidth: 16,
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    top: "0.3em",
    right: "1em",
  };

  return (
    <>
      <nav
        className="py-2 shadow-sm overflow-x-hidden sticky-top py-md-3"
        style={{
          background: "#fff",
          borderBottom: "1px solid #ede9fe",
          zIndex: 1030,
        }}
      >
        <div className="container-fluid  px-3 px-md-4">
          <div className="d-flex align-items-center justify-content-between gap-3">
            {/* ── LEFT: Logo ── */}
            <NavLink
              className="navbar-brand fw-bold mb-0 flex-shrink-0"
              to="/"
              style={{
                fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
                letterSpacing: "0.12em",
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textDecoration: "none",
              }}
            >
              Handicrafted
            </NavLink>

            {/* ── CENTRE: Search (hidden on xs, visible from sm) ── */}
            <div
              className="d-none d-sm-flex flex-grow-1 mx-2 mx-md-4"
              style={{ maxWidth: 480 }}
            >
              <div
                className="input-group w-100 rounded-pill overflow-hidden"
                style={{ border: "1.5px solid #ddd6fe", background: "#f5f3ff" }}
              >
                <input
                  type="text"
                  className="form-control border-0 shadow-none ps-4"
                  placeholder="Search products..."
                  style={{
                    backgroundColor: "transparent",
                    fontSize: "0.9rem",
                    color: "#1e1b4b",
                  }}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && searchText.length > 0) {
                      updateQuaryParam("search", searchText);
                    }
                  }}
                />
                {searchText.length > 0 && (
                  <button
                    onClick={clearSearch}
                    className="btn border-0 px-2"
                    style={{ backgroundColor: "transparent" }}
                    title="Clear search"
                  >
                    <FiX className="text-muted" size={17} />
                  </button>
                )}
                <button
                  onClick={() => updateQuaryParam("search", searchText)}
                  className="btn border-0 px-3"
                  disabled={searchText.length === 0}
                  style={{ backgroundColor: "transparent" }}
                >
                  <FiSearch
                    size={18}
                    style={{
                      color: searchText.length === 0 ? "#a5b4fc" : "#4f46e5",
                    }}
                  />
                </button>
              </div>
            </div>

            {/* ── RIGHT: Icon Nav ── */}
            <ul className="navbar-nav d-flex flex-row align-items-center gap-1 gap-md-2 mb-0">
              {/* Mobile search toggle – visible only on xs */}
              <li className="nav-item d-sm-none">
                <button
                  className="btn border-0 p-2 rounded-circle"
                  style={{ color: "#4f46e5", background: "#f5f3ff" }}
                  data-bs-toggle="collapse"
                  data-bs-target="#mobileSearch"
                  aria-expanded="false"
                >
                  <FiSearch size={20} />
                </button>
              </li>

              {/* ── Home — visible on md+ only (footer handles mobile) ── */}
              <li className="nav-item d-none d-md-block">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `nav-link d-flex flex-column align-items-center justify-content-center py-2 rounded-3 ${isActive ? "active-tab" : ""}`
                  }
                  style={({ isActive }) => tabStyle(isActive)}
                >
                  <FiHome size={21} />
                  <span style={tabLabelStyle}>Home</span>
                </NavLink>
              </li>

              {/* ── Shop — visible on md+ only ── */}
              <li className="nav-item d-none d-md-block">
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `nav-link d-flex flex-column align-items-center justify-content-center py-2 rounded-3 ${isActive ? "active-tab" : ""}`
                  }
                  style={({ isActive }) => tabStyle(isActive)}
                >
                  <FiShoppingBag size={21} />
                  <span style={tabLabelStyle}>Shop</span>
                </NavLink>
              </li>

              {/* ── Wishlist — only when logged in ── */}
              {token && (
                <li className="nav-item">
                  <NavLink
                    to="/wishlist"
                    className={({ isActive }) =>
                      `nav-link position-relative d-flex flex-column align-items-center justify-content-center py-2 rounded-3 ${isActive ? "active-tab" : ""}`
                    }
                    style={({ isActive }) => tabStyle(isActive)}
                  >
                    <FiHeart size={21} />
                    {wishlist.length > 0 && (
                      <span
                        className="position-absolute translate-middle badge rounded-pill"
                        style={{ ...badgeStyle, top: "0.3em", right: "1em" }}
                      >
                        {wishlist.length}
                      </span>
                    )}
                    <span style={tabLabelStyle}>Wishlist</span>
                  </NavLink>
                </li>
              )}

              {/* ── Cart — only when logged in ── */}
              {token && (
                <li className="nav-item">
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      `nav-link position-relative d-flex flex-column align-items-center justify-content-center py-2 rounded-3 ${isActive ? "active-tab" : ""}`
                    }
                    style={({ isActive }) => tabStyle(isActive)}
                  >
                    <FiShoppingCart size={21} />
                    {totalItemsInCart > 0 && (
                      <span
                        className="position-absolute translate-middle badge rounded-pill"
                        style={{ ...badgeStyle, top: "0.4em", right: "0.9em" }}
                      >
                        {totalItemsInCart}
                      </span>
                    )}
                    <span style={tabLabelStyle}>Cart</span>
                  </NavLink>
                </li>
              )}

              {/* ── Profile — logged in, md+ only ── */}
              {token && (
                <li className="nav-item d-none d-md-block">
                  <NavLink
                    to="/user"
                    className={({ isActive }) =>
                      `nav-link d-flex flex-column align-items-center justify-content-center py-2 rounded-3 ${isActive ? "active-tab" : ""}`
                    }
                    style={({ isActive }) => tabStyle(isActive)}
                  >
                    <FiUser size={21} />
                    <span style={tabLabelStyle}>Profile</span>
                  </NavLink>
                </li>
              )}

              {/* ── Logout — logged in, md+ only ── */}
              {token && (
                <li className="nav-item d-none d-md-block">
                  <button
                    onClick={() => handleLogout(navigate)}
                    className="btn border-0 p-0 d-flex flex-column align-items-center justify-content-center py-2 rounded-3"
                    style={{ color: "#9ca3af", minWidth: 56 }}
                  >
                    <FiLogOut size={21} />
                    <span style={tabLabelStyle}>Logout</span>
                  </button>
                </li>
              )}

              {/* ── Login — not logged in ── */}
              {!token && (
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    end
                    className={({ isActive }) =>
                      `nav-link d-flex flex-column align-items-center justify-content-center px-3 py-2 rounded-3 ${isActive ? "active-tab" : ""}`
                    }
                    style={({ isActive }) => tabStyle(isActive)}
                  >
                    <FiLock size={21} />
                    <span style={tabLabelStyle}>Login</span>
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          {/* ── Mobile Search (collapse panel) ── */}
          <div className="collapse d-sm-none mt-2" id="mobileSearch">
            <div
              className="input-group rounded-pill overflow-hidden"
              style={{ border: "1.5px solid #ddd6fe", background: "#f5f3ff" }}
            >
              <input
                type="text"
                className="form-control border-0 shadow-none ps-4"
                placeholder="Search products..."
                style={{
                  backgroundColor: "transparent",
                  fontSize: "0.9rem",
                  color: "#1e1b4b",
                }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && searchText.length > 0) {
                    updateQuaryParam("search", searchText);
                  }
                }}
              />
              {searchText.length > 0 && (
                <button
                  onClick={clearSearch}
                  className="btn border-0 px-2"
                  style={{ backgroundColor: "transparent" }}
                  title="Clear search"
                >
                  <FiX className="text-muted" size={17} />
                </button>
              )}
              <button
                onClick={() => updateQuaryParam("search", searchText)}
                className="btn border-0 px-3"
                disabled={searchText.length === 0}
                style={{ backgroundColor: "transparent" }}
              >
                <FiSearch
                  size={18}
                  style={{
                    color: searchText.length === 0 ? "#a5b4fc" : "#4f46e5",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

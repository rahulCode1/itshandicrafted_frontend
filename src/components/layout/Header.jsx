import {
  FiSearch,
  FiX,
  FiHeart,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useEcommerce } from "../../context/EcommerceContext";
import { useSelector, useDispatch } from "react-redux";
import { getAllCartAsync } from "../../features/cart/cartSlice";
import { useEffect } from "react";
import { getAllWishlistAsync } from "../../features/wishlist/wishlistSlice";

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSearchText, searchText } = useEcommerce();
  const { cart: productCart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    dispatch(getAllCartAsync());
    dispatch(getAllWishlistAsync());
  }, [dispatch]);

  return (
    <>
      <nav
        className="py-4 shadow-sm sticky-top"
        style={{
          background: "#fff",
          borderBottom: "1px solid #ede9fe",
          zIndex: 1030,
        }}
      >
        <div className="container-fluid px-3 px-md-4">
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
              LUXLINA
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

              {/* Wishlist */}
              <li className="nav-item">
                <NavLink
                  to="/wishlist"
                  className="nav-link position-relative d-flex align-items-center justify-content-center rounded-circle p-2"
                  style={{
                    color: "#4f46e5",
                    background: "#f5f3ff",
                    width: 38,
                    height: 38,
                  }}
                >
                  <FiHeart size={19} />
                  {wishlist.length > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{
                        fontSize: "0.6rem",
                        padding: "0.22em 0.45em",
                        minWidth: 16,
                      }}
                    >
                      {wishlist.length}
                    </span>
                  )}
                </NavLink>
              </li>

              {/* Cart */}
              <li className="nav-item">
                <NavLink
                  to="/cart"
                  className="nav-link position-relative d-flex align-items-center justify-content-center rounded-circle p-2"
                  style={{
                    color: "#4f46e5",
                    background: "#f5f3ff",
                    width: 38,
                    height: 38,
                  }}
                >
                  <FiShoppingCart size={19} />
                  {totalItemsInCart > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                      style={{
                        fontSize: "0.6rem",
                        padding: "0.22em 0.45em",
                        minWidth: 16,
                        background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                      }}
                    >
                      {totalItemsInCart}
                    </span>
                  )}
                </NavLink>
              </li>

            

              {/* User */}
              <li className="nav-item">
                <NavLink
                  to="/user"
                  className="nav-link d-flex align-items-center justify-content-center rounded-circle p-2"
                  style={{
                    color: "#4f46e5",
                    background: "#f5f3ff",
                    width: 38,
                    height: 38,
                  }}
                >
                  <FiUser size={19} />
                </NavLink>
              </li>
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

import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Navbar() {
  const auth = useAuthStore();
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          ShopHub
        </Link>
        <div className="navbar-links">
          <NavLink to="/" className="navbar-link">
            Home
          </NavLink>
          <NavLink to="/card" className="navbar-link">
            Card
          </NavLink>
        </div>
        <div className="navbar-auth">
          {!auth.user ? (
            <div className="navbar-auth-links">
              <Link to="/auth" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/auth" className="btn btn-primary">
                Signup
              </Link>
            </div>
          ) : (
            <div className="navbar-user">
              <span>Hello, {auth.user.email}</span>
              <button className="btn btn-secondary" onClick={auth.logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

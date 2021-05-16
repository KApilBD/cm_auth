import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context as AuthContext } from "../../../context/authContext";

const Layout = ({ children }) => {
  const { state } = useContext(AuthContext);

  return (
    <div className="flex h-full">
      <nav className="h-screen w-3/12 bg-gray-200">
        <div className="nav-link">
          <Link className="block w-full text-center" to="/">Home</Link>
        </div>
        <div className="nav-link">
          <Link className=" block w-full text-center" to="/profile">Profile</Link>
        </div>
        {state.isAdmin ? (
          <div className="nav-link">
            <Link className="block w-full text-center" to="/admin">Admin</Link>
          </div>
        ) : null}
      </nav>
      {children}
    </div>
  );
};

export default Layout;

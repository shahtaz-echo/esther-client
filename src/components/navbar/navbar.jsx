import { userLoggedOut } from "@/features/auth/authSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userLoggedOut());
    navigate("/login");
  };
  return (
    <nav className="py-4 md:px-10 px-4">
      <div className="container flbx">
        <Link>Esther</Link>
        <button
          onClick={handleLogout}
          className="cursor-pointer border border-white/20 py-2 px-4 hover:bg-white/80 hover:text-black tr"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

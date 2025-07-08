import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/context/AuthContext";

const DashboardLayout = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null, null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <header className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">Welcome, {user?.username}</div>
        <div className="space-x-4">
          <Link
            to="/add-contact"
            className="btn-1"
          >
            Create Contact
          </Link>
          <button onClick={handleLogout} className="btn">
            Logout
          </button>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;

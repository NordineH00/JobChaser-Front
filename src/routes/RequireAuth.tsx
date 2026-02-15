import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthStore } from "../stores/auth.store";

export default function RequireAuth() {
    const isAuth = useAuthStore((s) => s.isAuthenticated);
    const location = useLocation();

    if (!isAuth) {
        return <Navigate to="/signin" replace state={{ from: location }} />;
    }
    return <Outlet />;
}
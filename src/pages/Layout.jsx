import { Navigate, Outlet, useMatches, useRouteLoaderData } from "react-router-dom";
import Navbar from "./Navbar";
import { isAuthenticated } from "../utils/auth.js";

export const Layout = () => {
  const matches = useMatches();
  const routeData = useRouteLoaderData(matches[matches.length-1].id);
  const isProtected = routeData?.isProtected || false;
  if (isProtected) {
    if (!isAuthenticated()) {
      return <Navigate to="/login" />
    }
  }
  const anonymous = routeData?.anonymous || false;
  if (anonymous && isAuthenticated()) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <main className="w-full max-w-3xl mx-auto">
        <Navbar />
        <Outlet />
      </main>
    </>
  )
}

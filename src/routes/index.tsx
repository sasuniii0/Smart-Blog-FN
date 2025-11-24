import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy, type ReactNode } from "react";
import Layout from "../components/layout";
import { useAuth } from "../context/authContext";

const Home = lazy(() => import("../pages/home"));
const Login = lazy(() => import("../pages/login"));
const Register = lazy(() => import("../pages/register"));
const Welcome = lazy(() => import("../pages/welcome"));
const Post = lazy(() => import("../pages/post"));
const MyPost = lazy(() => import("../pages/myPost"));

type RequiredAuthTypes = { children: ReactNode; roles?: string[] };

const RequiredAuth = ({ children, roles }: RequiredAuthTypes) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.some((role) => user.roles?.includes(role))) {
    return (
      <div className="text-center py-20">
        <h1 className="text-xl font-bold mb-2">Access denied</h1>
        <p>You dont have the permission to access this profile</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default function Router() {
  // context eka athule tiynnma one na methna idn access krnn puluwn.. hbai app eke methana idn access krnn ba wrapp wela nattam
  return (
    <BrowserRouter>
      <Suspense
        fallback={<div className="text-center mt-20 text-xl">Loading...</div>}
      >

        {/* Main Content */}
        
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            element={
              <RequiredAuth>
                <Layout />
              </RequiredAuth>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/post" element={<Post />} />
            <Route
              path="/my-post"
              element={
                <RequiredAuth roles={["ADMIN", "AUTHOR"]}>
                  <MyPost />
                </RequiredAuth>
              }
            />
          </Route>

          {/* 
          <RequireAuth shamodha={""}>
            <div></div>
          </RequireAuth> */}
          {/* <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          /> */}

          {/*Using Outlet create layout for home, post */}
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-100 text-gray-700 py-4 text-center">
          <p>© 2025 Your Name. All rights reserved.</p>
        </footer>
      </Suspense>
    </BrowserRouter>
  );
}

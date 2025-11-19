import { BrowserRouter, Routes, Route, NavLink ,Navigate} from 'react-router-dom';
import { Suspense, lazy , type ReactNode } from 'react';
import Layout from "../pages/layout"
import { useAuth } from '../context/authContext';


const Home = lazy(() => import('../pages/home'));
const Login = lazy(() => import('../pages/login'));
const Register = lazy(() => import('../pages/register'));
const Welcome = lazy(() => import('../pages/welcome'));
const Post = lazy(() => import('../pages/post'));
const MyPost = lazy(() => import('../pages/myPost'))

type RequiredAuthTypes = {children : ReactNode; roles?: string[] }

const RequiredAuth = ({children,roles} : RequiredAuthTypes) =>{
  
    const {user, loading} = useAuth()

    if(loading) {
      return<div>User Loading</div>
    }

    if(!user) {
      return <Navigate to="/login" replace />
    }

    if(roles && !roles.some((role) => user.roles?.includes(role))){
      return(
      <div className='text-center py-20'>
        <h1 className='text-xl font-bold mb-2'>Access denied</h1>
        <p>You dont have the permission to access this profile</p>
      </div>
      )
    }

    return <>{children}</>
}

export default function Router (){
    // context eka athule tiynnma one na methna idn access krnn puluwn.. hbai app eke methana idn access krnn ba wrapp wela nattam
   return(
    <BrowserRouter>
      <Suspense fallback={<div className="text-center mt-20 text-xl">Loading...</div>}>
        {/* Header / Navigation */}
        <header className="bg-green-500 sticky top-0 z-50 shadow-md">
          <nav className="container mx-auto flex justify-center py-4">
            <ul className="flex gap-8">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-white font-bold underline'
                      : 'text-white font-bold hover:underline'
                  }
                >
                  Welcome
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-white font-bold underline'
                      : 'text-white font-bold hover:underline'
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-white font-bold underline'
                      : 'text-white font-bold hover:underline'
                  }
                >
                  Register
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-white font-bold underline'
                      : 'text-white font-bold hover:underline'
                  }
                >
                  Home
                </NavLink>
              </li> */}
            </ul>
          </nav>
        </header>

        {/* Main Content */}
        <main className="container mx-auto p-6 min-h-[70vh]">
          <Routes>
            <Route path='/' element = {<Layout/>}>
                <Route index element={<Welcome />} />
                <Route path="home" 
                  element={
                    <RequiredAuth>
                      <Home />
                    </RequiredAuth>
                  } 
                />

                <Route path='/home' element={<Home/>} />  
                <Route path="/post" element={<Post/>} />
                <Route 
                path='/my-post'
                element={
                  <RequiredAuth roles={["ADMIN" , "AUTHOR"]}>
                    <MyPost/>
                  </RequiredAuth>
                }
                />
            </Route>
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 text-gray-700 py-4 text-center">
          <p>© 2025 Your Name. All rights reserved.</p>
        </footer>
      </Suspense>
    </BrowserRouter>
   )
}
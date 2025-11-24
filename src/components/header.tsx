import { Link , useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

export default function Header() {
//   return (
//     <nav
//         style={{
//             padding:"5px",
//             display:"flex",
//             justifyContent:"space-around"

//         }}
//     >
//         <Link to="/">Welcome</Link>
//         <Link to="/home">Home</Link>
//         <Link to="/post">Post</Link>
//     </nav>

    
//   )

const navigate = useNavigate()

const {user} = useAuth();

const handleLogin = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    navigate("/login")
}

return (
    <header>
        <div>
            <Link to="/home" className='hover:underline'>Home</Link>
            <Link to="/post" className='hover:underline'>Post</Link>
            { (user.roles?.includes("ADMIN") 
                || user.roles?.includes("AUTHOR")) 
                    && ( 
                    <Link to="/my-post" className='hover:underline'>My-Post</Link>
                )
            }


            {/* {(user?.roles?.includes("ADMIN") || user?.roles?.includes("AUTHOR")) && (
                    <Link to="/my-post" className='hover:underline'>My-Post</Link>
                )} */}
        </div>
        <div>
            <span>{user?.email}</span>
            <button onClick={handleLogin}>Logout</button>
        </div>
    </header>
)
}

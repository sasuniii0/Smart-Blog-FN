import { Outlet } from "react-router-dom"
import Header from "./header"

export default function Layout(){
    return (
        <div>
            <Header />
            <main>
                <Outlet />                  
            </main>
        </div>
    )
}

// outlet - meka erenna anith okkoma fixed elements. mekata thmay api dana components wala dynamic ewa set  wenne


// 768px up - desktop   (responsive)
// down - mobile
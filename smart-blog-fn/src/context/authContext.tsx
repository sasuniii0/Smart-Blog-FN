import {createContext, useContext, useEffect, useState} from 'react'
import { getMydetails } from '../services/auth'
//solution for props drilling =>  is context creating...

// context eka create krnn create context eka one wenwa
const AuthContext = createContext<any>(null)

export const AuthProvider = ({children} : any)=>{
    const [user,setUser] = useState<any>(null)
    const [loading , setLoading] = useState(true)

    // component eka render wena time allaganna puluwn
    // dependency array dala nattam render wenw hamawlema component eka..
    // note krgnna theory parts tika and revise those
    useEffect(()=>{
        const token =localStorage.getItem("accessToken")
        if(token){
            getMydetails().then((res) =>{
                setUser(res.data)
            }).catch((err)=>{
                // if user token or user data expired... or the api call fail moment
                setUser(null)
                console.error(err)
            }).finally(()=>{
                setLoading(false)
            })
        } else{
            setUser(null)
            setLoading(false)
        }
    },[])
    
    return(
        <AuthContext.Provider value={{user , setUser , loading }}>
            {children}
        </AuthContext.Provider>
    )
}

// user , setUser 
// context eka use krnn useContext eka one
export const useAuth = ()=>{
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

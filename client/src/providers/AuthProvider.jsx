import { createContext, useEffect, useState } from 'react'
import { getUserFromLocalStorage } from '../utils/user'
import axios from 'axios'


export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    console.log(user)


    useEffect(() => {
        setLoading(true)
        const retrievedUser = getUserFromLocalStorage();
        // console.log(retrievedUser)
        setUser(retrievedUser)

        if (retrievedUser) {
            axios.post(`http://localhost:5000/jwt`, {
                email: retrievedUser.email
            }).then(data => {
                localStorage.setItem('access-token', data.data.token)
            })
        } else {
            localStorage.removeItem('access-token')
            setLoading(true)
        }
        setLoading(false)
        console.log('current user', retrievedUser)

    }, [])



    const authInfo = {
        user,
        setUser,
        loading,
    }



    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider
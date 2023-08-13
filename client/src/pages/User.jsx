import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'

const User = () => {
    const { user } = useContext(AuthContext)
    return (

        <div className="bg-gray-50 p-4 rounded-xl">
            <figure>
                <div className="flex items-center gap-x-4">
                    <img src='https://randomuser.me/api/portraits/men/23.jpg' className="w-16 h-16 rounded-full" />
                    <div>
                        <span className="block text-gray-800 font-semibold">Name: {user?.name}</span>
                        <span className="block text-gray-600 text-sm mt-0.5">Email: {user?.email}</span>
                    </div>
                </div>

            </figure>
        </div>

    )
}

export default User
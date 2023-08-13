import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { saveUser } from '../api/saveUser'
import { getSingleUser, getUsers } from '../api/getUser'
import { toast } from 'react-hot-toast'
import { saveUserToLocalStorage } from '../utils/user'
import { AuthContext } from '../providers/AuthProvider'

const Login = () => {
  const { user,setUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    // console.log(data)
    getSingleUser(data.email, data.password).then((res) => {
      console.log(res)
      if (res.length === 0) {
        toast.error('Invalid credentials')
      }
      else {
        setUser(res)
        saveUserToLocalStorage(res)
        toast.success('Login successful')
        navigate('/')
      }
    })
    
  }
  return (
    <div>
      <div className="w-full flex flex-wrap">
        {/* Login Section */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
            <Link to='/' className="bg-black text-white font-bold text-xl p-4">
              mPair
            </Link>
          </div>
          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">Welcome.</p>
            <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit(onSubmit)}>

              {errors.name && <span>This field is required</span>}
              <label htmlFor="email" className="text-lg mt-4">
                Email
              </label>
              {/* include validation with required or other standard HTML validation rules */}
              <input {...register("email", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
              {/* errors will return when field validation fails  */}
              {errors.email && <span>This field is required</span>}


              <label htmlFor="password" className="text-lg mt-4">
                Password
              </label>
              {/* include validation with required or other standard HTML validation rules */}
              <input {...register("password", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
              {/* errors will return when field validation fails  */}
              {errors.password && <span>This field is required</span>}

              <input title='asd' type="submit"
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              />
            </form>
            <div className="text-center pt-12 pb-12">
              <p>
                Don't have an account?{" "}
                <Link to='/signup' className="underline font-semibold">
                  Register here.
                </Link>
              </p>
            </div>
          </div>
        </div>
        {/* Image Section */}
        <div className="w-1/2 shadow-2xl">
          <img
            className="object-cover w-full h-screen hidden md:block"
            src="https://source.unsplash.com/IXUM4cJynP0"
          />
        </div>
      </div>

    </div>
  )
}

export default Login
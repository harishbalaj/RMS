import React, { useState } from 'react'
import { RiAdminFill } from "react-icons/ri";
import Port from '../../Config'
import { GrSecure } from "react-icons/gr";
import { PiStudentBold } from "react-icons/pi";
import { FaUser, FaLock } from "react-icons/fa";
import img2 from '../assets/Images/adminlogin.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './login.css'
import { toast } from 'react-toastify';
import { handleStoreUser } from '../../Redux/Slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
   const [email, setEmail] = useState('')
   const [emailAdmin, setEmailAdmin] = useState('')
   const [adminpass, setAdminPass] = useState('')
   const [password, setPassword] = useState('')
   const [adminclick, setAdminClick] = useState(false)
   const [userName, setUserName] = useState('')
   const [userpass, setUserPass] = useState('')
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const handleSignInUser = async () => {
      if (userName && userpass) {
         const data = {
            userName: userName,
            userPassword: userpass
         }
         const res = await axios.post(`http://localhost:${Port}/login`, data)
         console.log(res.data)

         if (res.data.success) {
            dispatch(handleStoreUser(res.data.user))
            toast.success(res.data.message)
            setTimeout(() => {
               navigate('/userdashboard')
               toast.success(`Welcome ${res.data.user.name}`)
            }, 200);
         }
         else {
            toast.error(res.data.message)
         }
      }
      else {
         toast.error('Please fill all the fields')
      }
   }
   const handleSignInAdmin = async () => {
      // Post the api data to the backend
      if (emailAdmin && adminpass) {
         const data = {
            email: emailAdmin,
            password: adminpass
         }
         const res = await axios.post(`http://localhost:${Port}/login`, data)
         console.log(res.data)

         if (res.data.success) {
            toast.success(res.data.message)
            setTimeout(() => {
               navigate('/admindashboard')
               toast.success('Welcome Admin')
            }, 200);
         }
         else {
            toast.error(res.data.message)
         }
      }
      else {
         toast.error('Please fill all the fields')
      }


   }
   // style={{backgroundImage: `url(${img2})`}}
   // style={{ backgroundImage: `url(${img1})` }}
   // style={{ backgroundImage: `url(${img1})` }}
   return (
      <body className=' bg-gray-600 bg-scroll bg-center bg-cover bg-no-repeat h-[100vh] w-[100%]' >
         
      
      <section className='formorgin  flex flex-col justify-center items-center flex-grow-1 flex-shrink' >  
         <div className='flex items-center justify-start w-[100%] font-extrabold text-3xl text-white'><PiStudentBold className='flex flex-auto flex-grow-0 flex-shrink' /> Result <span className='text-blue-600'> Scorrer</span></div>
         <div className="formbox h-[90vh] bg-green-300  rounded-2xl ring-4 w-[95%] md:w-full shadow-lg shadow-indigo-500/50 border-indigo-600">
             <div className="lefttdiv w-[50%] hidden md:block ">
             <img src={img2} alt="" />
             </div>
             <div className="rightdiv w-[100%] md:w-[45%] sm:w-[60%] xl:w-[40%] xxl:w-[40%]">
                  {!adminclick ?
                     <div className='form flex flex-grow shrink'>
                        <h1 className='text-white'>User Login</h1>
                        <label className='text-white flex flex-row items-center'> <FaUser />Username</label>
                        <input type="text"
                           required
                           onChange={(e) => setUserName(e.target.value)}
                           placeholder="Enter your Username" />
                        <label className='text-white flex flex-row items-center'><FaLock />Password</label>
                        <input type="password"
                           required
                           onChange={(e) => setUserPass(e.target.value)}
                           placeholder="Enter your StudentId" />
                        <button onClick={() => handleSignInUser()}>Sign in</button>
                        <p className='text-white'>Forgot Password? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/ResetPassword')}> Reset Password</span></p>
                        <button onClick={() => setAdminClick(true)}>Admin login</button>
                     </div>
                     :
                     <div className='form'>
                        <h1 className='text-white'>Admin Login</h1>
                        <label className='text-white flex flex-row items-center'><RiAdminFill />Admin</label>
                        <input type="text"
                           required
                           onChange={(e) => setEmailAdmin(e.target.value)}
                           placeholder="Enter your email" />
                        <label className='text-white flex flex-row items-center'><GrSecure />Password</label>
                        <input type="password"
                           onChange={(e) => setAdminPass(e.target.value)}
                           required
                           placeholder="Enter your password" />
                        <button onClick={() => handleSignInAdmin()}>Sign in</button>
                        <hr className='text-white' />
                        <button onClick={() => setAdminClick(false)}>User Login</button>

                     </div>
                  }
             </div>
        </div>
         
      </section>
      </body>
   )
}

export default Login
import React from 'react'
import { PiStudentBold } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'


const ResetPassword = () => {
  const navigate = useNavigate()

  return (
    <body className=' bg-gray-600 bg-scroll bg-center bg-cover bg-no-repeat h-[100vh] w-[100%]' >
    <section >
      <div className='flex items-center justify-start w-[100%] font-extrabold text-3xl text-white'><PiStudentBold className='flex flex-auto flex-grow-0 flex-shrink' /> Result <span className='text-blue-600'> Scorrer</span></div>
      <div className='w-[100%] bg-gray-600 flex flex-col md:w-[100%] xs:w-[100%] xl:w[100%] xxl:w-[100%] lg:w-[100%] bg-cover bg-no-repeat'>

        <div className="flex items-center w-[100%] ring-4 md:w-full shadow-lg shadow-indigo-500/50 border-indigo-600 justify-center h-[100vh]">
          <form className='form w-[100%] md:w-[50%] sm:w-[50%] lg:w-[50%] xl:w-[50%] xxl:w-[50%] '>
            <h1 className='text-white'>Reset Password</h1>
            <label className='text-white'>Email</label>
            <input type="text"
              required
              placeholder='Enter your email' />

            <button>Send OTP</button>

            <button type="submit" className='back' onClick={() => navigate('/Login')}>Back</button>
          </form>
        </div>
      </div>

    </section>
    </body>

  )
}

export default ResetPassword
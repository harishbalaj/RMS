import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Signup = () => {
  const navigate = useNavigate()
  const [studentid, setStudentId] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const res= await axios.post('https://a62c-2409-40f4-2006-878e-ac0f-f17-3a0-8ad4.ngrok-free.app/signup', {
        studentid,
        username,
        email,
        password
      })
      console.log(res)
      console.log(res.data);
      alert(res.data);
      

    }catch(error){
      console.log('error')

    }
  }

  return (
  <section>
    <form action='' method='post'>
      <h1>Sign Up</h1>
       <label>Student Id</label>
      <input type="text" onChange={e => setStudentId(e.target.value)} value={studentid} placeholder='Student Id (ex. 001)' name='studentid' required />
      <label>Username</label>
      <input type="text" onChange={e => setUsername(e.target.value)} value={username} placeholder='username' name='username' required />
      <label>Email</label>
      <input type="email" onChange={e => setEmail(e.target.value)} value={email} placeholder='email' name='email' required />
      <label>Password</label>
      <input type="text" onChange={e => setPassword(e.target.value)} value={password} placeholder='password' name='password' required />
      

      <button onClick={handleSubmit}>Sign Up</button>


      <p>Already have an account? <span style={{color:'blue' ,cursor: 'pointer'}}  onClick={() => navigate('/Login')}>Login</span></p>
      <p>By signing up you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a></p>
     

    </form>
  </section>
  )
}

export default Signup
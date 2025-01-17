import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const RegisterPage = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    async function registerUser(ev){

        ev.preventDefault();
        try{
          await axios.post('/register',{
            name,
            email,
            password,
          });
          alert('registration successful now you can login')
  
        }catch(e){
          alert('registraion failed pls try again later')
        }
            }
  return (
        <div className='mt-4 grow flex flex-col items-center justify-around'>
            <div className='mb-32'>
            <h1 className='text-4xl text-center'>Register</h1>
          <form className='max-w-md mx-auto' onSubmit={registerUser}>
          <input type='text' placeholder='John Doe' 
          value={name} 
          onChange={ev=>setName(ev.target.value)}/>

            <input type='email' placeholder='your@mail.com' 
            value={email} 
          onChange={ev=>setEmail(ev.target.value)}/>
            <input type='password' placeholder='password' 
            value={password} 
            onChange={ev=>setPassword(ev.target.value)}
            />
            <button className='bg-primary rounded-full p-2 w-full mt-8'>Register</button>
            <div className='mt-3 text-center text-gray-500'>
                already have an account ?
                <Link to='/login' className='text-black underline'>Login</Link>
            </div>
          </form>
            </div>
            
        </div>
  )
}

export default RegisterPage

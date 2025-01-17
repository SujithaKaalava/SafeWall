import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported
import { UserContext } from '../UserContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state
  const [redirect, setRedirect] = useState(false); // Track if redirection is needed

  const {setUser}=useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    setLoading(true); // Set loading to true when the request starts
    try {
      const {data} = await axios.post('/login', {
        email,
        password,
      }, { withCredentials: true });

      setUser(data)
      // If login is successful
      alert('Login Successful');

      setRedirect(true); // Set redirect to true after successful login
    } catch (error) {
      setLoading(false); // Set loading to false if there was an error

      // Handle error: check if the data has a message (i.e., from backend)
      const errorMessage = error.UserInfo?.data?.message || error.message;
      alert('Login Failed: ' + errorMessage);
    }
  }

  // Conditionally render redirect if login is successful
  if (redirect) {
    return <Navigate to="/" />; // Redirect to the home page or any other page
  }

  return (
    <div className='mt-4 grow flex flex-col items-center justify-around'>
      <div className='mb-32'>
        <h1 className='text-4xl text-center'>Login</h1>
        <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
          <input
            type='email'
            placeholder='your@mail.com'
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            required
          />
          <input
            type='password'
            placeholder='password'
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            required
          />
          <button
            className='bg-primary rounded-full p-2 w-full mt-8'
            type='submit'
            disabled={loading} // Disable button if loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className='mt-3 text-center text-gray-500'>
            Don't have an account yet?{' '}
            <Link to='/register' className='text-black underline'>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

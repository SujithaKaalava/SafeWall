import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import PlacesPage from './PlacesPage';
import AccountNav from '../AccountNav';



const AccountPage = () => {
  const { ready, user, setUser } = useContext(UserContext);
  const { subpage = 'profile' } = useParams();
  const navigate = useNavigate();
  const [loggedOut, setLoggedOut] = useState(false);

  async function logout() {
    try {
      await axios.post('/logout');
      setUser(null);
      setLoggedOut(true); // Mark as logged out
    } catch (err) {
      console.error('Logout failed:', err.response?.data || err.message);
      alert('Failed to log out. Please try again.');
    }
  }

  if (!ready) {
    return 'Loading...';
  }

  // Redirect only if the user is not logged in and not explicitly logging out
  if (ready && !user && !loggedOut) {
    return <Navigate to="/login" />;
  }

  if (loggedOut) {
    return <Navigate to="/" />; // Redirect to the home page after logout
  }

  

  return (
    <div>
      

      <AccountNav/>
      {subpage === 'profile' && (
        <div className="text-center mt-10 w-1/3 mx-auto">
          <p>
            Logging in as <strong>{user.name}</strong> (<em>{user.email}</em>)
          </p>
          <button
            className="bg-primary rounded-full text-white px-8 py-2 mt-4"
            onClick={logout}
          >
            Log Out
          </button>
        </div>
      )}

{subpage==='places' &&(
  
  <div>
    
    <PlacesPage/>
  </div>
)}

    </div>
  );
};

export default AccountPage;

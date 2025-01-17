import React, { useContext, useEffect, useState } from 'react';
// const React = require('react'); 

import { differenceInCalendarDays } from 'date-fns';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';

const BookingWidget = ({ place }) => { // Correct destructuring of place from props
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [noOfGuests, setnoOfGuests] = useState(1);
  const [name,setName]=useState('')
  const [phone,setPhone]=useState('')
  const [redirect,setRedirect]=useState('')
  const {user} = useContext(UserContext);

  useEffect(()=>{
    if(user){
      setName(user.name);
    }
  },[user])
  const totalDays = checkIn && checkOut
    ? differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    : 0;

    async function bookThisPlace(){
      
      const response=await axios.post('/bookings',{checkIn,checkOut
        ,noOfGuests,name,phone,
        place:place._id,
        price:totalDays*place.price,
      });
      const bookingId=response.data._id
      setRedirect(`/account/bookings/${bookingId}`);
    }

if(redirect){
  return <Navigate to={redirect}/>
}

  return (
    <div>
      <div className="bg-white p-4 rounded-2xl shadow-md">
        
        <div className='border p-2 rounded-lg'>
        <div className="text-2xl text-center">
          Place : Rs.{place.price} / per Night<br />
        </div>
        <div className="border px-4 py-2 rounded-2xl m-2">
          <label>Check-In : </label>
          <input
            type="date"
            value={checkIn}
            onChange={(ev) => setCheckIn(ev.target.value)}
          />
        </div>
        <div className="border px-4 py-2 rounded-2xl m-2">
          <label>Check-Out : </label>
          <input
            type="date"
            value={checkOut}
            onChange={(ev) => setCheckOut(ev.target.value)}
          />
        </div>

        <div className="border px-4 rounded-2xl m-2">
          <label>Number Of Guests : </label>
          <input
            className=""
            value={noOfGuests}
            onChange={(ev) => setnoOfGuests(ev.target.value)}
            type="number"
            min="1"
          />
          
        </div>
        
        <div className="border px-4 rounded-2xl m-2">
          <label>Your Full Name: </label>
          <input
            className=""
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            type="text"
            
          />
          
        </div>
        <div className="border px-4 rounded-2xl m-2">
          <label>Phone Number:</label>
          <input
            className="border rounded-xl mb-2 w-full p-2"
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
            type="tel"
          />
          
        </div>
        </div>
        

        {checkIn && checkOut && (
          <div className="px-4 py-2">
            <p>No. of Days: {totalDays}</p>
            <p>Total Price: Rs.{totalDays * place.price}</p>
          </div>
        )}

        <button onClick={bookThisPlace} className="primary m-3">
          Book This Place
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;



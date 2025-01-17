import React, { useEffect, useState } from 'react'
import AccountNav from '../AccountNav'
import axios from 'axios';
import PlaceImg from '../PlaceImg';
import { differenceInCalendarDays, format } from 'date-fns';
import { Link } from 'react-router-dom';

const BookingsPage = () => {
  const [bookings,setBookings]=useState([]);
  useEffect(()=>{
axios.get('/bookings').then(response=>{
  console.log(response.data)
  setBookings(response.data)
})
  },[])
  return (
    <div>
      <AccountNav/>
      
      <div className=' mt-8'>
        {bookings?.length>0 && bookings.map(booking=>(
          <Link to={`/account/bookings/${booking._id}`} className='flex m-4 gap-4 bg-gray-200 rounded-2xl overflow-hidden'>
            <div className='w-48 h-auto border border-gray-500'>
            <PlaceImg place={booking.place}/>
            
            </div>
        <div className='grow'>
          <h2 className='font-semibold text-xl'>{booking.place.title}</h2>
          <div className='flex gap-2 mt-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
          </svg>

          <p>{format(booking.checkIn,'yyyy-MM-dd')} &rarr; {format(booking.checkOut,'yyyy-MM-dd')}</p>

          </div>

          <div className='flex mt-1 text-sm text-gray-500'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <pre>Rs.{booking.price}  |</pre>
          <div className='flex gap-1'>
            
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>

          <h3>Total no of nights : {differenceInCalendarDays(booking.checkOut,booking.checkIn)}</h3>   
          </div>
          
          </div>
          <div className='pl-1 flex text-sm'>
          </div>
          
        </div>
            
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BookingsPage

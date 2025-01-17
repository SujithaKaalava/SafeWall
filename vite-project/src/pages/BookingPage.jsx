
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingAddress from '../BookingAddress'
import PlaceGallery from '../PlaceGallery'
import { differenceInCalendarDays, format } from 'date-fns';
import BookingDates from '../BookingDates'
const BookingPage = () => {
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true) // To handle loading state
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({ _id }) => _id === id)
        if (foundBooking) {
          setBooking(foundBooking)
        }
        setLoading(false) // Stop loading once data is fetched
      }).catch(() => {
        setLoading(false)
        // You can handle errors here if you want
      })
    }
  }, [id])

  if (loading) {
    return <div>Loading...</div> // Show loading state while fetching data
  }

  if (!booking) {
    return <div>Booking not found</div> // In case the booking is not found
  }

  return (
    <div>
      
      <div className='text-2xl font-semibold mt-8'>
      <h2 className=''>{booking.place.title}</h2>

      </div>
            <BookingAddress>{booking.place.address}</BookingAddress>
            <div className='bg-gray-200 p-4 rounded-2xl mb-4'>
            <h2 className='text-xl mb-3'>Your Booking Information</h2>
            
                    <BookingDates booking={booking}/>
            </div>
            
            <PlaceGallery place={booking.place}/>
            
    </div>
  )
}

export default BookingPage

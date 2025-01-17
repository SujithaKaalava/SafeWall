import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingWidget from '../BookingWidget';
import PlaceGallery from '../PlaceGallery';
import BookingAddress from '../BookingAddress';

const PlacePage = () => {
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchPlace = async () => {
      try {
        const response = await axios.get(`/places/${id}`);
        setPlace(response.data);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError('Failed to fetch place details. Please try again.');
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };

    fetchPlace();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!place) {
    return <div>No place found!</div>;
  }
  
  return (
    <div className="mt-8 bg-gray-100 -mx-8 px-8 pt-4 pb-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{place.title}</h1>
        {/* <a
          className="font-semibold cursor-pointer underline flex my-3"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://maps.google.com/?q=${place.address}`}
        >
          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>

          {place.address}
          
          
        </a> */}
      <BookingAddress>{place.address}</BookingAddress>
      </div>
      
      <PlaceGallery place={place}/>
      
      
      <div className='grid grid-cols-2 md:grid-cols-[2fr_1fr] gap-3 my-8'>
        
        <div>
        <div className=''>
        <h2 className='font-semibold text-2xl'>Description</h2>
        {place.description}
      </div>
      <div className='my-8'>
          Check-In :{place.checkIn}<br/>
          Chek-Out :{place.checkOut}<br/>
          Max-Guests :{place.maxGuests}
          <div>
            
          </div>
      </div>
          
          
        </div>
        <BookingWidget place={place}/>
      </div>
      <div className='bg-white p-4 rounded-2xl border border-t-gray shadow-sm'>
      <h2 className='font-semibold'>Extra Info</h2>
      <div className='mt-2 text-gray-700 text-sm rounded-2xl'>
        
        {place.extraInfo}
        </div>
      </div>
      
    </div>
  );
};

export default PlacePage;

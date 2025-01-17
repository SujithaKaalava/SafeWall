import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Perka from '../Perka';
import axios from 'axios';
import PhotosUploader from '../PhotosUploader';
import PlacesFormPage from './PlacesFormPage';
import AccountNav from '../AccountNav';

const PlacesPage = () => {
  
  const [Places,setPlaces]=useState([])
  useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
      // console.log('Fetched Places:', data); // Log the full response
      setPlaces(data);
    });
  }, []);
  
  
  return (
    <div>
      <AccountNav/>
      
        <div className="text-center min mt-10">

          
          <br/>
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full text-center"
            to={'/account/places/new'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>

            Add new Place
          </Link>
        </div>
        <div>

          
<div></div>
{Places.length > 0 &&
  Places.map((place) => {
    console.log(`place.photos:`, place.photos);  // Log photos to check the paths

    return (
      <Link
        to={`/account/places/${place._id}`}
        className="bg-gray-200 rounded-2xl flex m-2 gap-4 cursor-pointer"
        key={place._id}
      >
        <div className="w-32 h-32 bg-gray-500 rounded-2xl grow shrink-0">
          {place.photos.length > 0 ? (
            <img
              src={`http://localhost:4000/Uploads/${place.photos[0]}`}  // Ensure correct path
              alt="Place Image"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop on error
                e.target.src = '/fallback-image.jpg'; // Use fallback image if error occurs
              }}
              className="w-full h-full object-cover rounded-2xl p-1"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-sm text-gray-500">
              No Image Available
            </div>
          )}
        </div>
        <div className="grow-0 shrink">
          <h2 className="text-xl">{place.title}</h2>
          <p className="text-sm mt-2">{place.description}</p>
        </div>
      </Link>
    );
  })}


 
        </div>

    
    </div>
  );
};

export default PlacesPage;


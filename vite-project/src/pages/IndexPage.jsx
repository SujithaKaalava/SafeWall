import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header'
import axios from 'axios'

const IndexPage = () => {
  const [places,setPlaces]=useState([])
  useEffect(()=>{
axios.get('/places').then(response=>{
  setPlaces(response.data)
})
  },[])
  return (
    <div className='mt-8 gap-x-6 gap-y-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      
        {places.length>0 && places.map(place=>(
          <Link to={'/places/'+place._id}>
            <div className='bg-gray-500 rounded-2xl flex mb-2 overflow-hidden'>
            {place.photos?.[0] && (
            <img className='rounded-2xl object-cover aspect-square w-full h-full' src={'http://localhost:4000/Uploads/'+place.photos?.[0] 
            } alt='/'/>
            )}
            </div>
            
           <div className=''>
           <h3 className='font-bold leading-5 text-wrap'>{place.address}</h3>
           <h2 className='text-sm  leading-3 text-gray-500'>{place.title}</h2>
           </div>
           <div className='mt-2 '>
            <span className='font-bold'>Rs.{place.price}</span> per night
           </div>
          </Link>
        ))
        }
      
    </div>
  )
}




export default IndexPage

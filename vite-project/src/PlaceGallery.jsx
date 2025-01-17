import React, { useState } from 'react'

const PlaceGallery = ({place}) => {

    const [showAllPhotos,setShowAllPhotos]=useState(false)
    if (showAllPhotos) {
        return (
    
          <div className="bg-black text-white min-h-screen absolute inset-0">
            {/* Close button */}
            <div className="fixed top-0 w-full p-4 flex items-center justify-between z-10">
              
              <button
                onClick={() => setShowAllPhotos(false)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 bg-gray-200 rounded-2xl px-2 border border-black shadow shadow-gray-500 right"
              >
                <span className="text-lg ">Close</span>
                <span className="text-2xl">&times;</span>
              </button>
              
            </div>
      {/* photos of the div of all the i,mages */}
            {/* Photos */}
            <div className="p-3 mt-16 space-y-3 bg-black">
              <h2 className='text-2xl mr-20'>photos of the {place.title}</h2>
              {place?.photos?.length > 0 &&
                place.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative w-full aspect-video overflow-hidden rounded-lg shadow-lg"
                  >
                    <img
                      src={'http://localhost:4000/Uploads/' + photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>
        );
      }
    
  return (
    <div>
            <div className='relative'>
      <div className="grid gap-2 grid-cols-[3fr_3fr] lg:grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
        
        <div className="overflow-hidden">
          {place.photos?.[0] && (
            <img onClick={()=>setShowAllPhotos(true)}
              className="w-full h-full object-cover cursor-pointer"
              src={`http://localhost:4000/Uploads/${place.photos[0]}`}
              alt="Main"
            />
          )}
        </div>

        
        <div className="grid gap-2">
          {place.photos?.[1] && (
            <img onClick={()=>setShowAllPhotos(true)}
              className="w-full h-full object-cover cursor-pointer"
              src={`http://localhost:4000/Uploads/${place.photos[1]}`}
              alt="Secondary"
            />
          )}
          <div className=' overflow-hidden'>
          {place.photos?.[2] && (
            <img onClick={()=>setShowAllPhotos(true)}
              className="w-full h-full object-cover cursor-pointer"
              src={`http://localhost:4000/Uploads/${place.photos[2]}`}
              alt="Tertiary"
            />
          )}
          </div>
          
          
        </div>
      </div>
      
      <button onClick={()=>setShowAllPhotos(true)}
      className='absolute bottom-0 right-0 py-2 px-4  border border-black bg-white opacity-80 rounded-2xl shadow shadow-gray-500 flex gap-1 text-sm'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
    </svg>
    Show More Photos</button>
      
      </div>
    </div>
  )
}

export default PlaceGallery

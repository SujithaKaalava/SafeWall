// import React from 'react'

// const PlaceImg = (place,index=0,className=null) => {
//     if(!place.photos?.length){
//         return '';
//     }

//     if(!className){
//         className+='object-cover';
//     }
//   return (
    
      
//             <img onClick={()=>setShowAllPhotos(true)}
//               className={className}
//               src={`http://localhost:4000/Uploads/${place.photos[0]}`}
//               alt="Main"
//             />
          
    
//   )
// }

// export default PlaceImg
import React, { useState } from 'react';

const PlaceImg = ({ place, index = 0, className = '' }) => {
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    // Return nothing if there are no photos
    if (!place.photos?.length) {
        return null;
    }

    // Default class for image if none is passed
    if (!className) {
        className = 'object-cover';
    }

    return (
        <div>
            <img
                onClick={() => setShowAllPhotos(true)} // Set state to show all photos when clicked
                className={className}
                src={`http://localhost:4000/Uploads/${place.photos[index]}`} // Correctly accessing the photo by index
                alt="Main"
            />
            
            {showAllPhotos && (
                <div>
                    {/* Display all photos when the state is true */}
                    {place.photos.map((photo, idx) => (
                        <img key={idx} src={`http://localhost:4000/Uploads/${photo}`} alt={`Photo ${idx}`} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default PlaceImg;

import React, { useEffect } from 'react'
import { useState } from 'react';
import Perka from '../Perka';
import axios from 'axios';
import PhotosUploader from '../PhotosUploader';
import { Navigate, useParams } from 'react-router-dom';
import AccountNav from '../AccountNav';


const PlacesFormPage = () => {
const {id}=useParams()
// console.log(id)


 const [title, setTitle] = useState('');
   const [address, setAddress] = useState('');
   const [description, setDescription] = useState('');
   const [perks, setPerks] = useState([]); // Ensure it's an array
   const [extraInfo, setExtraInfo] = useState('');
   const [addedphotos,setaddeddphotos]=useState([])
   
   
   const [checkIn, setCheckIn] = useState('');
   const [checkOut, setCheckOut] = useState('');
   const [maxGuests, setMaxGuests] = useState(1);
   const [price,setPrice]=useState(100)
   const [redirect,setRedirect]=useState(false)

   useEffect(()=>{
    if(!id){
      return
    }
    axios.get('/places/'+id)
    .then(response=>{
      const {data}=response;
      setTitle(data.title);
      setAddress(data.address);
      setaddeddphotos(data.photos)
      setPerks(data.perks)
      setDescription(data.description);
      setExtraInfo(data.extraInfo)
      setCheckIn(data.checkIn)
      setCheckOut(data.checkOut)
      setMaxGuests(data.maxGuests);
      setPrice(data.price)
    })
   },[id])


  function Inputheader(text) {
      return <h2 className="mt-4 text-2xl">{text}</h2>;
    }
  
    function inputdescription(text) {
      return <p className="text-gray-500">{text}</p>;
    }
  
    function preinput(header, description) {
      return (
        <>
          {Inputheader(header)}
          {inputdescription(description)}
        </>
      );
    }
  
    async function savePlace(ev){
      ev.preventDefault()
      const placeData={
      title,address,addedphotos,
      description,perks,extraInfo,
      checkIn,checkOut,maxGuests,price,}
      if(id){
//update the place
          await axios.put('/places',{
            id,
            ...placeData
            
});
setRedirect(true);
      }
      else{
        //new place
        await axios.post('/places',{placeData});
      }
        
        setRedirect(true);
  
    };
  // if(redirect && action!=='new'){
  //   return <Navigate to={'/account/places'}/>
  // }
  if(redirect){
    return <Navigate to={'/account/places'}/>
  }
  return (
    
      <div>
        <AccountNav/>
                <form onSubmit={savePlace}>
                  {preinput(
                    'Title',
                    'Title for your place should be short and catchy as in advertisement'
                  )}
      
                  <input
                    type="text"
                    value={title}
                    onChange={(ev) => setTitle(ev.target.value)}
                    placeholder="Title, ex my lovely opt"
                  />
      
                  {preinput('Address', 'Add your Address here.')}
      
                  <input
                    type="text"
                    value={address}
                    onChange={(ev) => setAddress(ev.target.value)}
                    placeholder="Address"
                  />
      
                  {preinput('Photos', 'More = Better')}
      
                  <PhotosUploader addedphotos={addedphotos} onChange={setaddeddphotos}/>
      
                  {preinput('Description', 'Description of your place')}
      
                  <textarea value={description} onChange={(ev) => setDescription(ev.target.value)} />
      
                  {preinput('Perks', 'Select all the perks of the place')}
      
                  <Perka selected={perks} onChange={setPerks} /> {/* Pass array to Perka */}
      
                  {preinput('Extra Info', 'House rules, etc.')}
      
                  <textarea value={extraInfo} onChange={(ev) => setExtraInfo(ev.target.value)} />
      
                  {preinput(
                    'Check In & Out Times, Size, Max Guests',
                    'Add check-in & check-out time and remember to leave some time window for cleaning between guests'
                  )}
      
                  <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4 ">
                    <div>
                      <h3 className="mt-2 -mb-1">Check In Time</h3>
                      <input
                        type="text"
                        value={checkIn}
                        onChange={(ev) => setCheckIn(ev.target.value)}
                        placeholder="14"
                      />
                    </div>
      
                    <div>
                      <h3 className="mt-2  -mb-1">Check Out Time</h3>
                      <input
                        type="text"
                        value={checkOut}
                        onChange={(ev) => setCheckOut(ev.target.value)}
                        placeholder="11"
                      />
                    </div>
      
                    <div>
                      <h3 className="mt-2 -mb-1">Max Numbers</h3>
                      <input
                        type="number"
                        value={maxGuests}
                        onChange={(ev) => setMaxGuests(ev.target.value)}
                      />
                    </div>
                    <div>
                      <h3 className="mt-2 -mb-1">Price Per Night</h3>
                      <input
                        type="number"
                        value={price}
                        onChange={(ev) => setPrice(ev.target.value)}
                      />
                    </div>
                  </div>
      
                  <div className="">
                    <button className="primary mt-4 mb-4">Save</button>
                  </div>
                </form>
              </div>
    
  )
}

export default PlacesFormPage

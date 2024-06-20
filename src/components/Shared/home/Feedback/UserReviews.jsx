import React, { useEffect, useRef, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FaStarHalf } from 'react-icons/fa';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { FreeMode, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAxiosCommon from '../../../../hooks/useAxiosCommon';


function UserReviews() {
  const axiosCommon = useAxiosCommon()
  const [allReview,setAllReview] = useState([])


useEffect(()=>{
 getAllFeedback()
},[])
const getAllFeedback =async()=>{
  const {data} =await axiosCommon.get(`/allReview/sort`)
  setAllReview(data)
}

//(allReview)
  const isSmallDevice = window.innerWidth < 700
  return (
    <div data-aos="fade-right" className="flex justify-between gap-16 my-16">
      {/* left side  */}
      <div className="space-y-5 min-w-48">
        <h2 className="text-3xl font-bold">Pasent Reviews</h2>
         <span className="flex items-end"><h3 className="text-[#fc6f03] text-4xl font-bold">4.8</h3> <p>out of 5 Stars</p></span>
         <div className="flex text-xl text-[#fc6f03] ">
         <FaStar></FaStar>
         <FaStar></FaStar>
         <FaStar></FaStar>
         <FaStar></FaStar>
         <FaStarHalf></FaStarHalf>
         </div>
         <small>{1124 + allReview?.length} Verifled Reviews</small>
         <br />
         <Link className="underline text-xl text-[#fc6f03]">All Reviews</Link>
      </div>
     
      {/* right side */}
      {/* rating slider  */}
      <>
      <Swiper
        slidesPerView={ isSmallDevice ?1:3}
        spaceBetween={30}
        freeMode={true}
     
        modules={[FreeMode]}
        className="mySwiper"
      >
    
        {/* slider  */}
        {
        allReview && allReview.map(review =>  <SwiperSlide key={review._id}>
          <div className='flex flex-col cursor-pointer justify-between border-2 border-skyBlue-300 h-full p-4'>
          <div className=''>
           <div className="flex text-xl ">
          {
            [...Array(parseInt(review.ratting))].map(rating => <FaStar className='text-[#fc6f03]' />)
            
          }
          {
            [...Array(5 -parseInt(review.ratting) +1)].map((reating,inx) => {
              if(inx +parseInt(review.ratting) < 5){
               return <FaStar />
              }
            })
          }

        
          </div>
          <p className='text-justify mt-2'>{review.feedback} </p>
           </div>
           <div >
             <h3 className='text-lg font-bold'>{review.Name}</h3>
          
           </div>
          </div>
         </SwiperSlide>)
      }
       
      
       
      </Swiper>
    </>
    </div>
  )
}

export default UserReviews

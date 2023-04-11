import React, { useEffect, useState } from "react";
import "./RentingCardList.css";
import { Link } from "react-router-dom";
import { Slide ,Fade, Zoom} from "react-awesome-reveal";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

//

function RentingCardList() {

  return (
    <div class=" main_fluid-container">
      <div className="row div-container flex flex-col justify-around -mt-20">
      <div>
        <div class="font flex">
        <Slide className="px-4 py-4">
          <b className="text-7xl h-1/4 font-temp pt-16 pb-0 flex" style={{color:"#F4D336"}}><p className="text-black px-4">Rental </p> Services</b></Slide>
        </div>
        
      <Fade direction="up"><p className="w-1/2 text-white flex my-12 text-lg mx-8" style={{fontFamily:"sans-serif"}}>
        Find quality farm equipment for your operation with our rental service.<br/>
         From tractors to tillers, we offer a variety of options to fit your needs. 
         Convenient, reliable, and hassle-free rentals for a stress-free farming experience.
        </p></Fade></div>
        <Zoom> 
        <button type="button" className="flex px-12 py-6 text-3xl mx-8 justify-center content-center h-20 w-1/4 rounded-3xl" style={{backgroundColor:"#F4D336",fontWeight:"700"}}>
          <Link className="view-more-link" to="/rent">
            Know More
            <ArrowForwardIosIcon />
          </Link>
        </button></Zoom>
      </div>
    </div>
  );
}

export default RentingCardList;

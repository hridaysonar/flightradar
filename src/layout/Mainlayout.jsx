import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Component/Nav/Navbar';
import FlySkyFooter from '../Component/Footer/FlySkyFooter';
// import ShareTripFooter from '../Component/Footer/ShareTripFooter';


// import OpportunitiesSlider from '../Component/Slider/OpportunitiesSlider';
// import MyMarquee from '../page/MyMarquee';

const Mainlayout = () => {
  return (
    <div>
      <Navbar/>
      {/* <Slider/> */}
      <Outlet/>
      {/* <MyMarquee/> */}
      {/* <OpportunitiesSlider/> */}
    {/* <ShareTripFooter/> */}
    <FlySkyFooter/>
    </div>
  );
};

export default Mainlayout;
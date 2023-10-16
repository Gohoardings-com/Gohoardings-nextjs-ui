import Banner from '@/components/influencerComponents/banner';
import Navbar from '@/components/influencerComponents/navbar/navbar';
import Floatingnavbar from '@/components/influencerComponents/navbar/navbar-float';
import OurClients from '@/components/influencerComponents/ourClients';
import OurInfluencer from '@/components/influencerComponents/ourInfluencer';
import WhyUs from '@/components/influencerComponents/whyUs';
import React from 'react';

const Index = () => {
  return (
    <>
      <Navbar/>
      <Floatingnavbar/>
      <Banner/>
      <OurClients/>
      <OurInfluencer/>
      <WhyUs/>
    </>
  );
}

export default Index;

import Banner from '@/components/influencerComponents/banner';
import ContactUs from '@/components/influencerComponents/contactUs';
import FaqsInfluencer from '@/components/influencerComponents/faqs';
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
      <ContactUs/>
      <FaqsInfluencer/>
    </>
  );
}

export default Index;

import React from 'react'
import HeroSection from '../components/home/HeroSection'
import FeaturedProducts from '../components/home/FeaturedProducts'
import HowItWorks from '../components/home/HowItWorks'
import WatchSection from '../components/home/WatchSection'

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <HowItWorks />
      <WatchSection />
    </>
  )
}

export default HomePage
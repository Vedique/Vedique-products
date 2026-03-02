import React, { useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { products } from '../data/products'
import { Tabs, Button, message } from 'antd'
import { motion, AnimatePresence } from 'framer-motion'
import ReviewsSection from '../components/products/ReviewsSection'

const ProductPage = () => {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)
  const [messageApi, contextHolder] = message.useMessage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const thumbnailRef = useRef(null)

  if (!product) {
    return <div className="pt-20 text-center md:pt-24">Product not found</div>
  }

  // Use images array if available, otherwise create array with single image
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image]

  const handleAddToCart = () => {
    messageApi.success('Added to cart!')
  }

  const handleContactOrder = () => {
    const messageText = `Hi, I would like to order ${product.name}`
    window.open(`https://wa.me/8015154989?text=${encodeURIComponent(messageText)}`, '_blank')
  }

  const nextImage = () => {
    if (productImages.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === productImages.length - 1 ? 0 : prev + 1
      )
      
      // Scroll corresponding thumbnail into view
      setTimeout(() => {
        if (thumbnailRef.current) {
          const nextIndex = currentImageIndex === productImages.length - 1 ? 0 : currentImageIndex + 1;
          const thumbnail = thumbnailRef.current.children[nextIndex];
          if (thumbnail) {
            thumbnail.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center'
            });
          }
        }
      }, 50);
    }
  }

  const prevImage = () => {
    if (productImages.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? productImages.length - 1 : prev - 1
      )
      
      // Scroll corresponding thumbnail into view
      setTimeout(() => {
        if (thumbnailRef.current) {
          const prevIndex = currentImageIndex === 0 ? productImages.length - 1 : currentImageIndex - 1;
          const thumbnail = thumbnailRef.current.children[prevIndex];
          if (thumbnail) {
            thumbnail.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center'
            });
          }
        }
      }, 50);
    }
  }

  const changeImage = (index) => {
    setCurrentImageIndex(index)
    
    // Scroll thumbnail into view
    if (thumbnailRef.current) {
      const thumbnail = thumbnailRef.current.children[index];
      if (thumbnail) {
        thumbnail.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }

  // Simple fade animation only
  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.15 } },
    exit: { opacity: 0, transition: { duration: 0.1 } }
  }

  const tabItems = [
    {
      key: 'description',
      label: 'Description',
      children: <p className="leading-relaxed text-gray-600">{product.fullDescription}</p>,
    },
    {
      key: 'ingredients',
      label: 'Ingredients',
      children: (
        <ul className="space-y-2 pl-5">
          {product.ingredients?.map((ingredient, index) => (
            <li key={index} className="text-gray-600">
              {ingredient}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: 'how-to-use',
      label: 'How to Use',
      children: <p className="leading-relaxed text-gray-600">{product.howToUse}</p>,
    },
    {
      key: 'benefits',
      label: 'Benefits',
      children: (
        <ul className="list-disc space-y-2 pl-5">
          {product.benefits?.map((benefit, index) => (
            <li key={index} className="text-gray-600">
              {benefit}
            </li>
          ))}
        </ul>
      ),
    },
  ]

  return (
    <div className="section-padding pt-20 md:pt-24">
      {contextHolder}
      <div className="container-custom">
       <div style={{ marginBottom: '1rem' }}>
  <Link
    to="/products"
    className="inline-flex items-center gap-1.5 text-black text-sm font-medium hover:text-[#1e3a24] transition-colors"
    style={{ textDecoration: 'none' }}
  >
    <span aria-hidden="true">&larr;</span> Back to all products
  </Link>
</div>
        <div className="mb-10 grid gap-8 md:mb-16 md:grid-cols-2 md:gap-12">
          {/* Right Column - Images */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 md:order-2"
          >
            {/* Big Main Image with Always Visible Navigation Arrows */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={productImages[currentImageIndex]}
                  alt={`${product.name} - View ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  variants={fadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%'
                  }}
                  onError={(e) => {
                    console.error('Image failed to load:', productImages[currentImageIndex]);
                    e.target.src = 'https://via.placeholder.com/500?text=Image+Not+Found';
                  }}
                />
              </AnimatePresence>

              {/* Left Navigation Arrow - Always Visible */}
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm text-[#2f5a37] rounded-full p-2.5 shadow-lg hover:bg-white border border-white/50 transition-all duration-200 hover:scale-110 active:scale-95"
                    aria-label="Previous image"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Right Navigation Arrow - Always Visible */}
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm text-[#2f5a37] rounded-full p-2.5 shadow-lg hover:bg-white border border-white/50 transition-all duration-200 hover:scale-110 active:scale-95"
                    aria-label="Next image"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Image Counter Badge */}
              {productImages.length > 1 && (
                <div className="absolute bottom-3 right-3 bg-[#2f5a37]/80 text-white px-2 py-1 rounded-full text-xs backdrop-blur-md border border-white/20 z-10">
                  <span className="font-semibold">{currentImageIndex + 1}</span>
                  <span className="text-white/60"> / {productImages.length}</span>
                </div>
              )}
            </div>

            {/* Small Thumbnail Images - With margin top and spacing between */}
            {productImages.length > 1 && (
              <div className="relative mt-6">
                {/* Scrollable thumbnails container */}
                <div 
                  ref={thumbnailRef}
                  className="flex overflow-x-auto scrollbar-hide scroll-smooth pb-2"
                  style={{ 
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    gap: '1rem',
                  }}
                >
                  {productImages.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => changeImage(index)}
                      className={`relative flex-shrink-0 w-10 h-10 rounded-md overflow-hidden shadow-sm transition-all duration-200 ${
                        currentImageIndex === index 
                          ? 'ring-2 ring-[#2f5a37] ring-offset-2 scale-105' 
                          : 'opacity-60 hover:opacity-100'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/40?text=Error';
                        }}
                      />
                    </motion.button>
                  ))}
                </div>
                
                {/* Gradient fade indicators for scroll */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
              </div>
            )}
          </motion.div>

          {/* Left Column - Product Info */}
          {/* Left Column - Product Info */}
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5 }}
  className="space-y-4 md:space-y-6 md:order-1"
>
  {/* Product Name - Always at the top */}
  <div className="mb-2">
    <h1 className="text-3xl font-light md:text-5xl">{product.name}</h1>
  </div>
  
  <p className="text-sm uppercase tracking-wide text-gray-500">
    {product.category} {product.subCategory ? `| ${product.subCategory}` : ''}
  </p>
  <p className="text-lg text-gray-600 md:text-xl">{product.shortDescription}</p>

  <div className="flex items-center gap-4">
    <span className="text-2xl font-light md:text-3xl">Rs. {product.price}</span>
    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-[#2f5a37]">{product.stockStatus}</span>
  </div>

  {/* Simplified Weight Display - Only 250g with green styling */}
  <div className="flex items-center border border-[#d8e9d9] rounded-lg p-3 max-w-[120px] bg-[#f4fbf4]">
    <div>
      <p className="text-xs text-[#2f5a37] uppercase mb-0.5 font-medium">Net Weight</p>
      <p className="text-base font-medium m-0 text-[#1e3a24]">{product.netWeight}</p>
    </div>
  </div>

  {/* Dietary Info Tags - Green rounded rectangle boxes like before */}
  <div className="flex flex-wrap gap-2 my-4">
    {product.dietaryInfo?.map((item) => (
      <span
        key={item}
        style={{
          border: '1px solid #d8e9d9',
          borderRadius: '999px',
          padding: '0.3rem 0.65rem',
          fontSize: '0.8rem',
          color: '#2f5a37',
          background: '#f4fbf4',
          display: 'inline-flex',
          alignItems: 'center',
          whiteSpace: 'nowrap'
        }}
      >
        {item}
      </span>
    ))}
  </div>

  <div className="flex flex-wrap gap-3 pt-3 md:gap-4 md:pt-4">
    <Button 
      className="btn-primary" 
      size="large" 
      onClick={handleAddToCart}
      style={{ 
        backgroundColor: '#2f5a37',
        borderColor: '#2f5a37',
        color: 'white'
      }}
    >
      Add to Cart
    </Button>
    <Button 
      className="btn-outline" 
      size="large" 
      onClick={handleContactOrder}
      style={{ 
        borderColor: '#2f5a37',
        color: '#2f5a37'
      }}
    >
      Contact to Order
    </Button>
  </div>
</motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 md:mb-16"
        >
          <Tabs 
            defaultActiveKey="description" 
            items={tabItems} 
            className="product-tabs"
            tabBarStyle={{ color: '#2f5a37' }}
          />
        </motion.div>

        <ReviewsSection />
      </div>
    </div>
  )
}

export default ProductPage
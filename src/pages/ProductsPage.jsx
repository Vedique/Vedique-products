import React, { useMemo, useState } from 'react'
import { products } from '../data/products'
import ProductCard from '../components/products/ProductCard'
import { motion } from 'framer-motion'

const DISPLAY_CATEGORIES = ['All', 'Food', 'Wellness', 'Skincare']

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All')

  const categoryCounts = useMemo(() => {
    return products.reduce((acc, product) => {
      const key = product.category || 'Other'
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})
  }, [])

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return products
    return products.filter((product) => product.category === activeCategory)
  }, [activeCategory])

  return (
    <section className="section-padding pt-40 overflow-x-hidden md:pt-48" id="products">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: '1.75rem' }}
        >
          <p
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              fontSize: '0.78rem',
              color: '#7a6856',
              marginBottom: '0.6rem',
            }}
          >
            Our Collection
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, marginBottom: '0.7rem' }}>
            Shop by Category
          </h1>
          <p style={{ color: '#6f6256', maxWidth: '720px' }}>
            Start with Food and explore our current products. More categories will be added as we expand.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '2rem' }}>
          {DISPLAY_CATEGORIES.map((category) => {
            const count = category === 'All' ? products.length : categoryCounts[category] || 0
            const isDisabled = category !== 'All' && count === 0
            const isActive = activeCategory === category

            return (
              <button
                key={category}
                type="button"
                onClick={() => !isDisabled && setActiveCategory(category)}
                disabled={isDisabled}
                style={{
                  border: isActive ? '1px solid #2f5a37' : '1px solid #d8ccbf',
                  background: isActive ? '#edf6ee' : '#fff',
                  color: isDisabled ? '#aa9b8d' : '#3f3429',
                  padding: '0.5rem 0.9rem',
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                }}
              >
                {category} ({count})
              </button>
            )
          })}
        </div>

        {filteredProducts.length === 0 ? (
          <div style={{ color: '#7d6d5e' }}>No products in this category yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {filteredProducts.map((product, index) => (
              // ✅ Removed scale-50 — it was shrinking cards to half size
              <div key={product.id} className="w-full">
                <ProductCard product={product} index={index} compact />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductsPage
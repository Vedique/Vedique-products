import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from 'antd'
import { motion } from 'framer-motion'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

const ProductCard = ({ product, index, compact = false }) => {
  const isEven = index % 2 === 0
  const navigate = useNavigate()
  const isMobile = useIsMobile()

  const openProduct = () => navigate(`/product/${product.slug}`)

  const isRow = !isMobile
  const rowReverse = isRow && !compact && !isEven

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 20 : (isEven ? -30 : 30) }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-50px' }}
      style={{ height: '100%', cursor: 'pointer' }}
      onClick={openProduct}
    >
      <Card
        className="card-shadow overflow-hidden rounded-2xl border-0"
        styles={{ body: { padding: compact ? '0.75rem' : '1.5rem', height: '100%' } }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: isRow ? (rowReverse ? 'row-reverse' : 'row') : 'column',
            gap: isRow ? (compact ? '1rem' : '2rem') : '0.75rem',
            alignItems: 'flex-start',
            height: '100%',
          }}
        >
          {/* Image */}
          <div style={{ flexShrink: 0, width: isRow ? (compact ? '40%' : '50%') : '100%' }}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                borderRadius: '8px',
                objectFit: 'cover',
                display: 'block',
                minHeight: compact ? '180px' : isMobile ? '200px' : '260px',
                height: compact && isRow ? '100%' : 'auto',
              }}
            />
          </div>

          {/* Content column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              flex: 1,
              minWidth: 0,
              gap: compact ? '0.45rem' : '0.75rem',
            }}
          >
            {/* Product Name */}
            <h3 style={{ fontSize: compact ? 'clamp(1rem, 2vw, 1.2rem)' : 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 300, lineHeight: 1.3, margin: 0, padding: 0, width: '100%' }}>
              {product.name}
            </h3>

            {/* Category */}
            <p style={{ margin: 0, padding: 0, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9b8c7e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
              {product.category}{product.subCategory ? ` | ${product.subCategory}` : ''}
            </p>

            {/* Short Description */}
            <p style={{ margin: 0, padding: 0, fontSize: compact ? '0.83rem' : '0.9rem', color: '#6b5e53', lineHeight: 1.6, width: '100%', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: compact ? 1 : 2, WebkitBoxOrient: 'vertical' }}>
              {product.shortDescription}
            </p>

            {/* Price + Stock + Net Weight in one line */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap',
              width: '100%'
            }}>
              {/* Price with label */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.2rem'
              }}>
                <span style={{
                  fontSize: '0.7rem',
                  color: '#6b5e53',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em'
                }}>
                  Price:
                </span>
                <span style={{
                  fontSize: compact ? '1.05rem' : '1.2rem',
                  fontWeight: 500,
                  color: '#1e3a24'
                }}>
                  ₹{product.price}
                </span>
              </div>

              <span style={{
                color: '#9b8c7e',
                fontSize: '0.7rem'
              }}>
                •
              </span>

              {/* Stock Status - No background, just green text */}
              <span style={{
                color: '#2e7d32',
                fontSize: '0.75rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap'
              }}>
                {product.stockStatus}
              </span>

              <span style={{
                color: '#9b8c7e',
                fontSize: '0.7rem'
              }}>
                •
              </span>

              {/* Net Weight */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.2rem'
              }}>
                <span style={{
                  fontSize: '0.7rem',
                  color: '#6b5e53',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em'
                }}>
                  Net Wt:
                </span>
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: '#1e3a24',
                  whiteSpace: 'nowrap'
                }}>
                  {product.netWeight}
                </span>
              </div>
            </div>
            {/* Dietary Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {product.dietaryInfo?.map((item) => (
                <span key={item} style={{ border: '1px solid #d8e9d9', borderRadius: '999px', padding: '0.15rem 0.5rem', fontSize: '0.67rem', color: '#2f5a37', background: '#f4fbf4', whiteSpace: 'nowrap', lineHeight: '1.4' }}>
                  {item}
                </span>
              ))}
            </div>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* View Product */}
            <div style={{ width: '100%', borderTop: '1px solid #f0ebe5', paddingTop: '0.6rem', marginTop: '0.25rem' }}>
              <Button
                className="btn-primary"
                onClick={(e) => { e.stopPropagation(); openProduct() }}
                style={{ backgroundColor: '#2f5a37', borderColor: '#2f5a37', color: 'white' }}
              >
                View Product
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default ProductCard
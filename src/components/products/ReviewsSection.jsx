import React, { useState } from 'react'
import { Form, Input, Rate, Button, Card, message } from 'antd'
import { motion } from 'framer-motion'

const { TextArea } = Input

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([])
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = (values) => {
    const newReview = {
      ...values,
      id: Date.now(),
      date: new Date().toLocaleDateString()
    }
    setReviews([newReview, ...reviews])
    form.resetFields()
    messageApi.success('Review submitted successfully!')
  }

  return (
    <div className="mt-10 md:mt-16">
      {contextHolder}
      <h2 className="mb-5 text-2xl font-light md:mb-8 md:text-3xl">Customer Reviews</h2>
      
      {reviews.length === 0 ? (
        <Card className="mb-6 py-8 text-center md:mb-8 md:py-12">
          <p className="text-sm text-gray-500 md:text-base">No reviews yet. Be the first to review this product!</p>
        </Card>
      ) : (
        <div className="mb-6 space-y-3 md:mb-8 md:space-y-4">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{review.name}</h3>
                    <Rate disabled defaultValue={review.rating} className="text-gold" />
                  </div>
                  <span className="text-xs text-gray-400 md:text-sm">{review.date}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600 md:text-base">{review.review}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <Card className="mt-6 md:mt-8">
        <h3 className="mb-4 text-lg font-light md:mb-6 md:text-xl">Write a Review</h3>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input className="rounded-lg" />
          </Form.Item>

          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: 'Please select a rating' }]}
          >
            <Rate className="text-gold" />
          </Form.Item>

          <Form.Item
            name="review"
            label="Review"
            rules={[{ required: true, message: 'Please enter your review' }]}
          >
            <TextArea rows={4} className="rounded-lg" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" className="btn-primary">
              Submit Review
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default ReviewsSection

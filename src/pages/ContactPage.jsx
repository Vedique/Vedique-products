import React from 'react'
import { Form, Input, Button, message } from 'antd'
import { motion } from 'framer-motion'
import { 
  MailOutlined, 
  WhatsAppOutlined, 
  InstagramOutlined, 
  YoutubeOutlined, 
  FacebookOutlined,
  SendOutlined 
} from '@ant-design/icons'

const ContactPage = () => {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = (values) => {
    const messageText = `*New Website Inquiry*\n\n*Name:* ${values.name}\n*Email:* ${values.email}\n*Message:* ${values.message}`
    window.open(`https://wa.me/918015154989?text=${encodeURIComponent(messageText)}`, '_blank')
    messageApi.success('Opening WhatsApp...')
  }

  return (
    <div className="min-h-screen bg-[#fcfdfc] pb-12 pt-20 md:pt-28">
      {contextHolder}
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* Header - Scaled for Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center md:mb-16"
        >
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#2f5a37] uppercase">
            Let's Connect
          </span>
          <h1 className="mt-2 text-3xl font-light text-[#1e3a24] md:text-5xl lg:text-6xl">
            Get in <span className="italic font-serif text-[#2f5a37]">Touch</span>
          </h1>
          <p className="max-w-xl mx-auto mt-4 text-sm text-gray-500 md:text-base">
            Have questions about our natural products? We're just a message away.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          
          {/* Contact Details Cards - Top on Mobile, Left on Desktop */}
          <motion.div 
            className="space-y-4 lg:col-span-4 lg:order-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl md:p-8">
              <h3 className="mb-6 text-lg font-medium text-[#1e3a24]">Contact Info</h3>
              
              <div className="space-y-5">
                <a href="mailto:vediqueproducts@gmail.com" className="flex items-center gap-4 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f4fbf4] text-[#2f5a37]">
                    <MailOutlined />
                  </div>
                  <span className="text-sm text-gray-600 truncate group-hover:text-[#2f5a37]">vediqueproducts@gmail.com</span>
                </a>

                <a href="https://wa.me/918015154989" className="flex items-center gap-4 group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f4fbf4] text-[#2f5a37]">
                    <WhatsAppOutlined />
                  </div>
                  <span className="text-sm text-gray-600 group-hover:text-[#2f5a37]">+91 80151 54989</span>
                </a>
              </div>

              <div className="pt-8 mt-8 border-t border-gray-50">
                <p className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">Follow Us</p>
                <div className="flex gap-3">
                  {[
                    { icon: <InstagramOutlined />, link: 'https://instagram.com/vediqueproducts', color: '#E4405F' },
                  { icon: <FacebookOutlined />, link: 'https://facebook.com/Vedique-S/61586468189630/', color: '#1877F2' },
                  { icon: <YoutubeOutlined />, link: 'https://youtube.com/@Vedique-products', color: '#FF0000' }
                  ].map((item, i) => (
                    <a key={i} href={item.link} className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 text-gray-400 hover:bg-[#2f5a37] hover:text-white transition-all">
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form - Bottom on Mobile, Middle on Desktop */}
          <motion.div 
            className="lg:col-span-8 lg:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="px-5 py-8 bg-white shadow-xl rounded-3xl md:p-10 ring-1 ring-gray-900/5">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
              >
                <div className="grid gap-x-6 md:grid-cols-2">
                  <Form.Item
                    name="name"
                    label={<span className="text-xs font-bold text-gray-400 uppercase">Full Name</span>}
                    rules={[{ required: true, message: 'Please enter your name' }]}
                  >
                    <Input placeholder="Your name" className="h-12 rounded-xl bg-gray-50 border-none focus:bg-white focus:ring-2 focus:ring-[#2f5a37]/20" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label={<span className="text-xs font-bold text-gray-400 uppercase">Email</span>}
                    rules={[{ required: true, type: 'email' }]}
                  >
                    <Input placeholder="Email address" className="h-12 rounded-xl bg-gray-50 border-none focus:bg-white focus:ring-2 focus:ring-[#2f5a37]/20" />
                  </Form.Item>
                </div>

                <Form.Item
                  name="message"
                  label={<span className="text-xs font-bold text-gray-400 uppercase">Your Message</span>}
                  rules={[{ required: true }]}
                >
                  <Input.TextArea 
                    rows={4} 
                    placeholder="Tell us what you're looking for..." 
                    className="rounded-xl bg-gray-50 border-none focus:bg-white focus:ring-2 focus:ring-[#2f5a37]/20" 
                  />
                </Form.Item>

                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block
                  icon={<SendOutlined />}
                  className="h-14 mt-2 rounded-xl bg-[#2f5a37] border-none text-base font-medium hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Send to WhatsApp
                </Button>
              </Form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default ContactPage
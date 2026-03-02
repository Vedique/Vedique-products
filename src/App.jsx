import React from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import AppRouter from './router'
import ScrollToTop from './components/common/ScrollToTop'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <AppRouter />
      </main>
      <Footer />
    </div>
  )
}

export default App
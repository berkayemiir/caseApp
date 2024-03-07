import React from 'react'
import "./globals.css"
import { Navbar } from './components/Header/Navbar'

const Layout = ({ children }) => {
  return (
      <html lang='en'>
          <body className="bg-cover bg-center h-screen">
            <Navbar/>
                      {children}
               
          </body>
      </html>
  )
}

export default Layout

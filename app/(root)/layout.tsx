import React from 'react'
import Sidebar from '../../components/shared/Sidebar'
import MobileNav from '@/components/shared/MobileNav'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const Layout =  ({children} : {children : React.ReactNode})  => {
  return (
    <ErrorBoundary>
      <main className='root'>
        <Sidebar />
        <MobileNav />
        <div className="root-container">
            <div className="wrapper">
                {children}
            </div>
        </div>
      </main>
    </ErrorBoundary>
  )
}

export default Layout


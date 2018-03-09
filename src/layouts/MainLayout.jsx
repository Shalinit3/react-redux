/**
 * Layout with MAIN HEADER only and will mostly used throught the site
 */

import React from 'react'

import Header from '../components/Header'
import { visibilityHOC } from '../HOC'

const VisibilityHeader = visibilityHOC(Header)

function MainLayout ({children}) {
  return (
    <div>
      <VisibilityHeader />
      <div className='main-content'>
        { children }
      </div>
    </div>
  )
}

export default MainLayout

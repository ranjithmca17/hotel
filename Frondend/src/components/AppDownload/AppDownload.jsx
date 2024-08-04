import React from 'react'
import "./AppDownload.css"
import { assets } from '../../assets/assets'
export default function AppDownload() {
  return (
    <div className='app-download' id='app-download'>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, ipsam!</p>
      <div className="app-download-platform">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  )
}

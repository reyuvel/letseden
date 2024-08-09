import React from 'react'
import '../css/Hostside.css';
import { Link } from 'react-router-dom';

export const Hostside = () => {
  return (
    <div >
        <div className="sidenav">
            <ul className='title'>
                
                <li className='title'>
                    <Link to='/hosthome' className='side' href="">Home</Link>
                </li>

                <li className='title'>
                    <Link to='/hostschedule' className='side' href="">Schedule+</Link></li>
                <li className='title'><a className='side' href="">Settings</a></li>

            </ul>
        </div>
    </div>
  )
}

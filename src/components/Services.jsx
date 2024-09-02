import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChurch,faMicrophone,faPenToSquare } from '@fortawesome/free-solid-svg-icons'

export const Services = () => {
    return (
        <div>
            <section id='service'>
                <div className='container container1'>
                    <div className='row'>
                        <div className='col-12'>
                            <h3 className='fs-5 text-center mb-0'>What We Offer</h3>
                            <h1 className='display-6 text-center mb-4'>We</h1>
                            <hr className='w-25 mx-auto' />
                        </div>
                    </div>


                    <div className='row'>
                        <div className="col-md-4">
                            <div class="card" style={{height:'300px'}}>
                                <div class="card-body text-center">
                                <FontAwesomeIcon icon={faChurch} className="fa-4x mb-4 text-primary icon-color-home" />
                                <h5 class="card-title">Find Fellowship</h5>
                                    <p class="card-text">Just by one click you get the access aand details to all the churches and fellowship just around you.Select from the the thousands of fellowship around you</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div class="card " style={{height:'300px'}}>
                                <div class="card-body text-center">
                                <FontAwesomeIcon icon={faMicrophone} className="fa-4x mb-4 text-primary icon-color-home" style={{ color: 'red' }} />
                                    <h5 class="card-title">Announce Meetings</h5>
                                    <p class="card-text">Announce your meeting just by few clicks so that the people around you can reach you.Make your community a larger.</p>
                                </div>
                            </div>

                        </div>
                        
                        <div className="col-md-4" >
                            <div class="card" style={{height:'300px'}}>
                            <div class="card-body text-center">
                            <FontAwesomeIcon icon={faPenToSquare} className="fa-4x mb-4 text-primary icon-color-home" />
                                    <h5 class="card-title"></h5>
                                    <p class="card-text">Schedule reminders to get to the gathering.We will take care of your fellowship wanting heart.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

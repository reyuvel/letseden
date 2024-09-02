import React from 'react'
import contactImage from './contact.jpg'
import { CAlert ,CCol, CFormCheck, CFormInput, CForm,CFormSelect, CButton } from '@coreui/react';


export const Contact = () => {
  return (
    <div>
        <section id="contact">
            <div className='container'>
                <div className="row">
                    <div className="col-md-6">
                        <img className='contactimage' src={contactImage} alt="Contact"></img>                    
                    </div>

                    <div className="col-md-6" style={{marginTop:'20px' }}>
                    <h1>Need A Support?</h1>
                    <h5>You can have a call back</h5>
                    <hr className='w-10 mx-auto'></hr>
                    <CCol md={6}>
  <CFormInput type="text" id="firstname" placeholder='name' required/>
</CCol>

                    </div>
                    
                </div>
            </div>
        </section>
    </div>
  )
}

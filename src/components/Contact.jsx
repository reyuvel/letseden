import React from 'react'
import contactImage from './contact.jpg'
import { CAlert, CCol, CFormCheck, CFormInput, CForm, CFormSelect, CButton } from '@coreui/react';
import { Footer } from './Footer';


export const Contact = () => {
  return (
    <div>
      <section id="contact">
        <div className='container'>
          <div className="row" style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
          <div className="col-12 col-md-6" style={{ marginTop: '20px' }}>
          <img className='contactimage' src={contactImage} alt="Contact" style={{height:'450px',width:'450px'}}></img>
            </div>

            <div className="col-12 col-md-6" style={{ height:'450px', marginTop: '20px' }}>
              <h1>Need A Support?</h1>
              <h5>You Can Have A Call Back</h5>
              <hr className='w-10 mx-auto'></hr>

              <div className="support-border">

                <CCol md={9} style={{ marginTop: '10px', alignItems: 'center' }} >

                  <CFormInput type="text" id="name" placeholder='Name' required />
                </CCol>

                <CCol md={9} style={{ marginTop: '20px' }}>
                  <CFormInput type="email" id="email" placeholder='Email' required />
                </CCol>

                <CCol md={9} style={{ marginTop: '20px', marginBottom: '20px' }}>
                  <CFormInput type="tel" id="phone" placeholder='Phone' required />
                </CCol>

                <button style={{ borderRadius: '20px', width: '80px', height: '30px',backgroundColor:'jadegreen' }}>Submit</button>
             </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

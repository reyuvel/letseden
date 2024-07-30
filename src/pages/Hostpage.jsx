import React from 'react';
import Navbar from '../components/Navbar';
import { CAlert ,CCol, CFormCheck, CFormInput, CForm,CFormSelect, CButton } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/Hostpage.css';
import { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useNavigate } from "react-router-dom";


export const Hostpage = () => {
  let navigate = useNavigate(); // Initialize useHistory

const [phone1, setPhone1] = useState('');
const [phone2, setPhone2] = useState('');
const handleAddClick = () => {
  navigate('/addevent'); // Use history.push to navigate to the "/map" route
};


  return (

    <>
    <Navbar/>

    <div>
    <CForm className="row g-3">
    <h1>Host Details</h1>

    <CCol md={6}>
  <CFormInput type="text" id="firstname" label="Firstname" required/>
</CCol>
<CCol md={6}>
  <CFormInput type="text" id="lastname" label="Lastname" required />
</CCol>
<CCol md={6}>
<CFormInput type="text" id="Church" label="Church Name" required/>
</CCol>
<CCol md={6}>
<CFormInput type="email" id="churchemail" label="Email" placeholder='Eg:church@gmail.com' required/>
</CCol>
  <CCol xs={12}>
    <CFormInput id="inputAddress" label="Address" placeholder="1234 Main St" required/>
  </CCol>
  <CCol>
  <label htmlFor="phone-input" style={{ display: 'block', marginBottom: '6px' }} required>Phone 1</label>
      <PhoneInput
        id="phone1"
        defaultCountry="IN"
        value={phone1}
        onChange={setPhone1}
      />
      </CCol>

      <CCol>
  <label htmlFor="phone-input" style={{ display: 'block', marginBottom: '6px' }}>Phone 2</label>
      <PhoneInput
        id="phone2"
        defaultCountry="IN"
        value={phone2}
        onChange={setPhone2}
      />
      </CCol>
  <CCol md={6}>
    <CFormInput id="inputCity" label="City" required/>
  </CCol>
  <CCol md={4}>
    <CFormSelect id="inputState" label="State" required>
      <option>Choose...</option>
      <option>India</option>
    </CFormSelect>
  </CCol>
  <CCol md={2}>
    <CFormInput id="inputZip" label="Zip"  required/>
  </CCol>
  <CCol xs={12}>
    <CButton onClick={handleAddClick} className='submitbtn' color="primary" type="submit">Submit</CButton>
  </CCol>
</CForm>
    </div>

    </>
  )
}

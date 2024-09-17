import React, { useEffect } from 'react';
import LoggedNavbar from '../components/LoggedNavbar';
import { CAlert, CCol, CFormCheck, CFormInput, CForm, CFormSelect, CButton } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Hostpage.css';
import { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useNavigate } from "react-router-dom";
import image from '../components/tellus.png'
import supabase  from '../config/supabaseClient'

export const Hostpage = () => {
  let navigate = useNavigate(); // Initialize useNavigate


  const [churchName,setChurchName]=useState('');
  const [churchmail,setChurchmail]=useState('');
  const [designation,setDesignation]=useState('');
  const [pastorName,setPastorName]=useState('');
  const[phone1,setPhone1]=useState('');
  const[phone2,setPhone2]=useState('');
  const[address,setAddess]=useState('');
  const[churchstate,setChurchState]=useState('');
  const[city,setCity]=useState('');
  const[pincode,setPincode]=useState('');
  const[user,setUser]=useState('null');
  const[errormessage,setErrorMessage]=useState('');


  useEffect(()=>{

    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
  };

  fetchUser();
}, []);



  const handleSubmitClick = async(e) => {

    e.preventDefault();

    if(!churchName || !churchmail || !churchstate || !pastorName || !designation || !phone1 || !phone2 || !city || !address || !pincode
    )

    {
      setErrorMessage('All fields are required');
      alert("Please enter all the details")
      return;
    }

    const {data:churchData,error:churchError}= await supabase

        .from('Churches')
        .insert([
          {
            designation,
            pastorName,
            churchName,
            churchmail,
            phone1,
            phone2,
            churchstate,
            city,
            pincode,
            address,
            id:user.id


          }
        ]);

        const {data:detailGiven,error:detailError}=await supabase
        .from('Churchdetailgiven')
        .insert([
          {
            id:user.id
          }
        ])


        if(detailError)
        {
          console.log(detailError)
        }

        else
        {
          navigate('/hosthome');
          console.log('data inserted successfully',{churchData,detailGiven})
        }
  };




  return (
    <>
      <LoggedNavbar />
      <div className="container">
        <div className="row">
          <div className="col-md-6 image-col">
            <img src={image} alt="Descriptive Image" className="img-fluid" />
          </div>
          <div className="col-md-6 form-col">
            <CForm className="row g-2">
              <h1>Tell Us About Yourself</h1>
              <hr />

              <CCol md={12}>
                <CFormSelect 
                id="inputDesignation" 
                label="Designation"
                value={designation}
                onChange={(e)=>setDesignation(e.target.value)}
                required>

                  <option>Choose...</option>
                  <option>Apostle</option>
                  <option>Evangelist</option>
                  <option>Pastor</option>
                  <option>Prophet</option>
                  <option>Teacher</option>
                  <option>Secretary</option>
                  <option>Leader</option>

                </CFormSelect>
              </CCol>

              <CCol md={12}>
                <CFormInput 
                type="text" 
                id="fullname"
                value={pastorName}
                onChange={(e)=>setPastorName(e.target.value)}
                label="Fullname" 
                required />
              </CCol>

              <CCol md={12}>
                <CFormInput 
                type="text"
                id="Church"
                value={churchName}
                onChange={(e)=>setChurchName(e.target.value)}
                label="Church Name"
                required />
              </CCol>


              <CCol md={12}>
                <CFormInput 
                type="email"
                id="churchemail"
                value={churchmail}
                onChange={(e)=>setChurchmail(e.target.value)}
                label="Church Email" 
                placeholder='Eg:church@gmail.com' 
                required />
              </CCol>


              <CCol md={12}>
                <CFormInput 
                id="inputAddress" 
                value={address}
                onChange={(e)=>setAddess(e.target.value)}
                label="Address" 
                placeholder="1234 Main St" 
                required />
              </CCol>


              <CCol md={6}>
                <label 
                htmlFor="phone-input" 
                style={{ display: 'block', marginBottom: '6px' }} 
                required>Phone 1</label>
                
                <PhoneInput
                  id="phone1"
                  defaultCountry="IN"
                  value={phone1}
                  onChange={(value) => setPhone1(value)}
                  />
              </CCol>


              <CCol md={6}>
                <label 
                htmlFor="phone-input" 
                style={{ display: 'block', marginBottom: '6px' }}>Phone 2</label>

                <PhoneInput
                  id="phone2"
                  defaultCountry="IN"
                  value={phone2}
                  onChange={(value) => setPhone2(value)}
                  />
              </CCol>


              <CCol md={6}>
                <CFormInput 
                id="inputCity"
                value={city}
                onChange={(e)=>setCity(e.target.value)} 
                label="City" 
                required />
              </CCol>


              <CCol md={6}>
                <CFormSelect 
                id="inputState"
                value={churchstate}
                onChange={(e)=>setChurchState(e.target.value)} 
                label="State" 
                required>
                  <option>Choose...</option>
                  <option>Andhra Pradesh</option>
                  <option>Arunachal Pradesh</option>
                  <option>Assam</option>
                  <option>Bihar</option>
                  <option>Chhattisgarh</option>
                  <option>Goa</option>
                  <option>Gujarat</option>
                  <option>Haryana</option>
                  <option>Himachal Pradesh</option>
                  <option>Jharkhand</option>
                  <option>Karnataka</option>
                  <option>Kerala</option>
                  <option>Madhya Pradesh</option>
                  <option>Maharashtra</option>
                  <option>Manipur</option>
                  <option>Meghalaya</option>
                  <option>Mizoram</option>
                  <option>Nagaland</option>
                  <option>Odisha</option>
                  <option>Punjab</option>
                  <option>Rajasthan</option>
                  <option>Sikkim</option>
                  <option>Tamil Nadu</option>
                  <option>Telangana</option>
                  <option>Tripura</option>
                  <option>Uttar Pradesh</option>
                  <option>Uttarakhand</option>
                  <option>West Bengal</option>
                  <option>Andaman and Nicobar Islands</option>
                  <option>Chandigarh</option>
                  <option>Dadra and Nagar Haveli and Daman and Diu</option>
                  <option>Delhi</option>
                  <option>Ladakh</option>
                  <option>Lakshadweep</option>
                  <option>Puducherry</option>
                </CFormSelect>
              </CCol>


              <CCol md={6}>
                <CFormInput 
                id="inputZip" 
                value={pincode}
                onChange={(e)=>setPincode(e.target.value)}
                label="Zip" 
                required />
              </CCol>


              <CCol xs={12}>
                <CButton 
                onClick={handleSubmitClick} 
                className='submitbtn' 
                style={{border:'none'}}>Submit</CButton>
              </CCol>


            </CForm>
          </div>
        </div>
      </div>
    </>
  );
};

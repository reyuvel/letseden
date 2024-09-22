import React, { useEffect, useState } from 'react';
import LoggedNavbar from '../components/LoggedNavbar';
import { Hostside } from '../components/Hostside';
import '../css/Hostside.css';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { CAlert, CCol, CFormInput, CForm, CButton, CFormLabel } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Hostpage.css';
import 'react-datepicker/dist/react-datepicker.css';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { mapOptions } from '../components/MapConfiguration';
import supabase from '../config/supabaseClient';

export const Hostschedule = () => {
  const [eventname, setEventname] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [regLink, setRegLink] = useState('');
  const [image, setImage] = useState(null);
  const [imagePath, setImagePath] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);


  const uploadImage = async (imageFile) => {
    const imageExt = imageFile.name.split('.').pop();
    const imageName = `${user.id}_${Date.now()}.${imageExt}`;
    const filePath = `images/${imageName}`; // Specify the folder within the bucket
  
    const { data, error } = await supabase.storage
      .from('Churches')
      .upload(filePath, imageFile);
  
    if (error) {
      throw new Error(error.message);
    }
  
    const { data: downloadURL } = await supabase
      .storage
      .from('Churches')
      .getPublicUrl(filePath);
  
    return downloadURL.publicUrl;
  };
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!eventname || !phone || !time || !date || !address || !location || !latitude || !longitude) {
        setErrorMsg('All fields are required');
        return;
      }
  
      try {
        let imageUrl = '';
        if (image) {
          imageUrl = await uploadImage(image);
        }
  
        const { data, error } = await supabase.from('eventdetails').insert([{
          eventname,
          phone,
          time,
          date,
          address,
          location,
          latitude,
          longitude,
          imageUrl,
          id_user: user.id
        }]);
  
        if (error) {
          setErrorMsg(error.message);
        } else {
          setStep(1);  // Reset to first step after submission
          console.log('Data inserted successfully:', data);
        }
      } catch (error) {
        setErrorMsg(error.message);
      }
    };
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: mapOptions.googleMapApiKey,
    libraries: ["places"]
  });

  if (!isLoaded) return <div>Loading...</div>;

  const renderSection = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CCol md={6}>
              <CFormInput type="text" name="eventname" id="eventname" label="Title" value={eventname} onChange={(e) => setEventname(e.target.value)} required />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" name='church' id="church" label="Church Name" required />
            </CCol>
            <CCol>
              <CFormLabel htmlFor="phone-input" style={{ display: 'flex', marginBottom: '6px' }}>Phone</CFormLabel>
              <PhoneInput id="phone1" name='phone' defaultCountry="IN" value={phone} onChange={(value) => setPhone(value)} required />
            </CCol>
            <CButton onClick={() => setStep(2)} color="primary">Next</CButton>
          </>
        );
      case 2:
        return (
          <>
            <CCol md={3}>
              <CFormInput type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} label="Date" name='date' required />
            </CCol>
            <CCol md={3}>
              <CFormInput type="time" value={time} onChange={(e) => setTime(e.target.value)} label="Time" name='time' required />
            </CCol>
            <CCol xs={6}>
              <CFormInput name='address' id="inputAddress" label="Address" placeholder="1234 Main St" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </CCol>
            <CCol xs={6}>
              <CFormInput name='registration' id="inputAddress" label="Registration Link" value={regLink} onChange={(e) => setRegLink(e.target.value)} required />
            </CCol>
            <div className="d-flex justify-content-between w-100">
              <CButton onClick={() => setStep(1)} color="secondary">Prev</CButton>
              <CButton onClick={() => setStep(3)} color="primary">Next</CButton>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <CCol md={10}>
              <CFormLabel htmlFor="location-autocomplete" style={{ display: 'block', marginBottom: '6px' }}>Search For Location</CFormLabel>
              <Autocomplete
                onLoad={(autocomplete) => { window.googleAutocomplete = autocomplete }}
                onPlaceChanged={() => {
                  if (window.googleAutocomplete) {
                    const place = window.googleAutocomplete.getPlace();
                    setLocation(place.formatted_address || '');
                    if (place.geometry) {
                      setLatitude(place.geometry.location.lat());
                      setLongitude(place.geometry.location.lng());
                    }
                  }
                }}
              >
                <input type="text" id="location-autocomplete" placeholder="Enter location" value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: '100%', height: '38px' }} />
              </Autocomplete>
            </CCol>
            <div className="d-flex justify-content-between w-100">
              <CButton onClick={() => setStep(2)} color="secondary">Prev</CButton>
              <CButton onClick={() => setStep(4)} color="primary">Next</CButton>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <CCol md={6}>
              <CFormLabel htmlFor="inputImage">Upload Image</CFormLabel>
              <CFormInput type="file" id="inputImage" onChange={(e) => setImage(e.target.files[0])} />
            </CCol>
            <CButton onClick={handleSubmit} color="primary">Submit</CButton>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <LoggedNavbar />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 ,marginTop:'30px'}}>
          <CForm className="row addevent g-3">
            <h1>Event Details</h1>
            {errorMsg && <CAlert color="danger">{errorMsg}</CAlert>}
            <div className="progress mb-3">
              <div 
                className="progress-bar" 
                role="progressbar" 
                style={{ width: `${(step / 4) * 100}%` }} 
                aria-valuenow={step} 
                aria-valuemin="1" 
                aria-valuemax="4">
                {`Step ${step} of 4`}
              </div>
            </div>
            {renderSection()}
          </CForm>
        </div>
      </div>
    </>
  );
}
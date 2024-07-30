import React, { useState } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import Navbar from '../components/Navbar';
import { CAlert, CCol, CFormInput, CForm, CButton } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Hostpage.css';
import 'react-datepicker/dist/react-datepicker.css';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { mapOptions } from '../components/MapConfiguration';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("", "");

export const Addevent = () => {
    const [eventname, setEventname] = useState('');
    const [phone, setPhone] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!eventname || !phone || !time || !date || !address || !location || !latitude || !longitude) {
            setErrorMsg('All fields are required');
            return;
        }

        const { data, error } = await supabase
            .from('eventdetails')
            .insert([
                {
                    eventname,
                    phone,
                    time,
                    date,
                    address,
                    location,
                    latitude,
                    longitude
                }
            ]);

        if (error) {
            setErrorMsg(error.message);
        } else {
            console.log('Data inserted successfully:', data);
        }
    };

    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: mapOptions.googleMapApiKey, // Replace with your API key
        libraries: ["places"]
    });

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <>
            <Navbar />
            <div>
                <CForm className="row addevent g-3" onSubmit={handleSubmit}>
                    <h1>Event Details</h1>

                    {errorMsg && <CAlert color="danger">{errorMsg}</CAlert>}

                    <CCol md={6}>
                        <CFormInput 
                            type="text" 
                            name="eventname" 
                            id="eventname" 
                            label="Title"
                            value={eventname}
                            onChange={(e) => setEventname(e.target.value)}
                            required
                        />
                    </CCol>

                    <CCol md={6}>
                        <CFormInput type="text" name='church' id="Church" label="Church Name" required />
                    </CCol>

                    <CCol>
                        <label htmlFor="phone-input" name="phone" style={{ display: 'flex', marginBottom: '6px' }}>Phone</label>
                        <PhoneInput
                            id="phone1"
                            name='phone'
                            defaultCountry="IN"
                            value={phone}
                            onChange={(value) => setPhone(value)}
                            required
                        />
                    </CCol>

                    <CCol md={3}>
                        <CFormInput
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            label="Date"
                            name='date'
                            required
                        />
                    </CCol>

                    <CCol md={3}>
                        <CFormInput
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            label="Time"
                            name='time'
                            required
                        />
                    </CCol>

                    <CCol xs={6}>
                        <CFormInput 
                            name='address' 
                            id="inputAddress" 
                            label="Address" 
                            placeholder="1234 Main St" 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </CCol>

                    <CCol xs={6}>
                        <CFormInput name='registration' id="inputAddress" label="Registration Link" required />
                    </CCol>

                    <CCol md={10}>
                        <label htmlFor="location-autocomplete" style={{ display: 'block', marginBottom: '6px' }}>Location</label>
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
                            <input 
                                type="text"
                                id="location-autocomplete"
                                placeholder="Enter location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                style={{ width: '100%', height: '38px' }}
                            />
                        </Autocomplete>
                    </CCol>

                    <CCol xs={12}>
                        <CButton name='submit' className='submitbtn' color="primary" type="submit">Submit</CButton>
                    </CCol>
                </CForm>
            </div>
        </>
    );
};

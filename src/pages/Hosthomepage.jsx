import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Hostside } from '../components/Hostside';
import { Hostcard } from '../components/Hostcard';
import '../css/Hostcard.css';
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


export const Hosthomepage = () => {
    const [fetcherror, setFetcherror] = useState(null);
    const [eventcards, setEventcards] = useState(null);


    useEffect(() => {
        
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()

          // Check if user data is available
          if (user) {
            console.log(user.id);
            const { data, error } = await supabase
            .from('eventdetails')
            .select('id_user, eventname, date, time, location')
            .eq('id_user', user.id);
            console.log(data);

            fetchEvent(user.id);
          } else {
            setFetcherror('User not logged in');
            console.log('User not logged in');
          }
        };

        fetchUser();
    }, []);
    
    const fetchEvent = async (userId) => {
        const { data, error } = await supabase
            .from('eventdetails')
            .select('id_user, eventname, date, time, location')
            .eq('id_user', userId); // Assuming 'user_id' is the column storing the user's ID

        if (error) {
            setFetcherror('Fetching data failed');
            setEventcards(null);
            console.log(error);
        } else {
            setEventcards(data);
            setFetcherror(null);
        }
    };

    return (
        <>
            <Navbar />

            <div style={{ display: 'flex' }}>
                <Hostside />

                <div>

                <h1 style={{marginLeft:'50px',marginTop:'20px',fontSize:'30px'}}>All Events</h1>


                
                <div style={{ flex: 1 }}>
                    
                    {fetcherror && <p>{fetcherror}</p>}
                    {eventcards && (
                        <div className="eventcards">
                            <div className="eventcard-grid">
                                {eventcards.map(eventcard => (
                                    <Hostcard key={eventcard.id} eventcard={eventcard} />
                                ))}
                            </div>
                        </div>
                    )}
                                    </div>
                </div>
            </div>
        </>
    );
};
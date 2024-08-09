import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Hostside } from '../components/Hostside';
import supabase from '../config/supabaseClient';

export const Hosthomepage = () => {
    const [fetcherror, setFetcherror] = useState(null);
    const [eventcards, setEventcards] = useState(null);

    useEffect(() => {
        const FetchEvent = async () => {
            const { data, error } = await supabase
                .from('eventdetails')
                .select('id, eventname, date, time, location');

            if (error) {
                setFetcherror('Fetching data failed');
                setEventcards(null);
                console.log(error);
            } else {
                setEventcards(data);
                setFetcherror(null);
            }
        };

        FetchEvent();
    }, []); // Empty dependency array, runs once after first render

    return (
        <>
            <Navbar />
            <div style={{ display: 'flex' }}>
                <Hostside />
                <div style={{ flex: 1 }}>
                    {fetcherror && <p>{fetcherror}</p>}
                    {eventcards && (
                        <div className="eventcards">
                            {eventcards.map(eventcard => (
                                <p key={eventcard.id}>{eventcard.eventname}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
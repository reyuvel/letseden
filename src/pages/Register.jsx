import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../css/Login.css'; // Import your CSS file

const supabase = createClient("", "");

function Login() {
    let navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
            // Check if the event is a sign-in
            if (event === "SIGNED_IN") {
                navigate("/hostpage"); // Redirect to /hostpage on sign-in
            }

            else if (event === "SIGNED_OUT") {
                navigate("/"); // Optionally redirect to home or another route on sign-out
            }

            else {
                navigate("/register")
            }
        });

        // Note: in this case, no cleanup is needed on unmounting
    }, [navigate]);


        // No cleanup needed since there's no unsubscribe method

    return (
        <>
        <div className="logincontainer">
            <div className="login" id="register">
                <header className="login-header">
                    <h1>LOGIN</h1>
                    <Auth 
                        supabaseClient={supabase}
                        appearance={{ theme: ThemeSupa }}
                        theme="dark"
                        providers={["discord", "google"]}
                    />
                </header>
            </div>
        </div>
        </>
    );
}

export default Login;
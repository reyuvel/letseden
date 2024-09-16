import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Function to check if the user is authenticated
export const checkUserAuthenticated = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    // Log the session and error (if any) for debugging
    console.log("Supabase session:", session);
    if (error) console.error("Error fetching session:", error);
  
    return session ? true : false;
  };
  
  export default supabase;
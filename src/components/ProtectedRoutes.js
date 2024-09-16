import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkUserAuthenticated } from '../config/supabaseClient';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Use null to represent loading state
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await checkUserAuthenticated();
      setIsAuthenticated(authStatus); // Update authentication state

      if (!authStatus) {
        // If user is not authenticated, redirect to the login page
        navigate('/', { replace: true }); // `replace: true` prevents back navigation
      }
    };

    checkAuth(); // Trigger the authentication check
  }, [navigate]);

  if (isAuthenticated === null) {
    // Return a loading indicator until the authentication check is complete
    return <div>Loading...</div>;
  }

  // If authenticated, return the children component (restricted page)
  return isAuthenticated ? children : null;
};

export default ProtectedRoute;

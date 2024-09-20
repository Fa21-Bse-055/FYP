import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Verification() {
  const [verified, setVerified] = useState(false); // State to check if verification is done
  const navigate = useNavigate();
  const location = useLocation(); // To access query parameters

  // Helper function to get the token from the query params
  const getTokenFromQuery = () => {
    const params = new URLSearchParams(location.search); // Access the query string
    return params.get('code'); // Extract the token
  };

  useEffect(() => {
    const code = getTokenFromQuery();

    if (code) {
      // Call backend to verify the token
      fetch(`http://192.168.100.20:3000/api/users/verify?code=${code}`,{
        method:"GET"
        ,credentials:"include"})
        .then((response) => {console.log("response :",response.jso);
         return response.json()})
        .then((data) => {
          if (data.msg==="Email verified!") { 
            setVerified(true); // Set the verification status
            // Redirect to success page after verification
            navigate("/verificationFile/download/");
          } else {
            // Handle failed verification
            alert("Verification failed. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error verifying email:", error);
        });
    }
  }, [location, navigate]); // Dependency on location and navigate

  return <div>{!verified ? "Verifying..." : "Redirecting..."}</div>;
}

export default Verification;

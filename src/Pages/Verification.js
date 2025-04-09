import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Verification.css";

function Verification() {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
<<<<<<< HEAD

  useEffect(() => {
    const getTokenFromQuery = () => {
      const params = new URLSearchParams(location.search);
      console.log("location.search:", location.search);
      const code = params.get('code');
      return code;
    };
    
    const code = getTokenFromQuery();
    console.log("Verification code from query:", code);

    if (code) {
      fetch(`http://localhost:3000/api/users/verify?code=${code}`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          console.log("Verification response status:", response.status);
          if (!response.ok) {
            return response.json().then(data => {
              throw new Error(data.msg || 'Verification failed');
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log("Verification response:", data.msg);
          
          if (data.msg === "Email verified!") {
            setVerified(true);
            setTimeout(() => {
              navigate("/verificationFile");
            }, 2000);
          } else {
            setError("Verification failed. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error verifying email:", error);
          setError(error.message || "An error occurred during verification. Please try again later.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("No verification code provided.");
      setLoading(false);
    }
  }, [location.search, navigate]);
=======
  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === false) {
      const getTokenFromQuery = () => {
        const params = new URLSearchParams(location.search);
        console.log("location.search:", location.search);
        const code = params.get("code");
        // console.log("Verification code query:", code); // This should log the actual code
        return code;
      };

      const code = getTokenFromQuery();
      console.log("Verification code from query:", code);

      if (code) {
        fetch(`http://localhost:3000/api/users/verify?code=${code}`, {
          method: "GET",
          credentials: "include",
        })
          .then((response) => {
            console.log("hello1");
            console.log("Starting verification process...");
            if (!response.ok) {
              // throw new Erro('Network response was not ok');
              console.log("hello2");
              console.log(response);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data.msg);

            if (data.msg === "Email verified!") {
              setVerified(true);
              console.log("Starting verification process2...");
              navigate("/verificationFile");
            } else {
              console.log("Starting verification process3...");
              alert("Verification failed. Please try again.");
            }
          })
          .catch((error) => {
            console.log("Starting verification process4...");
            console.error("Error verifying email:", error);
            alert(
              "An error occurred during verification. Please try again later."
            );
          });
      } else {
        console.log("No verification code provided.");
      }
      return () => {
        effectRan.current = true;
      };
    }
  }, []);
>>>>>>> b73de08680986a68815d1f41fe0963c947f8ac25

  return (
    <div className="verification-container">
      <div className="verification-content">
        {loading ? (
          <>
            <div className="verification-icon loading">
              <div className="spinner"></div>
            </div>
            <h1>Verifying Your Email</h1>
            <p>Please wait while we verify your email address...</p>
          </>
        ) : error ? (
          <>
            <div className="verification-icon error">
              <span>!</span>
            </div>
            <h1>Verification Failed</h1>
            <p>{error}</p>
            <button onClick={() => navigate("/organizationLogin")} className="action-button">
              Return to Login
            </button>
          </>
        ) : (
          <>
            <div className="verification-icon success">
              <span>✓</span>
            </div>
            <h1>Email Verified!</h1>
            <p>Your email has been successfully verified.</p>
            <p>Redirecting you to download your verification file...</p>
          </>
        )}
      </div>
      <div className="cyber-grid"></div>
    </div>
  );
}

export default Verification;

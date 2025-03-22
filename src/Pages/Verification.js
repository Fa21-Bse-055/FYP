import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Verification() {
  const [verified, setVerified] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
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

  return <div>{!verified ? "Verifying..." : "Redirecting..."}</div>;
}

export default Verification;

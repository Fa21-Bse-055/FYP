import React, { useEffect } from "react";
import { useUser, SignInButton, SignedIn, SignedOut, UserButton, SignOutButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import "./StudentRegistration.css"; // Add a CSS file!

function StudentRegistration() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/studentDashboard");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="registration-container">
      <div className="registration-box">
        <SignedOut>
          <h2 className="registration-title">Student Sign In</h2>
          <SignInButton mode="modal">
            <button className="neon-button">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <div className="flex flex-col items-center space-y-4">
            <UserButton />
            <SignOutButton>
              <button className="neon-button logout-button">
                Log Out
              </button>
            </SignOutButton>
          </div>
        </SignedIn>
      </div>
    </div>
  );
}

export default StudentRegistration;

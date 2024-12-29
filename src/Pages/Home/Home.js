import React, { useState, useEffect } from 'react';
import './Home.css';
import Footer from '../../Components/Footer/Footer';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [count, setCount] = useState(0);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log('Selected file:', event.target.files[0]);
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => (prevCount === 0 ? 1 : 0)); 
    }, 5000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="home-container">
      {/* Background images */}
      <div className="background">
        {count === 0 ? (
          <img
            src="alexandre-debieve-FO7JIlwjOtU-unsplash.jpg"
            alt="Background 1"
          />
        ) : (
          <img
            src="maxim-hopman-IayKLkmz6g0-unsplash.jpg"
            alt="Background 2"
          />
        )}
      </div>

      {/* Content */}
      <div className="home-style">
        <p>Authenticity you can trust</p>
        <h2>
          Instantly verify the <br />
          authenticity of <br />
          your documents
        </h2>
        <p>
          Is the document that you have authentic? Has it been falsely <br />
          modified? Check here in just a few seconds.
        </p>
        <button onClick={handleButtonClick}>
          Verify Your Document <img src="folder.png" alt="Folder icon" />
        </button>

        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          accept=".pdf"
        />

        {/* Uncomment if you want to display selected file */}
        {/* {selectedFile && <p>Selected File: {selectedFile.name}</p>} */}
      </div>

      <Footer/>
    </div>
  );
};

export default Home;
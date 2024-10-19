// src/pages/Home.js
import React from 'react';
import "./Home.css"
import { useState } from 'react';
import Footer from '../../Components/Footer/Footer';

const Home = () => {

  const [selectedFile, setSelectedFile] = useState();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log("Selected file:", event.target.files[0]);
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };


  return (
    <div className="home-container">
      <div className='home-style'>
      <p>Authenticity you can trust</p>
      <h2>Instantly verify the <br/>
          authenticity of  <br/>
          your documents</h2>
      <p>Is the document that you have authentic? Has it been falsely <br/>
         modified? Check here in just a few seconds.</p>

      <button onClick={handleButtonClick}>
        Verify Your Document <img src='folder.png' alt='foler image'/>
      </button>

      <input 
        type="file" 
        id="fileInput" 
        style={{ display: 'none' }} 
        onChange={handleFileChange}
        accept=".pdf"
      />

        {/* {<p>Selected File: {selectedFile.name}</p>} */}
        </div>
      <Footer/> 
      </div>
      
  );
};

export default Home;


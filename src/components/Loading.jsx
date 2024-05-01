import React from 'react';
import './styles/Loading.css'

function Loading() {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
        <div className="loading-container">
          <div className="spinner-border" role="status">
            <span className="sr-only">🌀</span>
          </div>
          <p className="loading-message">CARGANDO... </p>
        </div>
      </div>
    );
  }
  
  export default Loading;
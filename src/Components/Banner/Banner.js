import React from 'react';

import './Banner.css';
import Arrow from '../../assets/Arrow'
import { Link } from 'react-router-dom';
function Banner() {
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span>ALL CATEGORIES</span>
            <Arrow></Arrow> 
          </div>
          <div className="otherQuickOptions">
            <a href="/filter/?search=Cars"><span>Cars</span></a>
            <a href="/filter/?search=Motorcycles"><span>Motorcy...</span></a>
            <a href="/filter/?search=Mobile+Phones"><span>Mobile Ph...</span></a>
            <a href="/filter/?search=For+Sale%3A+Houses+%26+Apartments"><span>For Sale:Houses & Apart...</span></a>
            <a href="/filter/?search=Scooters"><span>Scoot...</span></a>
            <a href="/filter/?search=Commercial+%26+Other+Vehicles"><span>Commercial & Other Ve...</span></a>
            <a href="/filter/?search=For+Rent%3A+Houses+%26+Apartments"><span>For Rent: House & Apart...</span></a>
          </div>
        </div>
        <div className="banner">
          <img
            src="../../../Images/banner copy.png"
            alt=""
          />
        </div>
      </div>
      
    </div>
  );
}

export default Banner;

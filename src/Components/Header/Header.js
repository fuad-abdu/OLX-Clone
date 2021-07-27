import React, { useContext, useEffect, useRef, useState } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext, FirebaseContext } from '../../store/Context';
import SearchBar from './SearchBar';

function Header(ref) {

  const { user } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)

  const history = useHistory();

  const [state, setstate] = useState(false)

  const HandleClick = () => {
    if (state) {
      setstate(false)
    } else {
      setstate(true)
    }
  }

  const node = useRef();

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click 
    setstate(false);
  };

  return (
    <div className="headerParentDiv" ref={node}>
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to="/" ><OlxLogo></OlxLogo></Link>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <label htmlFor="">India</label>
          {/* <input type="text" /> */}
          <Arrow></Arrow>
        </div>

        <SearchBar />

        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        {!user && <div className="loginPage" id="loginPage">
          <Link to="/login" ><span>Login</span></Link>
          <hr id="hr" />
        </div>}

        {user && <div className="profile">
          <div className="click" onClick={HandleClick}>
            <img src="../../Images/user.png" alt="" />
            <Arrow></Arrow>
          </div>
          <div class={`dropdown ${state ? 'active' : 'nonactive'}`} >
            <div className="profile_profile">
              <img src="../../Images/profile.png" alt="" />
              <div className="details">
                <p>Hello,</p>
                <h4>{user?.displayName}</h4>
              </div>
            </div>
            <hr />
            <div className="menus">
              <div className="menu" onClick={() => {
                history.push(`/myads/${user.uid}`)
              }}>
                <i class="fas fa-clipboard-list"></i>
                <h5>My Ads</h5>
              </div>
              <div className="menu" onClick={() => {
                firebase.auth().signOut();
                history.push('/')
              }}>
                <i class="fas fa-sign-out-alt"></i>
                <h5>Logout</h5>
              </div>
            </div>
          </div>
        </div>}

        {user ?
          <Link to="/create">
            <div className="sellMenu">
              <SellButton></SellButton>
              <div className="sellMenuContent">
                <SellButtonPlus></SellButtonPlus>
                <span>SELL</span>
              </div>
            </div>
          </Link>
          :
          <Link to="/login">
            <div className="sellMenu">
              <SellButton></SellButton>
              <div className="sellMenuContent">
                <SellButtonPlus></SellButtonPlus>
                <span>SELL</span>
              </div>
            </div>
          </Link>}
      </div>
    </div>
  );
}

export default Header;

import React, { useContext } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext, FirebaseContext } from '../../store/Context';

function Header() {

  const { user } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)

  const history = useHistory();

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to="/" ><OlxLogo></OlxLogo></Link>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage" id="loginPage">
          {user ? <a onClick={() => {
            firebase.auth().signOut();
            history.push('/login')
          }}><span>LogOut</span></a> : <Link to="/login" ><span>Login</span></Link>}
          <hr id="hr" />
        </div>

        {user && <span>Welcome {user.displayName}</span>}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

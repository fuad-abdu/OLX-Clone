import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'

import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import './Login.css';

function Login() {

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { firebase } = useContext(FirebaseContext);
  
  const [Toggle, setToggle] = useState(true)
  
  const toggle = () => {
    if(Toggle){
      document.getElementById('password').type = "text";
      setToggle(false)
    }else{
      document.getElementById('password').type = "password";
      setToggle(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        Swal.fire('Done...', 'Login Success', 'success')
        history.push('/')
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        Swal.fire('Oops...', `${errorMessage}`, 'error')
        // alert(errorMessage)
      });
  }

  return (
    <div>
      <div className="loginParentDiv">
        <Link to="/" ><img width="200px" height="200px" src={Logo}></img></Link>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <div className="input_parent">
            <input
              className="input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              defaultValue="Doe"
            />
            <i 
              class={`far ${Toggle?'fa-eye-slash' : 'fa-eye'}`}
              onClick={toggle}
            ></i>
          </div>
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to="/signup" >Signup</Link>
      </div>
    </div>
  );
}

export default Login;

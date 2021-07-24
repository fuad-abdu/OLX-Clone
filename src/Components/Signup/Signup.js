import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import './Signup.css';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'
import Loading from '../Loading/Loading';

export default function Signup() {

  const history = useHistory();

  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const { firebase } = useContext(FirebaseContext);

  const [Toggle, setToggle] = useState(true)

  const toggle = () => {
    if (Toggle) {
      document.getElementById('password').type = "text";
      setToggle(false)
    } else {
      document.getElementById('password').type = "password";
      setToggle(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        user.updateProfile({ displayName: username })
          .then(() => {
            firebase.firestore().collection('users').add({
              id: user.uid,
              username: username,
              phone: phone
            })
              .then(() => {
                setLoading(false)
                Swal.fire('Done...', 'Account Created', 'success')
                history.push('/')
              })
          })
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        Swal.fire('Oops...', `${errorMessage}`, 'error')
        console.log(errorMessage);
        // ..
      });
  }

  return (
    <div>
      <div className="signupParentDiv">
        <Link to="/" ><img width="200px" height="200px" src={Logo}></img></Link>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            required
            className="input"
            type="text"
            id="fname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            required
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            required
            className="input"
            type="tel"
            id="lname"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <div className="input_parent">
            <input
              required
              className="input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              defaultValue="Doe"
            />
            <i
              class={`far ${Toggle ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={toggle}
            ></i>
          </div>
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login" >Login</Link>
      </div>
      {loading && <Loading/>}
    </div>
  );
}

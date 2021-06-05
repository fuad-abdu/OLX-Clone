import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import './App.css';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import { AuthContext, FirebaseContext } from './store/Context';

function App() {

  const {user, setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((User) => {
      setUser(User)
      console.log(user);
    })
  }, [])

  return (
    <div>
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Router>
    </div>
  );
}

export default App;
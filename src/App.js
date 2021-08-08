import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import Category from './Pages/Category'
import MyAdsPage from './Pages/MyAds';

import './App.css';

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import { AuthContext, FirebaseContext } from './store/Context';
import Post from './store/PostContext';
import CategoryContext from './store/CategoryContext';
import FilteredContext from './store/FilteredContext';
import FilteredProducts from './Pages/FilteredProducts';
import ScrollToTop from './store/ScrollToTop';

function App() {

  const { user, setUser } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)

  const [OffLine, setOffLine] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((User) => {
      setUser(User)
      console.log(user);
    })
  }, [])

  window.addEventListener("offline", ()=>{
    // setOffLine(true);
    Swal.fire('Oops...', 'Please Check Your Internet', 'error')
  })
  window.addEventListener("online", ()=>{
    // setOffLine(false);
  })

  return (
    <div className={OffLine && 'offline'}>
      <Post>
        <CategoryContext>
          <FilteredContext>
            <Router>
              <ScrollToTop>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/signup">
                  <Signup />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/create">
                  <Category />
                </Route>
                <Route path="/post">
                  <Create />
                </Route>
                <Route path="/viewPost">
                  <View />
                </Route>
                <Route path="/filter">
                  <FilteredProducts />
                </Route>
                <Route path="/myads/:id">
                  <MyAdsPage />
                </Route>
              </ScrollToTop>
            </Router>
          </FilteredContext>
        </CategoryContext>
      </Post>
    </div>
  );
}

export default App;
import React, { useState } from 'react';

import ReactLoading from 'react-loading';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';


import './Home.css';
import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Home-Footer/Home-Footer';
import QuickMenu from '../Components/Posts/QuickMenu';

function Home(props) {

  const [BacktoTop, setBacktoTop] = useState(false);

  window.onscroll = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      setBacktoTop(true)
    }
    else{
      setBacktoTop(false)
    }
  }
  const backToTop = () => {
    document.documentElement.scrollTop = 0;
    setBacktoTop(false)
  }

  return (
    <div className="homeParentDiv">
      <Header />
      <Banner />
      <div className={`topBtn ${ BacktoTop ? 'active' : 'nonactive'} text-center`}>
        <button onClick={backToTop}><span><i class="fas fa-chevron-up"></i></span>Back to top</button>
      </div>
      <QuickMenu />
      <Posts />
      <Footer />
      {/* <button onClick={()=>Example()}>click</button> */}
    </div>
  );
}

export default Home;

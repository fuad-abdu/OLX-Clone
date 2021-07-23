import React from 'react';

import ReactLoading from 'react-loading';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import './Home.css';
import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Home-Footer/Home-Footer';
import QuickMenu from '../Components/Posts/QuickMenu';

function Home(props) {

  // const Example = () => (
  //   <ReactLoading type={"60px"} color={"red"} height={667} width={375} />
  // );

  return (
    <div className="homeParentDiv">
      <Header />
      <Banner />
      <QuickMenu/>
      <Posts />
      <Footer />
      {/* <button onClick={()=>Example()}>click</button> */}
    </div>
  );
}

export default Home;

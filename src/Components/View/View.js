import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import NumberFormat from 'react-number-format';

import './View.css';
function View() {

  const [userDetails, setUserDetails] = useState();

  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    console.log(postDetails);
    const { userId } = postDetails
    firebase.firestore().collection('users').where('id', '==', userId).get().then((res) => {
      res.forEach(doc => {
        setUserDetails(doc.data())
      });
    })
  }, [])

  return (
    <div className="viewParentDiv container-fluid row">
      <div className="imageShowDiv mt-5 col-md-8 col-12">
        {/* <img
          src={postDetails.url}
          alt=""
        /> */}
        <div className="slide-container">
          <Slide>
            <div className="each-slide">
              <div className="Border">
                <img src={postDetails.url[0]} alt="" />
              </div>
            </div>

           {postDetails.url[1] && <div className="each-slide">
              <div className="Border">
                <img src={postDetails.url[1]} alt="" />
              </div>
            </div>}

            {postDetails.url[2] && <div className="each-slide">
              <div className="Border">
                <img src={postDetails.url[2]} alt="" />
              </div>
            </div>}

            {postDetails.url[3] && <div className="each-slide">
              <div className="Border">
                <img src={postDetails.url[3]} alt="" />
              </div>
            </div>}

            {postDetails.url[4] && <div className="each-slide">
              <div className="Border">
                <img src={postDetails.url[4]} alt="" />
              </div>
            </div>}

          </Slide>
        </div>
      </div>
      <div className="rightSection col-md-4">
        <div className="productDetails">
          <p>
          <NumberFormat
            thousandSeparator={true}
            displayType={'text'}
            thousandsGroupStyle="lakh"
            prefix={'₹'}
            value={postDetails.price} />
          </p>

          <p className="productDetails__title">{postDetails.title}</p>
          <span className="productDetails__time mr-5">{postDetails.createdAt}</span>
        </div>
        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <img src="../../Images/profile.png" alt="" />
          <p className="userDetail1">{userDetails.username}</p>
          <p className="userDetail2">{userDetails.phone}</p>
        </div>}
      </div>

      <div className="productMainDetails col-md-8">
        <div className="border">
        <h3>Details</h3>
        <p>Brand : <span>{postDetails.brand}</span></p>
        <hr />
        <h3>Description</h3>
        <p>{postDetails.description}</p>
        </div>
      </div>
    </div>
  );
}
export default View;

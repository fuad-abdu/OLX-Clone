import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Heart from '../../assets/Heart';
import NumberFormat from 'react-number-format';

import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import './Post.css';

function Posts() {

  const history = useHistory();

  const { firebase } = useContext(FirebaseContext);
  const { setPostDetails } = useContext(PostContext);

  const [products, setProducts] = useState([])

  useEffect(() => {
    firebase.firestore().collection('products').get().then((snapshot) => {
      const allPost = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id
        }
      })
      setProducts(allPost)
    })
  }, [])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <Link>View more</Link>
        </div>
        <div className="cards">
          {products.map(product => {
            return (
              <div
                className="card"
                onClick={() => {
                  setPostDetails(product)
                  history.push('/viewPost')
                }}
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">
                    <NumberFormat
                      thousandSeparator={true}
                      displayType={'text'}
                      thousandsGroupStyle="lakh"
                      prefix={'₹'}
                      value={product.price}
                    />
                  </p>
                  {/* <span className="kilometer">{product.category}</span> */}
                  <p className="name"> {product.title}</p>
                </div>
                <div className="date mt-4">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading container">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards row mx-auto container">
          {products.map(product => {
            return (
              <div 
                className="card col-md-3"
                onClick={() => {
                  setPostDetails(product)
                  history.push('/viewPost')
                }}
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">
                  <NumberFormat
                      thousandSeparator={true}
                      displayType={'text'}
                      thousandsGroupStyle="lakh"
                      prefix={'₹'}
                      value={product.price}
                    />
                  </p>
                  {/* <span className="kilometer"></span> */}
                  <p className="name"> {product.title}</p>
                </div>
                <div className="date mt-4">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Posts;

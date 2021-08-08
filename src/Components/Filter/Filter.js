import React, { useContext, useEffect, useState } from 'react'
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router-dom';
import Heart from '../../assets/Heart';
import { FirebaseContext } from '../../store/Context';
import { Filter_Context } from '../../store/FilteredContext';
import { PostContext } from '../../store/PostContext';
import Banner from '../Banner/Banner';
import Posts from '../Posts/Posts';

import "./Filter.css"

function Filter() {

    const { filterProducts } = useContext(Filter_Context);
    const { firebase } = useContext(FirebaseContext);
    const { setPostDetails } = useContext(PostContext);

    // const [Params, setParams] = useState()

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    const history = useHistory();

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
    }, []);

    var arr = []

    // let filterTitle = filterProducts.toLowerCase();

    // products.filter((post) => {
    //     let postTitle = post.category.toLowerCase()
    //     if (params.search.includes(postTitle)) {
    //         // console.log('post    > '+post.title);
    //         return post
    //     }else{
    //         console.log('ella');
    //     }
    // }).map((post) => {
    //     arr = [...arr, post]
    //     console.log(arr);
    // })

    products.filter((product) => {
        if (params.search === null) {
            return null
        } else if (product.title.toLowerCase().includes(params.search.toLowerCase())) {
            return product
        } else if (product.category.toLowerCase().includes(params.search.toLowerCase())) {
            return product
        }
    }).map((product) => {
        console.log(product.description);
        arr = [...arr, product]
    })

    arr = [...new Map(arr.map(item => [JSON.stringify(item.title), item])).values()];

    return (
        <div>
            <div className="banner">
                <Banner />
            </div>

            <div className="products">
                <h3>{params.search.toUpperCase()}</h3>
                <h5>CATEGORY - <span> {filterProducts?.category}</span></h5>

                <hr />

                <div className="postParentDiv">
                    <div className="cards row mx-auto container">
                        {arr.map((post) => {
                            return (
                                <div
                                    className="card col-md-3"
                                    onClick={() => {
                                        setPostDetails(post)
                                        history.push('/viewPost')
                                    }}
                                >
                                    <div className="favorite">
                                        <Heart></Heart>
                                    </div>
                                    <div className="image">
                                        <img src={post.url} alt="" />
                                    </div>
                                    <div className="content">
                                        <p className="rate">
                                            <NumberFormat
                                                thousandSeparator={true}
                                                displayType={'text'}
                                                thousandsGroupStyle="lakh"
                                                prefix={'₹'}
                                                value={post.price}
                                            />
                                        </p>
                                        {/* <span className="kilometer"></span> */}
                                        <p className="name"> {post.title}</p>
                                    </div>
                                    <div className="date mt-4">
                                        <span>{post.createdAt}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter

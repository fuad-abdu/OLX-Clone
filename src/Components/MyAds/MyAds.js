import React, { useContext, useEffect, useState } from 'react'
import NumberFormat from 'react-number-format';
import { useHistory, useParams } from 'react-router-dom'
import Heart from '../../assets/Heart';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import './MyAds.css'

function MyAds() {

    const { id } = useParams();

    const { firebase } = useContext(FirebaseContext);
    const { setPostDetails } = useContext(PostContext);

    const [Products, setProducts] = useState([])

    useEffect(() => {
        firebase.firestore().collection('products').where("userId", "==", `${id}`).get().then((snapshot) => {
            const allPost = snapshot.docs.map((product) => {
                return {
                    ...product.data(),
                    id: product.id
                }
            })
            setProducts([...new Map(allPost.map(item => [JSON.stringify(item.no), item])).values()])
        })
    }, [])


    const history = useHistory();

    return (
        <div className="my_ads container mt-5 mb-5">
            <h5 className="">ADS</h5>
            <div className="cards row">
                {Products.length ? Products.map(product => {
                    return (
                        <div
                            className="card mx-auto col-lg-3 mb-3"
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
                })
                    :
                    <div className="no_ads mx-auto text-center">
                        <img src="../../Images/no-publications.png" alt="" />
                        <h6>You haven't listed anything yet</h6>
                        <p>Let go of what you</p>
                        <p>don't use anymore</p>

                        <button onClick={() => { history.push('/create') }}>start selling</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default MyAds

import React, { useContext, useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import { Link, useHistory } from 'react-router-dom'
import Heart from '../../assets/Heart'
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';

function QuickMenu() {

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

  const sortedActivities = products.slice().sort((a, b) => b.no - a.no)

    return (
        <div className="moreView">
            <div className="heading">
                <span>Quick Menu</span>
                <Link>View more</Link>
            </div>
            <div className="cards">
                {sortedActivities.map(product => {
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
    )
}

export default QuickMenu

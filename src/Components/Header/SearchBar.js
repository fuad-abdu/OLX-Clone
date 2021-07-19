import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Search from '../../assets/Search'
import { FirebaseContext } from '../../store/Context'
import FilteredContext, { Filter_Context } from '../../store/FilteredContext'
import { PostContext } from '../../store/PostContext'

import './SearchBar.css'

function SearchBar() {

    const history = useHistory();

    const { firebase } = useContext(FirebaseContext)
    const { setFilterProducts } = useContext(Filter_Context);

    const [state, setstate] = useState('')
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
        <div className="productSearch">
            {/* <form> */}
            <div className="input">
                <input
                    autocomplete="off"
                    id="search"
                    name="search"
                    type="text"
                    placeholder="Find car,mobile phone and more..."
                    value={state}
                    onChange={(e) => setstate(e.target.value)}
                />
            </div>
            <div className="searchAction">
                <button type="submit" ><Search color="#ffffff"></Search></button>
            </div>
            {/* </form> */}
            <div className="">
                <div className="productsLists">
                    {products.filter((post) => {
                        if (state == "") {
                            return null
                        }
                        else if (post.title.toLowerCase().includes(state.toLowerCase())) {
                            return post
                        }
                    }).map((post, key) => {
                        
                        return (
                            <div
                                className="list"
                                onClick={() => {
                                    setFilterProducts(post)
                                    history.push('/filter')
                                }}
                            >
                                <p>{post.title}</p>
                            </div>
                        )

                    })}
                </div>
            </div>
        </div>
    )
}

export default SearchBar

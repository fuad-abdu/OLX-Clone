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
    const [hide, setHide] = useState();
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

    var obj1 = [...new Map(products.map(item => [JSON.stringify(item.title), item])).values()];
    var obj2 = [...new Map(products.map(item => [JSON.stringify(item.category), item])).values()];

    return (
        <form action={`/filter/`} method="get">
            <div className="productSearch">
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
                <div className="">
                    <div className="productsLists">
                        {obj1.filter((post) => {
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
                                    onClick={(e) => {
                                        setFilterProducts(post.title)
                                        history.push(`/filter/?search=${post.title}`)
                                        window.location.reload(false);
                                    }}
                                >
                                    <p>{post.title}</p>
                                </div>
                            )

                        })}

                        {obj2.filter((post) => {
                            if (state == "") {
                                return null
                            }
                            else if (post.category.toLowerCase().includes(state.toLowerCase())) {
                                return post
                            }
                        }).map((post, key) => {
                            return (
                                <div
                                    className="list"
                                    onClick={() => {
                                        setFilterProducts(post.category)
                                        history.push(`/filter/?search=${post.category}`)
                                        window.location.reload(false);
                                    }}
                                >
                                    <p>{post.category} - category</p>
                                </div>
                            )

                        })}
                    </div>
                </div>
            </div>
        </form>
    )
}

export default SearchBar

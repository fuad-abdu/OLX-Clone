import React, { Fragment, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Category_Context } from '../../store/CategoryContext';
import './CategoryItems.css'

function CategoryItems(props) {

    const history = useHistory();

    const { setCategory } = useContext(Category_Context)

    const [state, setState] = useState(false);
    const [path, setPath] = useState('');

    const subCategory = props.subCategory;

    const checkState = () => {
        setPath(props.name + ' / ')
        if (state) {
            setState(false);
        } else {
            setState(true);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="category col-md-6" onClick={checkState} >
                    <h4 className=""><i class={props.class}></i> {props.name}</h4>
                    <i class="fas fa-chevron-right"></i>
                </div>
                {state && subCategory.map((arr) => {
                    const categoryDetails = {
                        category: arr,
                        path: path + arr
                    }
                    return (
                        <Fragment>
                            <div className="sub_category col-md-6" onClick={()=>{
                                setCategory(categoryDetails)
                                history.push('/post')
                            }}>
                                <h4> {arr}</h4>
                            </div>
                            <div className="col-md-6"></div>
                        </Fragment>
            )
                })}
        </div>
        </div >
    )
}

export default CategoryItems

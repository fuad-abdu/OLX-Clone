import React, { useContext } from 'react'
import { Filter_Context } from '../../store/FilteredContext';
import Banner from '../Banner/Banner';

import "./Filter.css"

function Filter() {

    const { filterProducts } = useContext(Filter_Context);
    console.log(filterProducts);

    return (
        <div>
            <div className="banner">
                <Banner/>
            </div>

            <div className="products">
                <h3>{filterProducts?.title}</h3>
            </div>
        </div>
    )
}

export default Filter

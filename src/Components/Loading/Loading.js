import React from 'react'
import './Loading.css'

import ReactLoading from 'react-loading';

function Loading() {
    return (
        <div className="loading text-center">
            <div className="loading_div m-auto">
                <ReactLoading type="spin" color='white' height={'20%'} width={'20%'} />
                <p>Loading...</p>
            </div>
        </div>
    )
}

export default Loading

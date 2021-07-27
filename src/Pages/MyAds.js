import React, { Fragment } from 'react'
import Banner from '../Components/Banner/Banner'
import Header from '../Components/Header/Header'
import Footer from '../Components/Home-Footer/Home-Footer'
import MyAds  from '../Components/MyAds/MyAds'

function MyAdsPage() {
    return (
        <Fragment>
            <Header/>
            <Banner/>
            <MyAds/>
            <Footer/>
        </Fragment>
    )
}

export default MyAdsPage

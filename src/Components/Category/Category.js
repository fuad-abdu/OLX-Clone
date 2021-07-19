import React, { Fragment } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import LeftArrow from '../../assets/LeftArrow'
import OlxLogo from '../../assets/OlxLogo'
import CategoryItems from '../CategoryItems/CategoryItems'

import './Category.css'

const Category = () => {

    const cars = ['Cars'];
    const properties = ['For Sale: Houses & Apartments', 'For Rent: Houses & Apartments', 'Lands & Plots', 'For Rent: Shops & Offices', 'For Sale: Shops & Offices', 'PG & Guest Houses'];
    const mobile = ['Mobile Phones', 'Accessories', 'Tablets'];
    const jobs = ['Sales & Marketing', 'Driver', 'Teacher', 'Delivery & Collection', 'Other Jobs'];
    const bikes = ['Motorcycles', 'Scooters', 'Spare Parts', 'Bicycles'];
    const electronics = ['TVs, Video - Audio', 'Computers & Laptops', 'Games & Entertainment', 'Washing Machines'];
    const commercial = ['Commercial & Other Vehicles', 'Spare Parts'];
    const furniture = ['Sofa & Dining', 'Beds & Wardrobes', 'Home Decor & Garden', 'Other Household Items'];
    const fashion = ['Men', 'Women', 'Kids'];
    const books = ['Books', 'Gym & Fitness', 'Musical Instruments', 'Musical Instruments', 'Other Hobbies'];
    const pets = ['Fishes & Aquarium', 'Pet Food & Accessories', 'Other Pets'];
    const services = ['Electronics & Computer', 'Education & Classes', 'Drivers & Taxi', 'Other Services'];

    return (
        <Fragment>
            <header>
                <Link to='/'>
                    <div className="brandName">
                        <div className="arrow">
                            <LeftArrow></LeftArrow>
                        </div>
                        <div className="logo">
                            <OlxLogo></OlxLogo>
                        </div>
                    </div>
                </Link>
            </header>
            <section>
                <h2>POST YOUR AD</h2>
                <div className="parentDiv mx-auto">
                    <div className="firtDiv">
                        <h3>CHOOSE A CATEGORY</h3>
                        <div className="categories">
                            <CategoryItems
                                name="OLX Autos (Cars)"
                                class="fas fa-car"
                                subCategory={cars}
                            />
                            <CategoryItems
                                name="Properties"
                                class="far fa-building"
                                subCategory={properties}
                            />
                            <CategoryItems
                                name="Mobiles"
                                class="fas fa-mobile-alt"
                                subCategory={mobile}
                            />
                            <CategoryItems
                                name="Jobs"
                                class="fas fa-suitcase"
                                subCategory={jobs}
                            />
                            <CategoryItems
                                name="Bikes"
                                class="fas fa-motorcycle"
                                subCategory={bikes}
                            />
                            <CategoryItems
                                name="Electronics & Appliances"
                                class="fas fa-desktop"
                                subCategory={electronics}
                            />
                            <CategoryItems
                                name="Commercial Vehicles & Spares"
                                class="fas fa-wrench"
                                subCategory={commercial}
                            />
                            <CategoryItems
                                name="Furniture"
                                class="fas fa-couch"
                                subCategory={furniture}
                            />
                            <CategoryItems
                                name="Fashion"
                                class="fas fa-tshirt"
                                subCategory={fashion}
                            />
                            <CategoryItems
                                name="Books, Sports & Hobbies"
                                class="fas fa-guitar"
                                subCategory={books}
                            />
                            <CategoryItems
                                name="Pets"
                                class="fas fa-paw"
                                subCategory={pets}
                            />
                            <CategoryItems
                                name="Services"
                                class="fas fa-concierge-bell"
                                subCategory={services}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Category

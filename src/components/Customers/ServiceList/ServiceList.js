import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import Sidebar from '../../Sidebar/Sidebar';
import SingleUserService from './SingleUserService/SingleUserService';
import './ServiceList.css'

const ServiceList = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [userServices, setUserServices] = useState([]);

    useEffect(() => {
        fetch('https://guarded-badlands-59559.herokuapp.com/userServices?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setUserServices(data);
            });

    }, [])
    return (

        <div className="row">
            <div className="col-md-3 col-sm-12 col-12">
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-9 col-sm-12 col-12">
                <nav className="navbar navbar-expand-lg ">
                    <h3 className="navbar-brand">Service List</h3>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <h6>{loggedInUser.name}</h6>
                        </li>
                    </ul>
                </nav>
                <div className="serviceList-right-part">
                    <section className="mt-5">
                        <div className="container">

                            <div className="card-deck row text-center">
                                {
                                    userServices.map(userService => <SingleUserService key={userService._id} userService={userService}></SingleUserService>)
                                }

                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </div>


    );
};

export default ServiceList;
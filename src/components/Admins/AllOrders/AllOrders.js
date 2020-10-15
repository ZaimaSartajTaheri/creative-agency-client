import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../App';
import Sidebar from '../../Sidebar/Sidebar';
import './AllOrders.css';
import SingleOrder from './SingleOrder/SingleOrder';


const AllOrders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        fetch('https://guarded-badlands-59559.herokuapp.com/allOrders')
            .then(res => res.json())
            .then(data => setAllOrders(data))
    }, [])
    return (
        <div className="allOrder">
            <div className="row">
                <div className="col-md-3 col-sm-12 col-12" >
                    <Sidebar className="collapse navbar-collapse" id="navbarSupportedContent"></Sidebar>
                </div>
                <div className="col-md-9 col-sm-12 col-12" >
                    <nav className="navbar navbar-expand-lg ">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>


                        <h3 className="navbar-brand">Service List</h3>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <h6>{loggedInUser.name}</h6>
                            </li>
                        </ul>
                    </nav>
                    <div className="all-orders">

                        <div className="addOrdersForm  mt-5">
                            <table className="table table-borderless">
                                <thead >
                                    <tr className="table-dark">
                                        <th scope="col">Name</th>
                                        <th scope="col">Email ID</th>
                                        <th scope="col">Service</th>
                                        <th scope="col">Project Details</th>
                                        <th scope="col">Status</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allOrders.map(order => <SingleOrder order={order}></SingleOrder>)
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>

            </div>

        </div>


    );
};

export default AllOrders;
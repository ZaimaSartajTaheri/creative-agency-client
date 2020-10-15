import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import './Service.css';


const Service = ({ service }) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetch('https://guarded-badlands-59559.herokuapp.com/isAdmin', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => {
                setIsAdmin(data);
            });
    }, [loggedInUser.email])


    return (
        <div className=" col-md-4 col-sm-6  mb-3 text-center">

            {
                isAdmin ?

                    <Link className="link" to="/addService">
                        <div className="image-container">
                            <div className="image">
                                <div className="side">
                                    <img className="img-fluid mb-3 mt-2" src={`data:image/png;base64,${service.image.img}`} alt="" />
                                </div>
                                <div className="side back">
                                    <img className="img-fluid mb-3 mt-2" src={`data:image/png;base64,${service.image.img}`} alt="" />
                                </div>
                            </div>
                        </div>
                        <h4 style={{ fontWeight: 'bold', color: 'black' }}>{service.title}</h4>
                        <p style={{ color: 'black' }}>{service.description}</p>
                    </Link>
                    :
                    <Link className="link" to={"/addOrder/" + service._id} >

                        <div className="image-container">
                            <div className="image">
                                <div className="side">
                                    <img className="img-fluid mb-3 mt-2" src={`data:image/png;base64,${service.image.img}`} alt="" />
                                </div>
                                <div className="side back">
                                    <img className="img-fluid mb-3 mt-2" src={`data:image/png;base64,${service.image.img}`} alt="" />
                                </div>
                            </div>
                        </div>
                        <h4 style={{ fontWeight: 'bold', color: 'black' }}>{service.title}</h4>
                        <p style={{ color: 'black' }}>{service.description}</p>
                    </Link>
            }


        </div>
    );
};

export default Service;
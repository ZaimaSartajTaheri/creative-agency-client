import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../../App';
import Sidebar from '../../Sidebar/Sidebar';
import './Review.css';

const Review = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    const [info, setInfo] = useState({});

    const handleBlur = e => {
        const newInfo = { ...info };
        newInfo[e.target.name] = e.target.value;
        setInfo(newInfo);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const reviewData = { ...info };
        reviewData.photo = loggedInUser.photo;

        fetch('http://localhost:5000/addReview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        })
            .then(res => res.json())
            .then(data => {

                if (data) {
                    history.replace("/home");
                }
            })
    }
    return (

        <div className="row">
            <div className="col-md-3 col-sm-12 col-12">
                <Sidebar></Sidebar>
            </div>
            <div className="col-md-9 col-sm-12 col-12 bg-white">
                <nav className="navbar navbar-expand-lg ">
                    <h3 className="navbar-brand">Add Review</h3>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <h6>{loggedInUser.name}</h6>
                        </li>
                    </ul>
                </nav>
                <div className="review-right-part">

                    <form className="order-form" onSubmit={handleSubmit} >


                        <input onBlur={handleBlur} className="form-control" name="name" placeholder="Your name" />
                        <br />
                        <input onBlur={handleBlur} className="form-control" name="companyName" placeholder="Company's name,Designation" />
                        <br />
                        <textarea onBlur={handleBlur} className="form-control" name="details" placeholder="Description"  ></textarea>
                        <br></br>
                        <button type="submit" style={{ backgroundColor: '#111430', color: 'white' }} className="btn">Submit</button>

                    </form>


                </div>

            </div>

        </div>

    );
};

export default Review;
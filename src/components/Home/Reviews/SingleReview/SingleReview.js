import React from 'react';
import './SingleReview.css';

const SingleReview = ({ review }) => {
    return (

        <div className="card col-md-4 col-sm-6 review-card">
            <div>
                <div className="d-flex">
                    <img style={{ height: '100px' }} className="img-fluid mb-3 mr-3" src={review.photo} alt="" />
                    <div style={{ fontWeight: 'bold' }}>
                        <h4>{review.name}</h4>
                        <p>{review.companyName}</p>
                    </div>

                </div>
                <p style={{ color: 'gray' }}>{review.details}</p>
            </div>
        </div>



    );
};

export default SingleReview;
import React, { useEffect, useState } from 'react';
import SingleReview from './SingleReview/SingleReview';

const Reviews = () => {
  const [reviews, setReviews] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/reviews')
      .then(res => res.json())
      .then(data => setReviews(data))
  }, [])
  return (
    <div>
      <section className="reviews mt-5">
        <div className="container">
          <h5 className="text-center mb-5">Clients <span style={{ color: '#7AB259' }}>Feedback</span></h5>
          <div className="card-deck row text-center">
            {
              reviews.map(review => <SingleReview key={review._id} review={review}></SingleReview>)
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
import React from 'react';
import "./reviews.css";
import StarRatings from "react-star-ratings";


const ReviewsList = ({ reviews }) => {
    return (
        <div class="reviews w-75">
            <h3>Other's Reviews:</h3>
            <hr />
            {reviews?.map((review, index) => {
                return <>
                    <div class="review-card my-3" key={index}>
                        <div class="row">
                            <div class="col-1">
                                <img
                                    src={review?.user?.avatar ? review?.user?.avatar?.url : "../images/default_avatar.jpg"}
                                    alt={review?.user?.name}
                                    width="50"
                                    height="50"
                                    class="rounded-circle"
                                    id='review-img'
                                />
                            </div>
                            <div class="col-11">
                                <div class="star-ratings">
                                    <StarRatings
                                        rating={review?.rating}
                                        starRatedColor="#ffb829"
                                        numberOfStars={5}
                                        starDimension="22px"
                                        starSpacing="1px"
                                        name='rating'
                                    />
                                </div>
                                <p class="review_user">by {review?.user?.name}</p>
                                <p class="review_comment">{review?.comment}</p>
                            </div>
                        </div>
                        <hr />
                    </div>
                </>
            })}


        </div>
    )
}

export default ReviewsList
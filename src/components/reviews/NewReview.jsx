import React, { useEffect, useState } from 'react'
import Loader from '../layout/Loader'
import toast from 'react-hot-toast'
import { useCanReviewQuery, useSubmitReviewMutation } from '../../redux/api/productsApi'
import StarRatings from "react-star-ratings";


const NewReview = ({ productId }) => {

  const [submitReview, { isLoading, error, isSuccess }] = useSubmitReviewMutation();

  const { data } = useCanReviewQuery(productId);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  console.log(data)


  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message)
    }
    if (isSuccess) {
      toast.success("Review Submitted Successfully")
    }
  }, [error, isSuccess])

  if (isLoading) return <Loader />

  const submitHandler = () => {
    const reviewData = {
      rating,
      comment,
      productId,
    }
    submitReview(reviewData);
  }


  return (
    <div>
      {
        data?.canReview  && <button
          id="review_btn"
          type="button"
          className="btn btn-primary mt-4"
          data-bs-toggle="modal"
          data-bs-target="#ratingModal"
        >
          Submit Your Review
        </button>
      }

      <div className="row mt-2 mb-5">
        <div className="rating w-50">
          <div
            className="modal fade"
            id="ratingModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="ratingModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="ratingModalLabel">
                    Submit Review
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <StarRatings
                    rating={rating}
                    starRatedColor="#ffb829"
                    numberOfStars={5}
                    starDimension="22px"
                    starSpacing="1px"
                    name='rating'
                    changeRating={(e) => setRating(e)}
                  />

                  <textarea
                    name="review"
                    id="review"
                    className="form-control mt-4"
                    placeholder="Enter your comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>

                  <button
                    id="new_review_btn"
                    className="btn w-100 my-4 px-4"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={submitHandler}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewReview
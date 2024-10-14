// components/FeedbackCard.js
import React from "react";
import { Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const FeedbackCard = ({ feedback }) => {
  const { firstName, lastName, profilePicture, feedbackInfo, addresss } =
    feedback;
  const rating = feedbackInfo?.sumOfRating || 0;

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body className="d-flex align-items-center">
        <div className="me-4">
          <img
            src={profilePicture}
            alt={`${firstName} ${lastName}`}
            className="rounded-circle"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
        </div>
        <div>
          <h5 className="fw-bold mb-1">
            {firstName} {lastName}
          </h5>
          <p className="text-muted mb-1">
            {addresss.city}, {addresss.country}
          </p>
          <div className="d-flex align-items-center">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                color={i < rating ? "orange" : "lightgray"}
                size={20}
                className="me-1"
              />
            ))}
            <span className="text-muted ms-2">{rating} / 5</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FeedbackCard;

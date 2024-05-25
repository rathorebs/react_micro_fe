import React from "react";
import "./FeedbackCard.css";
const FeedbackCard = () => {
  return (
    <div className="custom-feedback-card">
      <div className="first-row">
        <div className="col-1">
          <img
            src={
              "https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
            }
            className="feedback-card-image"
          />
        </div>
        <div className="col-2">
          <div className="feedback-card-user-name">Savannah Nguyen </div>
          <div className="feedback-card-session-name">Yoga session</div>
        </div>
        <div className="feedback-card-session-date col-3">20 Jul 2020</div>
      </div>
      <div className="feedback-divider">
        <hr className="feedback-hr" />
      </div>
      <div className="feedback-heading">Amazing practice today!</div>
      <div className="feedback-description">
        Keep working on your back like that and you’ll reduce your pain soon
        enough.
      </div>
    </div>
  );
};
export default FeedbackCard;

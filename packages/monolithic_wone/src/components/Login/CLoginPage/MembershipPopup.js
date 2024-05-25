import React from "react";
import membershipPopupImg from "../../../Assets/membershipPopupImg.png";
import crossBtn from "../../../Assets/cross-btn.svg";
import "./MembershipPopup.css";

const MembershipPopup = (props) => {
  return (
    <div className="membershipPopup-container">
      <div className="membershipPopup-wrapper">
        <div className="membershipPopup-model">
          <img
            className="membershipPopup-model-crossBtn"
            src={crossBtn}
            alt=""
            onClick={() => {
              props.closeForm();
            }}
          />
          <img src={membershipPopupImg} className="membershipPopupImg" alt="" />
          <h1>Renew Membership</h1>
          <p>
            You no longer have a membership associated with this account. To
            renew your membership, log in using the mobile app.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MembershipPopup;

import React, { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

import "./AddandRemove.css";
import emailIcon from "../../../Assets/email_icon_white.svg";
import removeCircle from "../../../Assets/remove_circle_white.svg";
import { PrimaryButton } from "../../../components/buttons";

const RESEND_INVITE = gql`
  query ResendMemberInvite($userID: ID!) {
    resendMemberInvite(userID: $userID) {
      status
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeactivateMember($id: ID!) {
    deactivateEmployee(id: $id) {
      ok
      employee {
        userdetailObj {
          userObj {
            isActive
          }
        }
      }
    }
  }
`;

const AddandRemove = ({ userId, userEmail, employeeId, closeModal }) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const [resendInvite] = useLazyQuery(RESEND_INVITE);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);
  const handleDeleteEmployee = () => {
    deleteEmployee({
      variables: {
        id: employeeId,
      },
    })
      .then((res) => {
        toast.success(`Successfully removed ${userEmail}.`);
        closeModal(true);
      })
      .catch((err) => {
        toast.error(
          `Unable to remove ${userEmail} at this time. Please try again later or contact support@walkingonearth.com if the problem persists.`
        );
        console.error(err);
      });
  };
  const handleResendInvite = () => {
    resendInvite({
      variables: {
        userID: userId,
      },
    })
      .then((res) => {
        toast.success(`Successfully resent invite to ${userEmail}.`);
        closeModal(true);
      })
      .catch((err) => {
        toast.error(
          `Unable to resend invitation to ${userEmail}. Please try again. Please try again later or contact support@walkingonearth.com if the problem persists.`
        );
        console.error(err);
      });
  };
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          closeModal(true);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  return (
    <div className="removeEmployee-form-div" ref={wrapperRef}>
      <PrimaryButton
        className="resend-invite-form-button"
        onClick={handleResendInvite}
      >
        <img className="removeCircle-img" src={emailIcon} alt="icon-circle" />
        Resend invite
      </PrimaryButton>
      <PrimaryButton
        className="removeEmployee-form-button"
        onClick={handleDeleteEmployee}
      >
        <img
          className="removeCircle-img"
          src={removeCircle}
          alt="icon-circle"
        />
        Remove member
      </PrimaryButton>
    </div>
  );
};

export default AddandRemove;

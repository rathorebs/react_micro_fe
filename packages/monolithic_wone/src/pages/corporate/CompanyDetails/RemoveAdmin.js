import React, { useRef, useEffect } from "react";
import { Button } from "reactstrap";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
//import removeCircle from "../../../Assets/remove-circle.svg";
import "./RemoveAdmin.css";

const DELETE_CORPORATE_COMPANY_ADMIN = gql`
  mutation DeleteCorporateCompanyAdmin($id: ID!) {
    deleteCorporateCompanyAdmin(id: $id) {
      ok
      deletedAdmin {
        userdetailObj {
          role {
            name
          }
          userObj {
            email
          }
        }
      }
    }
  }
`;

const RemoveAdmin = (props) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const [deleteCorporateCompanyAdmin] = useMutation(
    DELETE_CORPORATE_COMPANY_ADMIN
  );
  const handleRemoveAdmin = () => {
    deleteCorporateCompanyAdmin({
      variables: {
        id: props.adminId,
      },
    })
      .then((res) => {
        props.closeModel(true);
        props.updateCompanyDetailsOnDOM();
        toast.success(`Admin removed successfully.`);
      })
      .catch((err) => {
        toast.error(`Error while removing admin ${err}`);
      });
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          //ref.current.style.display = "none";
          //console.log(ref.current);
          props.closeModel(true);
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
    <div className="removeAdmin-form" ref={wrapperRef}>
      <div onClick={handleRemoveAdmin}>
        {/* <img
          className="removeCircle-img"
          src={removeCircle}
          alt="icon-circle"
        /> */}
        <Button className="removeAdmin-form-button remove-admin-btn">
          Remove Admin
        </Button>
      </div>
      <Button
        className="removeAdmin-form-button"
        onClick={() => props.closeModel(true)}
      >
        Cancel
      </Button>
    </div>
  );
};

export default RemoveAdmin;

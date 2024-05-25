import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { gql, useMutation } from "@apollo/client";
import "./AddEmployee.css";
import constant from "../../../Constant";
import { toast } from "react-toastify";
import { PrimaryButton, SecondaryButton } from "../../../components/buttons";

const QUERY_CREATEEMPLOYEE = gql`
  mutation SelfServeAddMembers($emailList: [String]!) {
    selfServeAddMembers(emailList: $emailList) {
      ok
      numberOfSeatsAdded
      duplicateMembers
      seatsLeft
      addedMembers
    }
  }
`;

const AddEmployee = ({ seatsLeft, closeAddEmployeeForm }) => {
  const [emails, setEmails] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [emailList, setEmailList] = useState([]);

  const [createEmployee] = useMutation(QUERY_CREATEEMPLOYEE);
  const handleEmail = (event) => {
    setEmails(event.target.value);
    if (event.target.value.length >= 0) {
      let strEml = event.target.value.split(",");
      let removeWhiteSpace = strEml.map((el) => el.trim());
      let arrOfEmail = removeWhiteSpace.filter((el) => el !== "");

      setEmailList(arrOfEmail);
    }
  };

  const handleValidation = (emails) => {
    let formIsValid = true;

    for (const email of emails) {
      // https://stackoverflow.com/a/13975255
      const input = document.createElement("input");

      input.type = "email";
      input.required = true;
      input.value = email;

      formIsValid =
        typeof input.checkValidity === "function"
          ? input.checkValidity()
          : /\S+@\S+\.\S+/.test(email);

      if (!formIsValid) {
        setErrorMessage(
          `Invalid email format "${email}". Please update your list.`
        );
        break;
      }
    }

    return formIsValid;
  };

  const createNewEmployee = (emails) => {
    let uniqueEmails = {};
    let duplicates = 0;
    emails = emails.filter((item) => {
      if (uniqueEmails.hasOwnProperty(item)) {
        uniqueEmails[item] += 1;
        duplicates += 1;
        return false;
      } else {
        uniqueEmails[item] = 0;
        return true;
      }
    });

    if (duplicates) {
      toast.warning(
        `Skipped ${duplicates} duplicate email${
          duplicates === 1 ? "" : "s"
        } from your list.`
      );
    }

    createEmployee({
      variables: {
        emailList: emails,
      },
    })
      .then((res) => {
        const { addedMembers, duplicateMembers } = res.data.selfServeAddMembers;
        if (addedMembers.length) {
          toast.success(
            `Successfully added ${addedMembers.length} new member${
              addedMembers.length === 1 ? "" : "s"
            }.`
          );
        }

        if (duplicateMembers.length) {
          toast.warning(
            `Skipped adding ${duplicateMembers.length} email${
              duplicateMembers.length === 1 ? "" : "s"
            } because they already exist.`
          );
        }

        closeAddEmployeeForm(true);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(err.message);
      });
  };

  const checkValidation = (email) => {
    if (email.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleUpdateEmployees = () => {
    if (checkValidation(emailList)) {
      if (handleValidation(emailList)) {
        setErrorMessage("");
        createNewEmployee(emailList);
      }
    } else {
      setErrorMessage("Please add at least one member email");
    }
  };

  const limitErrorElement = emailList.length >=
    constant.SELF_SERVE_MAX_NUMBER_OF_SEATS && (
    <p className="error_message">
      To add more than a 100 seats please{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={constant.SELF_SERVE_CONTACT_SALES_URL}
      >
        contact sales
      </a>
      .
    </p>
  );
  return (
    <>
      <Modal className="addEmployee-wrapper" isOpen={true}>
        <ModalBody className="addEmployee-form">
          <h1>Add members</h1>
          <h3 className="warnFont">
            {emails.length > 0
              ? `${emailList.length}/${seatsLeft}`
              : `${seatsLeft} seats available`}
          </h3>
          <p>
            Enter one or more email addresses of the members you’d like to add.
            Separate the emails with a comma.
          </p>
          <div className="add-employee-block">
            <React.Fragment>
              <div className="addEmployee-email">
                <textarea
                  type="text"
                  name="emails"
                  onChange={handleEmail}
                  value={emails}
                  rows="5"
                  placeholder="Enter here the emails..."
                />
              </div>
            </React.Fragment>
            {emailList.length > seatsLeft && emailList <= 100 && (
              <p>
                When you add these members, we will add{" "}
                {Math.abs(seatsLeft - emailList.length)} more seat(s) to your
                subscription plan.
              </p>
            )}
            {limitErrorElement}
          </div>
          <PrimaryButton
            className="addEmployee-addbtn"
            onClick={handleUpdateEmployees}
            disabled={emailList.length >= 100}
          >
            <span>Add members</span>
          </PrimaryButton>
          <SecondaryButton
            className="addEmployee-cancelbtn"
            onClick={() => {
              closeAddEmployeeForm(false);
            }}
          >
            <span>Cancel</span>
          </SecondaryButton>
          <div className="error-message message">{errorMessage}</div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddEmployee;

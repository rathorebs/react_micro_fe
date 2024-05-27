import React, { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import {
  QUERY_CHANGE_PASSWORD,
  QUERY_UPDATE_CORPORATE_ADMIN,
} from "../../utility/graphQl/mutation";
import { toast } from "react-toastify";
import constant from "../../Constant";
import PasswordField from "../../components/commons/fields/password";
import "./AdminSetting.css";
import defaultImage from "../../Assets/images/profile-pic-default.svg";
import { PrimaryButton } from "../../components/buttons";

const AdminSetting = () => {
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);
  const currentPasswordInput = useRef(null);
  const [billingEmail, setBillingEmail] = useState();
  const [userFullName, setUserFullName] = useState({
    firstName: localStorage.getItem("userfirstName"),
    lastName: localStorage.getItem("userlastName"),
  });

  const [imageHash, setImageHash] = useState(Date.now());
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("teacherPhoto") === null ||
      localStorage.getItem("teacherPhoto") === "null"
      ? defaultImage
      : localStorage.getItem("teacherPhoto")
  );

  const { firstName, lastName } = userFullName;
  const userEmail = localStorage.getItem("userEmailId");
  const [changePassword, { loading }] = useMutation(QUERY_CHANGE_PASSWORD);
  const [updateCorporateAdmin] = useMutation(QUERY_UPDATE_CORPORATE_ADMIN);

  const handleUserNameChange = (event) => {
    const { value, name } = event.target;
    setUserFullName({ ...userFullName, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!passwordInput.current || !confirmPasswordInput.current) {
      throw new Error("Password inputs are required");
    }

    if (passwordInput.current.value !== confirmPasswordInput.current.value) {
      confirmPasswordInput.current.setCustomValidity(
        "Password confirmation should match your new password"
      );
      confirmPasswordInput.current.reportValidity();
      return;
    } else {
      confirmPasswordInput.current.setCustomValidity("");
    }

    changePassword({
      variables: {
        input: {
          oldPassword: currentPasswordInput.current.value,
          newPassword: passwordInput.current.value,
        },
      },
    })
      .then((res) => {
        toast.success(`Password successfully changed.`);
        passwordInput.current.value = "";
        confirmPasswordInput.current.value = "";
        currentPasswordInput.current.value = "";
      })
      .catch((error) => {
        toast.error(`${error.message}`);
      });
  };

  const handleAccInfo = () => {
    updateCorporateAdmin({
      variables: {
        id: localStorage.getItem("studentID"),
        input: {
          firstName: firstName,
          lastName: lastName,
        },
      },
    })
      .then((res) => {
        localStorage.setItem(
          "userfirstName",
          res?.data?.updateStudentdetail?.studentDetail?.userdetailObj?.userObj
            ?.firstName
        );
        localStorage.setItem(
          "userlastName",
          res?.data?.updateStudentdetail?.studentDetail?.userdetailObj?.userObj
            ?.lastName
        );

        toast.success(`User name successfully updated.`);
      })
      .catch((err) => {});
  };

  const handleChangeImage = async (e) => {
    let imageObj = e.target.files[0];
    if (imageObj) {
      if (imageObj.size > 2001094) {
        toast.error("Maximum 2 MB image size is allowed");
      } else {
        let formData = new FormData();
        formData.append("image", imageObj);
        formData.append("roleName", "STUDENT");
        let userId = localStorage.getItem("userID");
        let url = `${constant.FILE_UPLOAD_URL}upload_user_image/${userId}`;
        await fetch(url, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((response) => {
            setProfileImage(response?.image_url);
            localStorage.setItem("teacherPhoto", response?.image_url);
            toast.success(`Photo successfully uploaded.`);
            setImageHash(Date.now());
          })
          .catch((error) => {
            toast.error(`Error while uploading ${imageObj.name} ${error}`);
          });
      }
    }
  };

  return (
    <div className="adminSetting-container corporate-container">
      <div className="adminSetting-accInfo">
        <p className="adminSetting-container-p">Account information</p>

        {billingEmail === undefined ? setBillingEmail(userEmail) : ""}
        <div className="adminSetting flex-column">
          <div className="d-flex justify-content-between flex-lg-row flex-column-reverse">
            <div className="adminSetting-left">
              <div className="adminSettingName">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={handleUserNameChange}
                />
              </div>
              <div className="adminSettingName">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleUserNameChange}
                />
              </div>
              <div className="adminSettingEmail">
                <label>Email</label>
                <input
                  type="text"
                  name="billingEmail"
                  value={billingEmail}
                  disabled
                />
              </div>
            </div>
            <div className="adminSetting-right">
              <label>Photo</label>
              <div className="logo-changeLogo">
                <img
                  className="Companylogo"
                  src={
                    profileImage === "null" || profileImage === null
                      ? `${profileImage}`
                      : `${profileImage}?${imageHash}`
                  }
                  alt="Profile Pic"
                />

                <div className="ChangeLogo">
                  <div className="fileinputs">
                    <input
                      type="file"
                      value=""
                      accept="image/*"
                      title="Click to upload a profile image"
                      onChange={(e) => handleChangeImage(e)}
                    />
                  </div>
                  <h5>JPG or PNG, at least 256px</h5>
                </div>
              </div>
            </div>
          </div>
          <PrimaryButton
            className="adminSetting-left-button"
            onClick={handleAccInfo}
          >
            Save changes
          </PrimaryButton>
        </div>
      </div>
      <form className="SignUp" onSubmit={handleSubmit} autoComplete="off">
        {/* Stops chrome autofill: https://gist.github.com/niksumeiko/360164708c3b326bd1c8 */}
        <input
          autoComplete="false"
          name="hidden"
          type="text"
          style={{ display: "none" }}
        />
        {/* Lets chrome update password dialog to pick up the email as a suggestion, so you don't have to type it out */}
        <input
          autoComplete="false"
          name="email"
          type="text"
          value={userEmail}
          style={{ display: "none" }}
        />
        <div className="adminSetting-changePass">
          <p className="adminSetting-container-p">Change password</p>
          <div className="adminSetting">
            <div className="adminSetting-left custom-password-field">
              <label htmlFor="current-password">Current password</label>
              <PasswordField
                inputProps={{
                  required: true,
                  name: "current-password",
                  ref: currentPasswordInput,
                  placeholder: "",
                }}
              />
              <label htmlFor="new-password">New password</label>
              <PasswordField
                inputProps={{
                  required: true,
                  name: "new-password",
                  autoComplete: "new-password",
                  ref: passwordInput,
                  placeholder: "",
                  pattern: "^(?=.*[a-z])(?=.*[A-Z]).{6,}$",
                  title:
                    "Password must contain at least 1 uppercase, 1 lowercase, and a minimum of 6 characters.",
                }}
              />
              <label htmlFor="confirm-new-password">Confirm new password</label>
              <PasswordField
                inputProps={{
                  required: true,
                  name: "confirm-new-password",
                  ref: confirmPasswordInput,
                  placeholder: "",
                  onChange: () =>
                    confirmPasswordInput.current.setCustomValidity(""),
                }}
              />
              <PrimaryButton
                disabled={loading}
                type="submit"
                className="change-password-admn-set"
              >
                {loading ? (
                  <div className="spinner-border spinner-border-sm" />
                ) : (
                  <span>Change password</span>
                )}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminSetting;

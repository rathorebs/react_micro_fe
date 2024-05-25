import React, { useState } from "react";
import constant from "Constant";
import appInfo from "utility/app-info";
import DefaultProfile from "Assets/icon/avatar-default.svg";
import { LEARNER_UPDATE_PROFILE_SETTINGS } from "utility/graphQl/mutation";
import { useMutation } from "@apollo/client";
import { Button } from "apps/user/common/components/button";
import { LearnerProfileSettingsFields } from "apps/user/learner/api/types";
import {
  FirstName as InputField,
  LastName,
  Gender,
  Birthday,
} from "apps/user/common/components/fields/inputs";

import styles from "./styles.module.scss";

interface EditProfileProps {
  fields: LearnerProfileSettingsFields;
}

const EditProfile = ({ fields }: EditProfileProps) => {
  const [editProfile, { loading }] = useMutation(
    LEARNER_UPDATE_PROFILE_SETTINGS
  );
  const [image, setImage] = useState(fields.photoUrl.value);
  const [selectedFiles, setSelectedFile] = useState(null);
  const [imageHash, setImageHash] = useState(Date.now());
  const [firstName, setFirstName] = useState(
    fields.firstName.value.toLowerCase()
  );
  const [lastName, setLastName] = useState(fields.lastName.value);
  const [injuries, setInjuries] = useState(fields.injuries.value || "");
  const [birthday, setBirthday] = useState(fields.birthday.value);
  const [gender, setGender] = useState(
    fields.gender.options?.find((item) => item.selected === true)?.value || ""
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleUploadProfilePic = async () => {
    if (selectedFiles) {
      let formData = new FormData();
      formData.append("image", selectedFiles);
      formData.append("roleName", "STUDENT");
      let userId = localStorage.getItem("userID");
      let url = `${constant.FILE_UPLOAD_URL}upload_user_image/${userId}`;
      await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((response) => {
          setImage(response?.image_url);
          setImageHash(Date.now());
        })
        .catch((error) => {
          setErrorMessage(error.message);
          console.error(`Error while uploading ${selectedFiles.name} ${error}`);
        });
    }
  };

  const imageChange = (e) => {
    let imageObj = e.target.files[0];
    if (imageObj) {
      if (imageObj.size > 2001094) {
        alert("Maximum 2 MB image size is allowed");
        return false;
      } else {
        setSelectedFile(imageObj);
        setImage(imageObj);
      }
    }
  };

  let disabledValue = false;
  if (firstName?.length <= 0 && fields.firstName.required) {
    disabledValue = true;
  } else if (lastName?.length <= 0 && fields.lastName.required) {
    disabledValue = true;
  } else if (birthday?.length <= 0 && fields.birthday.required) {
    disabledValue = true;
  } else if (gender?.length <= 0 && fields.gender.required) {
    disabledValue = true;
  } else if (
    fields.photoUrl.value === image &&
    fields.firstName.value.toLowerCase() === firstName &&
    fields.lastName.value === lastName &&
    fields.injuries.value === (injuries || null) &&
    fields.birthday.value === birthday &&
    fields.gender.options?.find((item) => item.selected === true)?.value ===
      gender
  ) {
    disabledValue = true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUploadProfilePic();
    editProfile({
      variables: {
        input: {
          firstName: firstName,
          lastName: lastName,
          injuries: injuries.length > 0 ? injuries : null,
          birthday: birthday === "DD - MM - YYYY" ? null : birthday,
          gender: gender,
        },
        appInfo,
      },
    }).catch((error) => {
      setErrorMessage(error.message);
      console.error("Edit profile error:", error);
    });
  };

  const DetailTitle = ({ title }) => {
    return <p className={styles["detail-title"]}>{title}</p>;
  };

  return (
    <div className={styles["edit-profile"]}>
      <DetailTitle title={"Edit profile"} />
      <form onSubmit={handleSubmit}>
        <div className={styles["fields"]}>
          <div className={styles["profile-image"]}>
            {image ? (
              <img
                src={
                  selectedFiles
                    ? URL.createObjectURL(selectedFiles)
                    : `${image}?${imageHash}`
                }
                alt={"profile-icon"}
              />
            ) : (
              <img
                src={DefaultProfile}
                alt={"default-icon"}
                className={styles["defaultImage"]}
              />
            )}
            <input
              type="file"
              onChange={(e) => imageChange(e)}
              title="Upload new image"
              accept="image/*"
            />
          </div>
          <div>
            <InputField
              data={fields.firstName}
              firstName={firstName}
              setFirstName={setFirstName}
              showIcon={false}
              markRequired={false}
              InputClassName={styles["edit-profile-input-firstname"]}
              LabelClassName={styles["edit-profile-label"]}
            />
            <LastName
              data={fields.lastName}
              lastName={lastName}
              setLastName={setLastName}
              editProfile={true}
              InputClassName={styles["edit-profile-input"]}
              LabelClassName={styles["edit-profile-label"]}
            />
            {/* Injuries field but having same styling and functionality like FirstName */}
            <InputField
              data={fields.injuries}
              firstName={injuries}
              setFirstName={setInjuries}
              showIcon={false}
              markRequired={false}
              InputClassName={styles["edit-profile-input"]}
              LabelClassName={styles["edit-profile-label"]}
            />
            <Birthday
              data={fields.birthday}
              birthdayDate={birthday}
              setBirthdayDate={setBirthday}
              editProfile={true}
              InputClassName={styles["edit-profile-input"]}
              LabelClassName={styles["edit-profile-label"]}
            />
            <Gender
              data={fields.gender}
              selectGender={gender}
              setSelectGender={setGender}
              showIcon={false}
              markRequired={false}
              floating={true}
              showLabel={true}
              InputClassName={styles["edit-profile-input"]}
              LabelClassName={styles["edit-profile-label"]}
            />
          </div>
        </div>
        {errorMessage && (
          <p className={styles["error-message"]}>{errorMessage}</p>
        )}
        <div className={styles["save-button"]}>
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            loading={loading}
            disabled={disabledValue}
          >
            SAVE CHANGES
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;

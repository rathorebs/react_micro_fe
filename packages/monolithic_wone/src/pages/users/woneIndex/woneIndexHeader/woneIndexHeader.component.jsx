import React, { useState, useEffect } from "react";
import ProgressCircularBar from "../../../../components/commons/ProgressCircularBar";
import defaultImage from "../../../../Assets/images/profile-pic-default.svg";
import constant from "../../../../Constant";
import "./woneIndexHeader.styles.scss";

const WoneIndexHeader = ({ assessmentData }) => {
  const [image, setImage] = useState(
    assessmentData.studentData?.userdetailObj?.photo === null
      ? defaultImage
      : assessmentData.studentData?.userdetailObj?.photo
  );
  const [selectedFiles, setSelectedFile] = useState(null);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [imageHash, setImageHash] = useState(Date.now());

  const imageChange = (e) => {
    let imageObj = e.target.files[0];
    if (imageObj) {
      if (imageObj.size > 2001094) {
        alert("Maximum 2 MB image size is allowed");
        return false;
      } else {
        setSelectedFile(imageObj);
        setButtonStatus(true);
      }
    }
  };

  useEffect(() => {
    handleUploadprofilePic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFiles]);

  const handleUploadprofilePic = async () => {
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
        .then((responce) => {
          setImage(responce?.image_url);
          setButtonStatus(false);
          setImageHash(Date.now());
        })
        .catch((error) => {
          console.log(`Error while uploading ${selectedFiles.name} ${error}`);
        });
    }
  };

  if (!assessmentData.externalAssessment) {
    return (
      <div className="row wone-index-header">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
          <div className="pb-file-coantainer">
            <div className="pb-container">
              <ProgressCircularBar
                progress={0}
                size={120}
                strokeWidth={6}
                circleOneStroke="#ffffff"
                circleTwoStroke="#5582a7"
                progressStatus={false}
              />
            </div>
            <img
              src={`${image}?${imageHash}`}
              className="rounded-circle-width"
              alt="Profile Pic"
            />
            {!buttonStatus && (
              <input
                type="file"
                value=""
                accept="image/*"
                title="Click to upload a profile image"
                onChange={(e) => imageChange(e)}
              />
            )}
          </div>
          <h1 style={{ opacity: "0.5" }}>
            0<sup>%</sup>
          </h1>
          <h2>My WONE Index</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="row wone-index-header">
      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
        <div className="pb-file-coantainer">
          <div className="pb-container">
            <ProgressCircularBar
              progress={assessmentData.externalAssessment.assessmentPercentage}
              size={120}
              strokeWidth={6}
              circleOneStroke="#ffffff"
              circleTwoStroke="#5582a7"
              progressStatus={false}
            />
          </div>
          <img
            src={`${image}?${imageHash}`}
            className="rounded-circle-width bsr"
            alt="Profile Pic"
          />
          {!buttonStatus && (
            <input
              type="file"
              value=""
              accept="image/*"
              title="Click to upload a profile image"
              onChange={(e) => imageChange(e)}
            />
          )}
        </div>
        <h1
          style={
            assessmentData.externalAssessment.assessmentPercentage
              ? { opacity: "1" }
              : { opacity: "0.5" }
          }
        >
          {`${assessmentData.externalAssessment.assessmentPercentage}`}
          <sup>%</sup>
        </h1>
        <h2>My WONE Index</h2>
      </div>
    </div>
  );
};

export default WoneIndexHeader;

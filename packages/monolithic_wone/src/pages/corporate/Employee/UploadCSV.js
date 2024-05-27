import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import crossBtn from "../../../Assets/cross-btn.svg";
import "./UploadCSV.css";
import { FileDrop } from "react-file-drop";
import constant from "../../../Constant";
import removeCircle from "../../../Assets/remove-circle.svg";
import { CSVLink } from "react-csv";

const UploadCSV = (props) => {
  let history = useNavigate();
  const [selectedFiles, setSelectedFile] = useState([]);
  const [existingUser, setExistingUser] = useState([]);
  const [isExistingUser, setIsExistingUser] = useState(false);

  const chooseFile = () => {
    document.getElementById("emoloyeeCSV").click();
  };

  const csvHeader = [
    {
      label: "First Name",
      key: "firstName",
    },
    {
      label: "Last Name",
      key: "lastName",
    },
    {
      label: "Email",
      key: "email",
    },
  ];

  const addCSVFile = (e) => {
    let totalCount = e.target.files.length;
    setSelectedFile([]);
    let temp = selectedFiles;

    for (let i = 0; i < totalCount; i++) {
      let file = e.target.files[i];
      if (file.type !== "text/csv") {
        setSelectedFile([]);
        temp = [];
        break;
      }
      temp.push(file);
    }

    setTimeout(() => {
      setSelectedFile(temp);
    }, 0);
  };

  const fileDrop = (files, event) => {
    setSelectedFile([]);
    let temp = selectedFiles;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type === "text/csv") {
        temp.push(files[i]);
      }
    }
    setTimeout(() => {
      setSelectedFile(temp);
    }, 0);
  };

  const removeFile = (event, index) => {
    let temp = selectedFiles;
    setSelectedFile([]);
    if (index > -1) {
      temp.splice(index, 1);
    }
    setTimeout(() => {
      setSelectedFile(temp);
    }, 0);
  };

  const uploadMultipleCSV = async (value) => {
    if (value < selectedFiles.length) {
      let formData = new FormData();
      formData.append("employees", selectedFiles[value]);
      let companyId = localStorage.getItem("companyID");
      let url = `${constant.FILE_UPLOAD_URL}upload_employee/${companyId}`;
      await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((responce) => {
          if (responce.failed_user_list.length > 0) {
            responce.failed_user_list.forEach((element) => {
              existingUser.push(element);
            });
          }
          setExistingUser(existingUser);
          uploadMultipleCSV(value + 1);
        })
        .catch((error) => {
          console.log(
            `Error while uploading ${selectedFiles[value].name} ${error}`
          );
        });
    } else {
      setIsExistingUser(true);
    }
  };

  const handleUploadCSV = async () => {
    if (selectedFiles.length < 1) {
      alert("Please add at least one file");
    } else {
      uploadMultipleCSV(0);
      navigate("/corporate/employee");
      setSelectedFile([]);
    }
  };

  return (
    <div className="upload-csv-conatiner">
      <div className="upload-csv-wrapper">
        <div className="upload-csv-form">
          <h1>Add employees</h1>
          <p>Enter one or more employees you would like to add</p>
          <img
            className="addLocation-form-crossBtn cursor-pointer"
            src={crossBtn}
            alt=""
            onClick={() => {
              props.closeUploadCSVForm(false);
            }}
          />
          <div className="drag-drop-box">
            <input
              type="file"
              id="emoloyeeCSV"
              onChange={(e) => addCSVFile(e)}
              hidden
              multiple
              accept=".csv"
            />
            <FileDrop onDrop={(files, event) => fileDrop(files, event)}>
              <div className="drag-box-text1">
                Drag & drop files here or
                <span className="select-text" onClick={(e) => chooseFile(e)}>
                  {" "}
                  select
                </span>
              </div>
              <div className="drag-box-text2" onClick={(e) => chooseFile(e)}>
                them from your computer
              </div>
            </FileDrop>
          </div>
          <div className="selected-files-block">
            {selectedFiles.length > 0 &&
              selectedFiles.map((item, index) => (
                <div className="selected-file">
                  <div>
                    <i className="fa fa-file-o" aria-hidden="true"></i>&nbsp;
                    {item.name}
                  </div>
                  <div
                    onClick={(e) => removeFile(e, index)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      className="removeCircle-img"
                      src={removeCircle}
                      alt="icon-circle"
                    />
                  </div>
                </div>
              ))}
          </div>
          <Button
            className="upload-csv-addbtn"
            onClick={handleUploadCSV}
            disabled={selectedFiles.length < 1}
          >
            Upload
          </Button>
          <Button
            className="upload-csv-cancelbtn"
            onClick={() => {
              props.closeUploadCSVForm(false);
            }}
          >
            Cancel
          </Button>
          <div
            className="text-center"
            style={{ marginTop: "0.5rem", fontWeight: "500" }}
          >
            Note : Upload only 500 employee at a time.
          </div>
          <div className="success-error-msg-block">
            {isExistingUser && (
              <>
                <div
                  className="success-message"
                  style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
                >
                  File(s) uploaded successfully
                </div>
                <CSVLink
                  data={existingUser}
                  headers={csvHeader}
                  filename={`existing_employee${new Date()}.csv`}
                  className="error-message"
                >
                  Please Download, not uploaded employee list
                </CSVLink>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCSV;

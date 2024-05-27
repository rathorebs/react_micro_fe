import React, { useState, useEffect } from "react";
import { /* useQuery, */ useMutation, useLazyQuery } from "@apollo/client";
import crossBtn from "../../../Assets/cross-btn.svg";
import { toast } from "react-toastify";
import "./AddAdmin.css";
import { Modal, ModalBody } from "reactstrap";
import {
  CREATE_CORPORATE_COMPANY_ADMIN,
  /* QUERY_CORPORATE_COMPANY_LOCATION_LIST, */
  ACTIVE_MEMBER_LIST,
} from "../GraphQl";
import { PrimaryButton, SecondaryButton } from "../../../components/buttons";

const AddAdmin = (props) => {
  const [adminId, setAdminId] = useState();
  //const [locationId, setLocationId] = useState();
  const [memberList, setMemberList] = useState();
  const [createCorporateCompanyAdmin] = useMutation(
    CREATE_CORPORATE_COMPANY_ADMIN
  );

  /*  const { data: dataCompanyLocationList } = useQuery(
    QUERY_CORPORATE_COMPANY_LOCATION_LIST,
    {
      variables: { companyID: localStorage.getItem("companyID") },
    }
  ); */
  /*  const { data: dataActiveMemberList } = useQuery(ACTIVE_MEMBER_LIST, {
    variables: { companyID: localStorage.getItem("companyID") },
  }); */

  const [dataActiveMemberList] = useLazyQuery(ACTIVE_MEMBER_LIST, {
    fetchPolicy: "no-cache",
    onCompleted(response) {
      setMemberList(response);
    },
    onError(error) {
      console.log("loadActiveMemberList error", error);
    },
  });

  const handleAdminChange = (e) => {
    setAdminId(e.target.value);
  };

  /*  const handleLocationChange = (e) => {
    setLocationId(e.target.value);
  }; */

  const handleAddAdmin = () => {
    createCorporateCompanyAdmin({
      variables: {
        input: {
          companyID: localStorage.getItem("companyID"),
          studentID: adminId,
          //locationID: locationId,
        },
      },
    })
      .then((res) => {
        props.updateCompanyDetailsOnDOM();
        props.CloseAdminForm();
        toast.success(`Member added as a admin successfully`);
      })
      .catch((err) => {
        toast.error(`Error while adding member as a admin ${err}`);
      });
  };

  useEffect(() => {
    dataActiveMemberList({
      variables: { companyID: localStorage.getItem("companyID") },
    });
  }, [dataActiveMemberList]);

  return (
    <>
      <Modal className="addEmployee-wrapper" isOpen={true}>
        <img
          className="addAdmin-form-crossBtn"
          src={crossBtn}
          alt=""
          onClick={() => {
            props.CloseAdminForm(false);
          }}
        />
        <ModalBody className="addAdmin-form">
          <h1>Add Admin</h1>
          <div className="addAdmin-admin">
            <label>Select admin from members list</label>
            <select name="" id="" onChange={handleAdminChange}>
              <option value="" defaultValue>
                Select member...
              </option>
              {memberList &&
                memberList.activeMemberList.map((res, index) => {
                  return (
                    <option value={res.id} key={index}>
                      {res.userdetailObj.userObj.firstName}{" "}
                      {res.userdetailObj.userObj.lastName}
                    </option>
                  );
                })}
            </select>
          </div>
          {/* <div className="addAdmin-location">
            <label>Select main location for admin </label>
            <select name="" id="" onChange={handleLocationChange}>
              <option value="" defaultValue>
                Select location...
              </option>

              {dataCompanyLocationList &&
                dataCompanyLocationList.ok &&
                dataCompanyLocationList.companyLocationList.objects.map(
                  (res) => {
                    return <option value={res.id}>{res.location}</option>;
                  }
                )}
            </select>
          </div> */}
          <div className="addAdmin-btn-container">
            <PrimaryButton
              className="addAdmin-btn mt-4"
              onClick={handleAddAdmin}
              disabled={!adminId}
            >
              Add admin
            </PrimaryButton>
            <SecondaryButton
              className="cancel-btn"
              onClick={() => {
                props.CloseAdminForm(false);
              }}
            >
              Cancel
            </SecondaryButton>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddAdmin;

import React from "react";
import { useAuth } from "./../../../providers/auth";
import { Button } from "apps/user/common/components/button";
import { FirstName as InputField } from "apps/user/common/components/fields/inputs";
import styles from "./CompanyDetails.module.scss";
import { Table } from "reactstrap";
const CompanyDetails = () => {
  const {
    companyAdmin: { companyDetailScreen },
  } = useAuth();
  const companyInfo = companyDetailScreen.companyInfo;
  const companyAdmins = companyDetailScreen.companyAdmins;
  const companyFieldData = {
    name: "companyname",
    id: "companyname",
    placeholder: "COMPANY NAME",
    required: false,
    maxLength: 50,
    minLength: 5,
  };
  const addressFieldData = {
    name: "address",
    id: "address",
    placeholder: "ADDRESS",
    required: false,
    maxLength: 50,
    minLength: 5,
  };
  const phoneFieldData = {
    name: "companyphonenumber",
    id: "companyphonenumber",
    placeholder: "COMPANY PHONE NUMBER",
    required: false,
    maxLength: 10,
    minLength: 9,
  };

  return (
    <div className={styles["company-detail-container"]}>
      <div className={styles["headings"]}>
        <span className={styles["company-details"]}>Company Details</span>
        <p className={styles["company-span"]}>
          In hac habitasse platea dictumst. Vivamus adipiscing fermentum quam
          volutpat. Pleas contact us to change your details
        </p>
      </div>
      <section className={styles["company-detail-image-and-input"]}>
        <div className={styles["profile-image"]}>
          <img src={companyInfo?.photoUrl} alt={"profile-icon"} />
        </div>
        <div className={styles["input-options"]}>
          <InputField
            data={companyFieldData}
            firstName={companyInfo?.companyName}
            showIcon={false}
            markRequired={false}
            InputClassName={styles["company-detail-inputs"]}
            LabelClassName={styles["company-detail-label"]}
          />
          <InputField
            data={phoneFieldData}
            firstName={companyInfo?.tel}
            showIcon={false}
            markRequired={false}
            InputClassName={styles["company-detail-inputs"]}
            LabelClassName={styles["company-detail-label"]}
          />
          <InputField
            data={addressFieldData}
            firstName={companyInfo?.address}
            showIcon={false}
            markRequired={false}
            InputClassName={styles["company-detail-inputs"]}
            LabelClassName={styles["company-detail-label"]}
          />
        </div>
      </section>
      <section className={styles["company-detail-admin-section"]}>
        <div className={styles["title-and-button-container"]}>
          <div className={styles["title"]}>Admins</div>
          <Button
            loading={false}
            // onClick={}
            variant={"primary"}
            disabled={false}
            action={"join"}
            className={styles["add-admin-button"]}
          >
            Add Admin
          </Button>
        </div>
        <div className={styles["table-container"]}>
          <Table responsive={true} borderless={true}>
            <thead>
              <tr>
                {companyAdmins?.labels?.map((item, index) => {
                  return <th>{item}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                {companyAdmins?.members?.map((item, index) => {
                  return (
                    <>
                      <td>AB</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.email}</td>
                      <td>{item.timezone}</td>
                    </>
                  );
                })}
                <td className={styles["table-last-item"]}>
                  <div>This is you</div>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </div>
  );
};
export default CompanyDetails;

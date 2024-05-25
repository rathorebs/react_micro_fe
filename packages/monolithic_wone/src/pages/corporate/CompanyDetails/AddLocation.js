import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import crossBtn from "../../../Assets/cross-btn.svg";
import "./AddLocation.css";
import { Button, Modal, ModalBody } from "reactstrap";

const QUERY_CREATECOMPANYLOCATION = gql`
  mutation CreateCompanyLocation($input: CompanyLocationCreateInput!) {
    createCompanyLocation(input: $input) {
      companyLocation {
        id
        location
        company {
          id
          name
        }
      }
      ok
    }
  }
`;

const QUERY_CORPORATECOMPANYADMIN = gql`
  mutation CreateCorporateCompanyAdmin(
    $input: CorporateCompanyAdminCreateInput!
  ) {
    createCorporateCompanyAdmin(input: $input) {
      corporateCompanyAdmin {
        id
        admin {
          userdetailObj {
            photo
            userObj {
              firstName
              lastName
              email
            }
          }
        }
        location {
          id
          location
        }
      }
      ok
    }
  }
`;

const QUERY_EMPLOYEELIST = gql`
  query EmployeeDataByPage {
    employeesDataPage {
      totalEmployees
      employeeList {
        employee {
          id
          userdetailObj {
            photo
            userObj {
              firstName
              lastName
              email
            }
          }
        }
        avgSessionPerMonth
        lastSession
      }
    }
  }
`;

const AddLocation = (props) => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [adminId, setAdminId] = useState("");
  const [createCompanyLocation] = useMutation(QUERY_CREATECOMPANYLOCATION);
  const [createCompanyAdmin] = useMutation(QUERY_CORPORATECOMPANYADMIN);
  const [locationMsg, setLocationMsg] = useState(null);
  //const [adminMsg, setAdminMsg] = useState(null);

  const { data: dataT } = useQuery(QUERY_EMPLOYEELIST);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleAdminChange = (e) => {
    setAdminId(e.target.value);
  };

  const handleAddLocation = () => {
    createCompanyLocation({
      variables: {
        input: {
          companyID: localStorage.getItem("companyID"),
          location: `${city},${country}`,
        },
      },
    })
      .then((res) => {
        createCompanyAdmin({
          variables: {
            input: {
              companyID: localStorage.getItem("companyID"),
              adminID: adminId,
              locationID: res.data.createCompanyLocation.companyLocation.id,
            },
          },
        })
          .then((res) => {
            props.updateCompanyDetailsOnDOM();
            setLocationMsg("success");
            setTimeout(() => {
              setLocationMsg(null);
            }, 3000);
            props.closeForm(true);
          })
          .catch((err) => {
            console.log("Error createCompanyAdmin", err);
            setLocationMsg("error");
            setTimeout(() => {
              setLocationMsg(null);
            }, 3000);
          });
      })
      .catch((err) => {
        setLocationMsg("error");
        setTimeout(() => {
          setLocationMsg(null);
        }, 6000);
        console.log("Error in createCompanyLocation", err);
      });
  };

  return (
    <>
      <Modal className="addEmployee-wrapper" isOpen={true}>
        <img
          className="addLocation-form-crossBtn"
          src={crossBtn}
          alt=""
          onClick={() => {
            props.closeForm(false);
          }}
        />
        <ModalBody className="addEmployee-form">
          <h1>Add location</h1>
          <p>Enter a new location for your company.</p>
          <div className="addLocation-city">
            <label>City</label>
            <input
              type="text"
              name=""
              placeholder="Enter a city"
              onChange={handleCityChange}
            />
          </div>
          <div className="addLocation-country-state">
            <div className="addLocation-country">
              <label>Country</label>
              <select
                name=""
                className="addLocation-country-select"
                onChange={handleCountryChange}
              >
                <option value="Select country">Select country</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="USA">USA</option>
              </select>
            </div>
          </div>
          <div className="addLocation-admin">
            <label>Select admin</label>
            <select
              name=""
              className="addLocation-country-select"
              onChange={handleAdminChange}
            >
              <option value="Select admin">Select admin</option>
              {dataT &&
                dataT.employeesDataPage.employeeList.map((res) => {
                  return (
                    <option value={res.employee.id}>
                      {res.employee.userdetailObj.userObj.firstName}{" "}
                      {res.employee.userdetailObj.userObj.lastName}
                    </option>
                  );
                })}
            </select>
          </div>
          <Button
            className="addLocation-addbtn mt-4 mb-2"
            type="button"
            onClick={handleAddLocation}
          >
            Add Location
          </Button>
          <Button
            onClick={() => {
              props.closeForm(false);
            }}
            className="addLocation-cancelbtn"
            type="button"
          >
            Cancel
          </Button>
          <div>
            {locationMsg === "success" && (
              <div className="success-message">
                Location added successfullly
              </div>
            )}
            {locationMsg === "error" && (
              <div className="error-message">
                Location/User is already exists
              </div>
            )}
          </div>
        </ModalBody>
      </Modal>
    </>
  );

  // return (
  //   <div className="addLocation-container">
  //     <div className="addLocation-wrapper">
  //       <div className="addLocation-form">
  //         <h1>Add location</h1>
  //         <p>Enter a new location for your company.</p>
  //         <img className="addLocation-form-crossBtn" src={crossBtn} alt="" onClick={() => {
  //           props.closeForm(false)
  //         }} />
  //         <div className="addLocation-city">
  //           <label>City</label>
  //           <input type="text" name="" placeholder="Enter a city" onChange={handleCityChange} />
  //         </div>
  //         <div className="addLocation-country-state">
  //           <div className="addLocation-country">
  //             <label>Country</label>
  //             <select name="" className="addLocation-country-select" onChange={handleCountryChange}>
  //               <option value="Select country">Select country</option>
  //               <option value="United Kingdom" >United Kingdom</option>
  //               <option value="USA">USA</option>
  //             </select>
  //           </div>

  //         </div>
  //         <div className="addLocation-admin">
  //           <label>Select admin</label>
  //           <select name="" className="addLocation-country-select" onChange={handleAdminChange}>
  //             <option value="Select admin" >Select admin</option>
  //             {dataT && dataT.employeesDataPage.employeeList.map((res) => {
  //               return (
  //                 <option value={res.employee.id}>{res.employee.userdetailObj.userObj.firstName} {res.employee.userdetailObj.userObj.lastName}</option>
  //               )
  //             })}

  //           </select>
  //         </div>
  //         <Button className="addLocation-addbtn" type='button' onClick={handleAddLocation}>Add Location</Button>
  //         <Button className="addLocation-cancelbtn" type='button'>Cancel</Button>
  //         <div>
  //           {
  //             locationMsg == 'success' && (<div className='success-message'>Location added successfullly</div>)
  //           }
  //           {
  //             locationMsg == 'error' && (<div className='error-message'>Location/User is already exists</div>)
  //           }
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
};

export default AddLocation;

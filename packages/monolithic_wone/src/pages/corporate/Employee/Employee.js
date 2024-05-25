import React, { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import employeeOptions from "../../../Assets/employeeOptions.svg";
import "./Employee.css";
import AddEmployee from "./AddEmployee";
import CAdminWelcomeModal from "./CAdminWelcomeModal";
import AddandRemove from "./AddandRemove";
import { SecondaryButton } from "../../../components/buttons";

const QUERY_EMPLOYEEDATABYPAGE = gql`
  query EmployeesDataByPage($search: String) {
    employeesDataPage(search: $search) {
      totalEmployees
      seatsLeft
      employeeList {
        status
        employee {
          id
          userdetailObj {
            photo
            role {
              id
              name
            }
            userObj {
              id
              firstName
              lastName
              email
            }
          }
        }
      }
    }
  }
`;

const Employee = () => {
  const [tempIndex, settempIndex] = useState();
  const [showAddEmployeeForm, setshowAddEmployeeForm] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [totalEmployee, setTotalEmployee] = useState(0);
  const [showEmployeeWelcome, setShowEmployeeWelcome] = useState(
    localStorage.getItem("shouldShowWelcome")
  );
  const [seatsLeft, setSeatsLeft] = useState();

  const [loadEmployeeList, { loading, error }] = useLazyQuery(
    QUERY_EMPLOYEEDATABYPAGE,
    {
      fetchPolicy: "no-cache",
      onCompleted(responce) {
        setEmployeeData(responce.employeesDataPage.employeeList);
        setTotalEmployee(responce.employeesDataPage.totalEmployees);
        setSeatsLeft(responce.employeesDataPage.seatsLeft);
      },
      onError(error) {
        console.log("Employee List Error", error);
      },
    }
  );

  const handleRemoveEmployee = (index) => {
    settempIndex(index);
  };

  const closeModal = () => {
    settempIndex("");
    loadEmployeeList();
  };

  const handleAddEmployeeForm = () => {
    setshowAddEmployeeForm(true);
  };

  const closeAddEmployeeForm = () => {
    setshowAddEmployeeForm(false);
    loadEmployeeList();
  };

  const onSearch = (searchText) => {
    loadEmployeeList({
      variables: {
        search: searchText,
      },
    });
  };

  useEffect(() => {
    loadEmployeeList();
  }, [loadEmployeeList]);

  useEffect(() => {
    if (!showEmployeeWelcome) {
      localStorage.removeItem("shouldShowWelcome");
    }
  }, [showEmployeeWelcome]);

  if (loading)
    return (
      <div className="employee-container corporate-container">
        <h1>Loading..</h1>
      </div>
    );

  if (error)
    return (
      <div className="employee-container corporate-container">
        <h1>Something went wrong! Please try again.</h1>
      </div>
    );

  return (
    <div className="employee-container corporate-container">
      <h1>Members ({totalEmployee && totalEmployee})</h1>
      <div className="employee-wrapper">
        <div className="employee-wrapper-top">
          <input
            type="text"
            name="search"
            placeholder="Search for a member..."
            onKeyUp={(e) => onSearch(e.target.value)}
          />
          <SecondaryButton
            onClick={handleAddEmployeeForm}
            className="hand-cursor"
          >
            Add members
          </SecondaryButton>
        </div>
        <div className="employee-wrapper-bottom">
          <table className="employee_container">
            <tr className="employee_header">
              <th>Member</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
            {employeeData.length > 0 &&
              employeeData.map((res, index) => {
                return (
                  <tr className="employee_rows" key={index}>
                    <td>
                      {res.employee.userdetailObj.photo ? (
                        <img
                          className="temp-image"
                          src={res.employee.userdetailObj.photo}
                          alt=""
                        />
                      ) : (
                        <div className="employee_profile_pic">
                          {res.employee.userdetailObj.userObj.firstName
                            .charAt(0)
                            .toUpperCase() ||
                            res.employee.userdetailObj.userObj.email
                              .charAt(0)
                              .toUpperCase()}
                        </div>
                      )}
                    </td>
                    <td>
                      <h1>{res.employee.userdetailObj.userObj.firstName} </h1>
                    </td>
                    <td>
                      <h1>{res.employee.userdetailObj.userObj.lastName}</h1>
                    </td>
                    <td>
                      <h3>{res.employee.userdetailObj.userObj.email}</h3>
                    </td>
                    <td>
                      <h3
                        className={`employee_status_${res.status.toLowerCase()}`}
                      >
                        {res.status}
                      </h3>
                    </td>
                    <td className="employee_remove_btn">
                      {" "}
                      {res.employee.userdetailObj.role.find(
                        (role) => role.name === "COMPANY-ADMIN"
                      ) ? null : res.status.toUpperCase() ===
                        "INACTIVE" ? null : (
                        <img
                          src={employeeOptions}
                          onClick={() => handleRemoveEmployee(index)}
                          // title="Delete Employee"
                          className="hand-cursor"
                          alt="icon-delete"
                          id={`Popover${index}`}
                        />
                      )}
                      {tempIndex === index &&
                        res.status.toUpperCase() === "INVITE SENT" && (
                          <AddandRemove
                            userId={res.employee.userdetailObj.userObj.id}
                            userEmail={res.employee.userdetailObj.userObj.email}
                            employeeId={res.employee.id}
                            closeModal={closeModal}
                            key={index}
                            status={res.status.toUpperCase()}
                          />
                        )}
                    </td>
                  </tr>
                );
              })}
          </table>

          <p className="add_employee_para">
            You have {seatsLeft} available subscriptions with your plan.{" "}
            <span onClick={handleAddEmployeeForm} className="add_employee_span">
              Add members
            </span>{" "}
            to fill up the available subscriptions.
          </p>
        </div>
      </div>
      {showEmployeeWelcome && (
        <CAdminWelcomeModal
          setShowEmployeeWelcome={setShowEmployeeWelcome}
          setshowAddEmployeeForm={setshowAddEmployeeForm}
          showEmployeeWelcome={showEmployeeWelcome}
        />
      )}
      {showAddEmployeeForm && (
        <AddEmployee
          seatsLeft={seatsLeft}
          closeAddEmployeeForm={closeAddEmployeeForm}
        />
      )}
    </div>
  );
};
export default Employee;

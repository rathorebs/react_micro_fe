import { useLazyQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";

import { Row, Col } from "reactstrap";

import Card from "../../components/commons/Card";
import functions from "../../functions";
import { DASHBOARD_DOUGHNUT_BAR_GRAPH } from "./GraphQl";

import "./corporate.css";
import "./Dashboard.css";

const Dashboard = () => {
  const [lineChart, setLineChart] = useState({
    labels: [],
    data: [],
    dates: [],
    engagedEmployeeCount: 0,
    totalSessionAttendeeCount: 0,
  });

  const [setBarChart] = useState({
    labels: [],
    data: [],
    services: [],
    backgroundColor: [],
    borderColor: [],
  });

  const [setDoughnutChart] = useState({
    labels: [],
    data: [],
    backgroundColor: [],
    hoverBackgroundColor: [],
    totalEmployees: 0,
  });

  const [loadDoughnutBarGraphData] = useLazyQuery(
    DASHBOARD_DOUGHNUT_BAR_GRAPH,
    {
      fetchPolicy: "no-cache",
      onCompleted(responce) {
        setLineChart(responce?.corporateDashboard?.viewYourEngagement);
        setDoughnutChart(responce?.corporateDashboard?.employeesWellbeingPlans);
        let data = responce?.corporateDashboard?.sessionPerMonth.data;
        let labels = responce?.corporateDashboard?.sessionPerMonth.labels;
        let newLabels = [];
        labels.forEach((element, index) => {
          newLabels.push(element + "                " + data[index]);
        });
        let barChartData = responce?.corporateDashboard?.sessionPerMonth;
        barChartData["labels"] = newLabels;
        setBarChart(barChartData);
      },
      onError(error) {
        console.log(
          `Error while fectching the doughnut & bar graph data ${error}`
        );
      },
    }
  );

  const onChangeBasis = (value) => {
    loadDoughnutBarGraphData({
      variables: {
        basis: value,
      },
    });
  };

  useEffect(() => {
    loadDoughnutBarGraphData({
      variables: {
        basis: "Monthly",
      },
    });
  }, [loadDoughnutBarGraphData]);

  return (
    <div className="corporate-container">
      <div className="title">Learn from your data</div>
      <Row>
        <ViewYourEngagement
          lineChart={lineChart}
          onChangeBasis={onChangeBasis}
        />
      </Row>
    </div>
  );
};

const ViewYourEngagement = ({ onChangeBasis, lineChart }) => (
  <Col className="mb-4">
    <Card>
      <div className="d-flex flex-wrap align-items-center justify-content-between">
        <div className="f20 font-sofia-medium color-fiord mb-3">
          View Your Engagement
        </div>
        <div className="monthly-yearly-box position-relative mb-3">
          <select onChange={(e) => onChangeBasis(e.target.value)}>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
      </div>
      <div className="employee-status d-flex flex-wrap">
        <div className="active-employee mr-3  mb-3">
          <div className="d-flex align-items-start">
            <div className="circle-dot mr-2 bg-wedgewood"></div>
            <p className="mb-0">
              <span className="font-sofia-medium color-fiord f16 d-block mb-2">
                {lineChart.totalSessionAttendeeCount}
                &nbsp;
                {`Active ${functions.employeeToEmployees(
                  lineChart.totalSessionAttendeeCount
                )}`}
              </span>
              <span className="font-poppins color-bunting f14 d-block">
                Members registered on the platform
              </span>
            </p>
          </div>
        </div>
        <div className="engaged-employee  mb-3">
          <div className="d-flex align-items-start">
            <div className="circle-dot mr-2 bg-burnt"></div>
            <p className="mb-0">
              <span className="font-sofia-medium color-fiord f16 d-block mb-2">
                {lineChart.engagedEmployeeCount}
                &nbsp;
                {`Engaged ${functions.employeeToEmployees(
                  lineChart.engagedEmployeeCount
                )}`}
              </span>
              <span className="font-poppins color-bunting f14 d-block">
                Members engaged in at least one session
              </span>
            </p>
          </div>
        </div>
      </div>
    </Card>
  </Col>
);

/* const Dashboard = () => {
  return <div>Dashboard9</div>;
}; */
export default Dashboard;

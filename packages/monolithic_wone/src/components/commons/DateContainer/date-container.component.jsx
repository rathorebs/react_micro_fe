import React, { memo } from "react";
import moment from "moment";
import "./date-container.styles.scss";

const DateContainer = () => {
  const startdate = moment().clone().startOf("isoWeek");
  const enddate = moment().clone().endOf("isoWeek");
  const selectedDate = moment().clone().format("dddd D MMMM");
  const currentYear = moment().clone().startOf("isoWeek").format("YYYY");

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthNum = new Date();
  const currentMonth = month[currentMonthNum.getMonth()];

  const renderDates = (weekStart, weekEnd) => {
    let response = [];
    for (let m = weekStart; m.isBefore(weekEnd); m.add(1, "days")) {
      response.push(
        <div
          key={weekStart}
          className={`week-days ${
            selectedDate === m.clone().format("dddd D MMMM") ? "active" : ""
          }`}
        >
          <div className="day">{m.format("ddd")}</div>
          <div className="date">{m.format("DD")}</div>
        </div>
      );
    }
    return response;
  };

  return (
    <>
      <div className="calendar-month">
        <p>
          {currentMonth} {currentYear}
        </p>
      </div>

      <div className="week-days-container mb-5">
        {renderDates(startdate.clone(), enddate.clone())}
      </div>
    </>
  );
};

export default memo(DateContainer);

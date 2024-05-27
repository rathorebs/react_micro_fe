import React, { useState } from "react";
import { Button } from "reactstrap";
import moment from "moment";
import { gql, useQuery } from "@apollo/client";
import session_eclipse_img from "../../Assets/session-eclipse-img.png";

import functions from "../../functions";

import "../common/Schedule.css";

// const QUERY_GROUPSESSIONLISTTODAY = gql`
// query GroupSessionList($groupSessionFor: String!,$teacherDetailID:ID, $serviceID:ID, $classID:ID, $date:Date, $companyID:ID, $search:String, $limit:Int, $offset:Int){
//   groupSessionList(groupSessionFor:$groupSessionFor, teacherDetailID:$teacherDetailID, serviceID:$serviceID, classID:$classID, date:$date, companyID:$companyID, search:$search, limit:$limit, offset:$offset){
//     page
//     pages
//     totalRecord
//     hasNext
//     hasPrev
//     objects{
//       id
//       groupSessionFor
//       name
//       photo
//       description
//       day
//       duration
//       startDate
//       repeatWeekly
//       stopDate
//       startTime
//       endTime
//       service{
//         id
//         name
//       }
//       classObj{
//         id
//         name
//       }
//       classType{
//         name
//       }
//       preparationMaterial

//       corporateCompany {
//         id
//         name
//         photo
//       }
//       groupsessioninstanceSet{

//         groupsessionpeoplejoiningSet{
//           user{
//             firstName
//             lastName
//             userdetail{
//               photo
//             }
//           }
//         }
//       }

//     }
//   }
// }
// `;

const QUERY_GROUPSESSIONLISTTODAY = gql`
  query CorporateSessionsToday($today: Date) {
    corporateSessionsToday(today: $today) {
      id
      scheduledDate
      teacher {
        userdetailObj {
          userObj {
            firstName
            lastName
          }
        }
      }
      groupsessionpeoplejoiningSet {
        user {
          firstName
          lastName
          userdetail {
            photo
          }
        }
      }
      groupSession {
        name
        startTime
        endTime
        photo
        day
        classType {
          name
        }
      }
    }
  }
`;

const QUERY_GROUPSESSIONLISTMONTH = gql`
  query CorporateSessionsThisMonth {
    corporateSessionsThisMonth {
      id
      scheduledDate
      teacher {
        userdetailObj {
          photo
          userObj {
            firstName
            lastName
          }
        }
      }
      groupsessionpeoplejoiningSet {
        user {
          firstName
          lastName
          userdetail {
            photo
          }
        }
      }
      groupSession {
        name
        startTime
        endTime
        photo
        day
        classType {
          name
        }
      }
    }
  }
`;

const Schedule = (props) => {
  let count = 0;
  const [startdate] = useState(moment().clone().startOf("isoWeek"));
  const [enddate] = useState(moment().clone().endOf("isoWeek"));
  const [selectedDate] = useState(moment().clone());
  const [currentMonth] = useState(
    moment().clone().startOf("isoWeek").format("MMMM")
  );
  const [currentYear] = useState(
    moment().clone().startOf("isoWeek").format("YYYY")
  );
  const [isClicked, setisClicked] = useState(false);
  const [handleSessionCardClickData, sethandleSessionCardClickData] = useState(
    {}
  );
  const [thisMonthSession, setThisMonthSession] = useState([]);
  const [todaySession, setTodaySession] = useState([]);

  useQuery(QUERY_GROUPSESSIONLISTTODAY, {
    fetchPolicy: "no-cache",
    onCompleted(responce) {
      setTodaySession(responce.corporateSessionsToday);
    },
    onError(error) {
      console.log("Error QUERY_GROUPSESSIONLISTMONTH1", error);
    },
    variables: {
      date: functions.convert_Date_Local_To_UTC(
        selectedDate.format("YYYY-MM-DD")
      ),
    },
  });

  useQuery(QUERY_GROUPSESSIONLISTMONTH, {
    fetchPolicy: "no-cache",
    onCompleted(responce) {
      setThisMonthSession(responce.corporateSessionsThisMonth);
    },
    onError(error) {
      console.log("Error QUERY_GROUPSESSIONLISTMONTH", error);
    },
  });

  // const handleMonthChange = (e) => {
  //   let monthstartDate = moment([moment().year(), e.target.value]).startOf(
  //     "month"
  //   );
  //   setselectedDate(monthstartDate);
  //   setstartdate(monthstartDate.clone().startOf("isoWeek"));
  //   setenddate(monthstartDate.clone().endOf("isoWeek"));
  // };

  const renderDates = (weekStart, weekEnd) => {
    let response = [];
    for (let m = weekStart; m.isBefore(weekEnd); m.add(1, "days")) {
      response.push(
        <div
          className={
            selectedDate.format("dddd D MMMM") ===
            m.clone().format("dddd D MMMM")
              ? "teacher-week-days tactive"
              : "teacher-week-days"
          }
        >
          <div
            className={
              selectedDate.format("dddd D MMMM") ===
              m.clone().format("dddd D MMMM")
                ? "teacher-weekDayName tactive"
                : "teacher-weekDayName"
            }
          >
            {m.format("ddd")}
          </div>
          <div
            className={
              selectedDate.format("dddd D MMMM") ===
              m.clone().format("dddd D MMMM")
                ? "teacher-weekDate tactive"
                : "teacher-weekDate"
            }
          >
            {m.format("DD")}
          </div>
        </div>
      );
      //  onClick={handleSelectedDate.bind(this,m.clone())}
    }
    return response;
  };
  const handleSessionCardClick = (res, dayType) => {
    setisClicked(true);
    sethandleSessionCardClickData(res);
  };

  const renderSessionCard = (res, type) => {
    let displayTime = null;
    let displayTimeCss = null;

    if (type === "today") {
      displayTime =
        functions.time_convert_utc_to_local(
          res.scheduledDate,
          res.groupSession.startTime
        ) +
        " - " +
        functions.time_convert_utc_to_local(
          res.scheduledDate,
          res.groupSession.endTime
        );
      displayTimeCss = "today-tsession-time";
    } else {
      displayTime = functions.displayUTCToLocal(
        res.scheduledDate,
        res.groupSession.startTime,
        res.groupSession.endTime,
        "corporate_session_this_month"
      );
      displayTimeCss = "week-tsession-time";
    }

    return (
      <div className="today-tsession-container">
        <div className={displayTimeCss}>
          <img src={session_eclipse_img} alt="" />
          <p>{displayTime}</p>
        </div>
        <div
          className="tsession-detail"
          onClick={handleSessionCardClick.bind(this, res, "today")}
        >
          <img
            className="teacher-teacher-img"
            src={res.groupSession.photo}
            alt=""
          />
          <div className="teacher-teacher-text">
            <p className="tsession-serviceName three-dots">
              {res.groupSession.name}
            </p>
            <p className="tsession-teacherName">
              With{" "}
              {res.teacher === null
                ? "Anonymous"
                : res?.teacher?.userdetailObj?.userObj?.firstName +
                  " " +
                  res?.teacher?.userdetailObj?.userObj?.lastName}
              <p className="tsession-through text-success">
                {" "}
                · {res.groupSession.classType.name}
              </p>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const rigthSidePanel = (data) => {
    return (
      <div className="tsession-detail-feedback-right">
        <p className="tsession-detail-feedback-right-h1">Session details</p>
        <div className="tsession-detail-right">
          <img
            className="teacher-demo-image"
            src={data.groupSession.photo}
            alt=""
          />
          <h1>
            {data.groupSession.name} with{" "}
            {data.teacher === null
              ? "Anonymous"
              : data.teacher.userdetailObj.userObj.firstName +
                " " +
                data.teacher.userdetailObj.userObj.lastName}
          </h1>
          <div className="tsession-detail-right-time">
            {functions.displayUTCToLocal(
              data.scheduledDate,
              data.groupSession.startTime,
              data.groupSession.endTime,
              "right"
            )}
            &nbsp;|&nbsp;{data.groupSession.classType.name}
          </div>
          <Button className="contactSupport-btn">
            <a
              rel="noreferrer"
              target="_blank"
              href="mailto:support@walkingonearth.com"
            >
              Contact support
            </a>
          </Button>
        </div>
        {data.groupsessionpeoplejoiningSet.map((res) => {
          count++;
          return (
            <>
              <h2 className="people-joining-h2">People joining ({count})</h2>
              <div className="tsession-people-joining">
                <img
                  className="people-joining-image"
                  src={res.user.userdetail.photo}
                  alt=""
                />
              </div>
            </>
          );
        })}
      </div>
    );
  };

  return (
    <div className="tsession-container corporate-container">
      <div className="tsession-calendar">
        <div className="teacher-monthName">
          <p className="teacher-monthName-p">
            {currentMonth} {currentYear}
          </p>
        </div>
        <div className="teacher-week-days-container">
          {renderDates(startdate.clone(), enddate.clone())}
        </div>
        {/* Display Session Card Start */}
        <div className="tsessions">
          <div className="today-tsession">
            <h3>Today, {selectedDate.format("dddd Do MMMM")} </h3>
            {todaySession &&
              todaySession.map((res, index) => {
                return renderSessionCard(res, "today");
              })}
          </div>
          <div className="week-tsession">
            <h3>Session this month</h3>
            {thisMonthSession &&
              thisMonthSession.map((res) => {
                return renderSessionCard(res, "thisMonth");
              })}
          </div>
        </div>
        {/* Display Session Card End */}
      </div>

      {/* Display Right Side Panel Start */}
      {todaySession.length > 0 &&
        !isClicked &&
        todaySession.forEach((res, index) => {
          if (index === 0) {
            return rigthSidePanel(res);
          }
        })}
      {isClicked ? rigthSidePanel(handleSessionCardClickData) : ""}
      {/* Display Right Side Panel End */}
    </div>
  );
};

export default Schedule;

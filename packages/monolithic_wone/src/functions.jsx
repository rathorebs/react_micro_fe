import S3 from "aws-sdk/clients/s3";
import { toast } from "react-toastify";
import moment from "moment";


const functions = {
  uploadFile: (file, callaback) => {
    const contentType = file.type;
    const contentLength = file.size;

    const params = {
      Bucket: "wone-test",
      Key: file.name,
      Body: file,
      ACL: "public-read",
      ContentType: contentType,
      ContentLength: contentLength + 50000,
      Connection: "open",
    };

    //for upload progress
    bucket
      .upload(params)
      .on("httpUploadProgress", function (evt) {
        console.log(evt.loaded + " of " + evt.total + " Bytes");
        let percentage = Math.floor((evt.loaded / evt.total) * 100 + 0.5);
        console.log("percentage", percentage);
      })
      .send(function (err, data) {
        if (err) {
          toast.error(`There was an error uploading your file: ${err}`);
          callaback(null);
          return false;
        }
        callaback(data);
        return true;
      });
  },
  deleteFile: () => {},
  getStringFromArray: (array) => {
    return array.map((e) => e.name).join(", ");
  },
  capitalize: (s) => {
    if (typeof s !== "string") return "";
    let sToLowerCase = s.toLowerCase();
    return sToLowerCase.charAt(0).toUpperCase() + sToLowerCase.slice(1);
  },
  displayUTCToLocal: (scheduleDate, startTime, endTime, location) => {
    let localStartDateTime = moment
      .utc(`${scheduleDate} ${startTime}`)
      .toDate();
    let localEndDateTime = moment.utc(`${scheduleDate} ${endTime}`).toDate();

    let localDate = moment(localStartDateTime).format("ddd D");
    let localStartTime = moment(localStartDateTime).format("HH:mm");
    let localEndTime = moment(localEndDateTime).format("HH:mm");
    let finalDate = null;

    if (location === "left") {
      finalDate = localDate + " · " + localStartTime + " - " + localEndTime;
    } else if (location === "right") {
      localDate = moment(localStartDateTime).format("ddd D MMM");
      finalDate = localDate + ", " + localStartTime + " - " + localEndTime;
    } else if (location === "corporate_session_this_month") {
      localDate = moment(localStartDateTime).format("ddd D");
      finalDate = localDate + " · " + localStartTime + " - " + localEndTime;
    }
    return finalDate;
  },

  displayFullUTCToLocal: (scheduleStartDate, scheduleEndDate, location) => {
    let localStartDateTime = moment.utc(`${scheduleStartDate}`).toDate();
    let localEndDateTime = moment.utc(`${scheduleEndDate}`).toDate();

    let localDate = moment(localStartDateTime).format("ddd D MMM");
    let localStartTime = moment(localStartDateTime).format("hh:mm a");
    let localEndTime = moment(localEndDateTime).format("hh:mm a");
    let finalDate = null;

    if (location === "left") {
      finalDate = localDate + " · " + localStartTime + " - " + localEndTime;
    } else if (location === "right") {
      localDate = moment(localStartDateTime).format("ddd D MMM");
      finalDate = localDate + ", " + localStartTime + " - " + localEndTime;
    } else if (location === "corporate_session_this_month") {
      localDate = moment(localStartDateTime).format("ddd D");
      finalDate = localDate + " · " + localStartTime + " - " + localEndTime;
    } else if (location === "show day on left") {
      finalDate = "Today · " + localStartTime + " - " + localEndTime;
    } else {
      finalDate = localStartTime + " - " + localEndTime;
    }
    return finalDate;
  },

  time_convert_utc_to_local: (dateValue, timeValue) => {
    let dateTimeValue = moment.utc(`${dateValue} ${timeValue}`).toDate();
    return moment(dateTimeValue).format("hh:mm a");
  },
  full_time_convert_utc_to_local: (timeValue) => {
    let dateTimeValue = moment.utc(`${timeValue}`).toDate();
    return moment(dateTimeValue).format("hh:mm a");
  },
  full_day_convert_utc_to_local: (timeValue) => {
    return moment(timeValue).format("dddd Do MMMM");
  },
  full_date_convert_utc_to_local: (dateValue) => {
    let dateTimeValue = moment.utc(`${dateValue}`).toDate();
    return moment(dateTimeValue).format("hh:mm a");
  },
  full_date_convert_utc_to_local_dd_mm_yyyyy: (dateValue) => {
    let dateTimeValue = moment.utc(`${dateValue}`).toDate();
    return moment(dateTimeValue).format("DD/MM/YYYY");
  },
  calculateTimeDiff: (data, defaultTime = 6) => {
    let localDateTime = moment(new Date()).format("YYYY-MM-DD HH:mm");
    let scheduleDate = null;
    let startTime = null;
    let result = null;

    if (data.__typename === "ClassSessionType") {
      scheduleDate = data.scheduledDate;
      startTime = data.startTime;
    } else {
      scheduleDate = data.scheduledDate;
      startTime = data.groupSession.startTime;
    }

    let var4 = moment(`${scheduleDate} ${startTime}`).toDate();
    let localStartTime = moment(moment(var4).format("HH:mm"), "HH:mm");
    let before5MinuteTime1 = moment(
      moment(localStartTime, "HH:mm")
        .subtract(defaultTime, "minutes")
        .format("HH:mm"),
      "HH:mm"
    ).format("HH:mm");
    let var1 = moment.utc(`${scheduleDate} ${before5MinuteTime1}`).toDate();
    let var2 = moment(var1).format("YYYY-MM-DD HH:mm");
    let var3 = moment
      .utc(
        moment(var2, "YYYY-MM-DD hh:mm").diff(
          moment(localDateTime, "YYYY-MM-DD hh:mm")
        )
      )
      .format("HH:mm");
    var3 = var3.split(":");
    result = "Join session in " + var3[0] + " hrs & " + var3[1] + " mins";
    return result;
  },
  calculateTimeDiffTwo: (data, defaultTime = 6) => {
    let scheduleDate = moment(data.startDateTime).format("YYYY-MM-DD HH:mm");
    let result = null;

    if (data.__typename === "ClassSessionType") {
      scheduleDate = moment(data.startDateTime).format("YYYY-MM-DD HH:mm");
    } else {
      scheduleDate = moment(data.instanceStartDateTime).format(
        "YYYY-MM-DD HH:mm"
      );
    }

    let before5MinuteTime1 = moment(
      moment(scheduleDate).subtract(defaultTime, "minutes")
    ).format("YYYY-MM-DD HH:mm");

    const target = moment(before5MinuteTime1);
    const now = moment();
    const days = target.diff(now, "days");
    const hours = target.subtract(days, "days").diff(now, "hours");
    const minutes = target.subtract(hours, "hours").diff(now, "minutes");

    let daysPart = "";
    if (days && days === 1) {
      daysPart = `${days} day, `;
    } else if (days) {
      daysPart = `${days} days, `;
    }

    let hoursPart = "";
    if (hours && hours === 1) {
      hoursPart = `${hours} hr & `;
    } else if (hours) {
      hoursPart = `${hours} hrs & `;
    }

    let minsPart = "";
    if (minutes && minutes === 1) {
      minsPart = `${minutes} min`;
    } else {
      minsPart = `${minutes} mins`;
    }

    result = `Join session in ${daysPart}${hoursPart}${minsPart}`;

    let myButtonObject = {
      hrs: hours, //5
      mins: minutes, //36
      result,
    };
    return myButtonObject;
  },
  convert_Date_Local_To_UTC: (dateValue) => {
    return moment.utc(new Date(`${dateValue}`)).format("YYYY-MM-DD");
  },
  convert_Date_UTC_To_Local: (dateValue) => {
    let localStartDateTime = moment.utc(dateValue).toDate();
    return moment(localStartDateTime).format("YYYY-MM-DD");
  },
  employeeToEmployees: (val) => {
    if (Math.abs(parseInt(val)) === 1) {
      return "Member";
    }

    return "Members";
  },
  convertChannelName: (val) => {
    val = val.replace("-by-", " with ");
    var n = val.indexOf("-");
    val = val.substring(0, n !== -1 ? n : val.length);
    return val;
  },
  sortDateArray: (a, b) => {
    const aDate = moment
      .utc(`${a?.instanceStartDateTime || a?.startDateTime}`)
      .toDate();
    const bDate = moment
      .utc(`${b?.instanceStartDateTime || b?.startDateTime}`)
      .toDate();
    //console.log(aDate)
    var dateA = new Date(aDate).getTime();
    var dateB = new Date(bDate).getTime();
    return dateA > dateB ? 1 : -1;
  },
  clientTimeZone: () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  },
  getSessionDeadLine: (sessionStartTime, sessionEndTime, marginTime = 6) => {
    //marginTime 6 === 'student' and 15 === 'practitioner'
    const localDateTime = moment(
      moment(moment(new Date()).format("YYYY-MM-DD HH:mm")).format("HH:mm"),
      "HH:mm"
    );

    sessionStartTime = moment.utc(`${sessionStartTime}`).toDate();
    const localStartDateTime = moment(
      moment(sessionStartTime).format("HH:mm"),
      "HH:mm"
    );

    sessionEndTime = moment.utc(`${sessionEndTime}`).toDate();
    const localEndDateTime = moment(
      moment(sessionEndTime).format("HH:mm"),
      "HH:mm"
    );

    const beforeMarginTime = moment(
      moment(localStartDateTime, "HH:mm")
        .subtract(marginTime, "minutes")
        .format("HH:mm"),
      "HH:mm"
    );

    const REFERENCE = moment(new Date()); // fixed just for testing, use moment();
    const TODAY = REFERENCE.clone().startOf("day");
    var iscurrentDate = moment(sessionStartTime).isSame(TODAY, "d");

    let isBetween = false,
      isBefore = false,
      isAfter = false,
      isSame = false;

    if (iscurrentDate) {
      isBetween = localDateTime.isBetween(beforeMarginTime, localEndDateTime);
      isBefore = localDateTime.isBefore(beforeMarginTime);
      isAfter = localDateTime.isAfter(localEndDateTime);
      isSame = localDateTime.isSame(beforeMarginTime);
    } else {
      //check if date is passsed or previous day the set isAfter TRUE
      if (
        new Date(sessionStartTime).setHours(0, 0, 0, 0) <=
        new Date().setHours(0, 0, 0, 0)
      ) {
        isAfter = true;
      }
    }

    return { isBetween, isBefore, isAfter, isSame };
  },
  getClassSessionType: (classType) => {
    return classType === "ClassSessionType" ? "PRIVATE" : "GROUP";
  },
  checkIfYouAreATeacher: (data) => {
    const teacherId = localStorage.getItem("userID");
    return data?.teacher?.userdetailObj?.userObj.id === teacherId;
  },
  checkIsSessionRegOrNot: (data) => {
    const teacherId = localStorage.getItem("userID");
    return (
      data.isRegistered ||
      data?.groupsessionpeoplejoiningSet?.findIndex(
        (e) => e.user?.id === teacherId
      ) > -1
    );
  },
  getTeacherFirstName: (session, userType) => {
    let name = "Anonymous";
    if (!!session?.teacher) {
      if (userType === "teacher" && !functions.checkIfYouAreATeacher(session)) {
        name = `${
          session.student?.userdetailObj?.userObj.firstName ||
          session.teacher?.userdetailObj?.userObj.firstName
        }`;
      } else {
        name = `${session.teacher?.userdetailObj?.userObj.firstName}`;
      }
    }
    return name;
  },
  getTeacherFullName: (session, userType) => {
    let name = "Anonymous practitioner";
    if (!!session?.teacher) {
      if (userType === "teacher" && !functions.checkIfYouAreATeacher(session)) {
        name = `${
          session.student?.userdetailObj?.userObj.firstName ||
          session.teacher?.userdetailObj?.userObj.firstName
        } ${
          session.student?.userdetailObj?.userObj.lastName ||
          session.teacher?.userdetailObj?.userObj.lastName
        }`;
      } else {
        name = `${session.teacher?.userdetailObj?.userObj.firstName} ${session.teacher?.userdetailObj?.userObj.lastName}`;
      }
    }
    return name;
  },
};

export default functions;

import moment from "moment";
import constant from "../Constant";
const { REACT_APP_ENV } = process.env;

export const getGlobalInfoCookieName = () => {
  let name = "";
  if (REACT_APP_ENV === "prod") {
    name = "user";
  } else {
    name = `user-${REACT_APP_ENV}`;
  }
  return name;
};

export const deleteCookie = (name) => {
  var date = new Date();
  document.cookie =
    name +
    "=;expires=" +
    date.toGMTString() +
    ";domain=" +
    constant.APP_DOMAIN +
    ";path=/";
};

export const setGlobalInfoCookie = (global_data) => {
  const name = getGlobalInfoCookieName();
  deleteCookie(name);
  var cookieValue = JSON.stringify(global_data);
  var myDate = new Date();
  myDate.setMonth(myDate.getMonth() + 12);
  document.cookie =
    name +
    "=" +
    cookieValue +
    ";expires=" +
    myDate +
    ";domain=" +
    constant.APP_DOMAIN +
    ";path=/";
};

export const deleteGlobalInfoCookie = () => {
  const name = getGlobalInfoCookieName();
  deleteCookie(name);
};

export const clearStorage = () => {
  const keepMeSignIn = localStorage.getItem("keepMeSignInData");
  localStorage.clear();
  if (!!keepMeSignIn) {
    localStorage.setItem("keepMeSignInData", keepMeSignIn);
  }
  deleteGlobalInfoCookie();
};

export const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
};

export const validateEmail = (val) => {
  const emailRex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRex.test(val);
};

export const getDayType = (session) => {
  const isSameStartDate = moment
    .utc(session?.instanceStartDateTime || session?.startDateTime)
    .isSame(moment(), "day");
  return isSameStartDate ? "today" : "weekday";
};

export const toKebabCase = (text) => {
  return text?.replace(
    /[A-Z]/g,
    (match, offset) => (offset > 0 ? "-" : "") + match.toLowerCase()
  );
};

export const toPascalCase = (text) => {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
};

function clearAndUpper(text) {
  return text.replace(/-/, "").toUpperCase();
}

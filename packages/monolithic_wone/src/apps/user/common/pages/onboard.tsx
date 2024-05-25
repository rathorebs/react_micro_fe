import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import {
  Container,
  Row,
  Col,
  Progress,
  Label,
  FormGroup,
  Spinner,
} from "reactstrap";
import { useAuth } from "../../../../providers/auth";
import LogoutDialog from "components/Login/LogoutDialog";

import { Button } from "apps/user/common/components/button";
import {
  FirstName,
  LastName,
  Gender,
  Birthday,
} from "apps/user/common/components/fields/inputs";
import styles from "./sign-in.module.scss";

import WoneLogoBlack from "Assets/wone_logo.svg";
import BackArrow from "Assets/icon/backArrow.svg";
import defaultImage from "Assets/icon/profile-pic-default.svg";

import constant from "Constant";
import appInfo from "utility/app-info";

import { useMutation } from "@apollo/client";
import { CREATE_ONBOARDING } from "utility/graphQl/mutation";

import BluePattern from "apps/wone-generator/assets/patterns/blue.json";
import { usePatternBackground } from "providers/pattern-background";

export interface WelcomeProps {
  learnerIntro: any;
}
interface OnboardCardProps {
  titleHtml?: string;
  subtitleHtml?: string;
  progressValue?: number;
  children?: React.ReactNode;
}

interface OnboardingProps {
  actionPrevious?: boolean;
  actionNext?: any;
  actionSkip?: any;
  actionLogout?: any;
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  capturedData?: any;
  handleSubmit?: any;
  handleSkip?: any;
  data?: any;
}
interface OnboardProgressBar {
  size?: number;
  progress?: number;
  strokeWidth?: number;
  circleOneStroke?: string;
  circleTwoStroke?: string;
  progressStatus?: boolean;
  shadow?: any;
}

const OnboardingWrapper: React.FC<OnboardingProps> = ({
  actionPrevious,
  actionNext,
  actionSkip,
  actionLogout,
  loading,
  disabled,
  children,
  handleSubmit,
  handleSkip,
  data,
}) => {
  const { logout } = useAuth();
  const [logoutDialog, setLogoutDialog] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { onChangeColors } = usePatternBackground();

  useEffect(() => {
    onChangeColors(BluePattern.color.pattern.value);
  }, [onChangeColors]);

  const handleBackButton = () => {
    navigate(-1);
  };
  const handleLogout = () => {
    setLogoutDialog(true);
  };
  const closeLogoutDialog = () => {
    setLogoutDialog(false);
  };
  const closeAfterYes = () => {
    localStorage.removeItem("onboarding");
    logout();
    setLogoutDialog(false);
    window.location.href = constant?.WEBSITE_URL;
  };
  return (
    <>
      <div className={styles["onboard-container"]}>
        <Container>
          <div
            className={clsx(
              location.pathname === "/onboard/ready" &&
                styles["onboard-container-ready"],
              styles["onboard-container-inner"]
            )}
          >
            {data && (
              <div className={styles["onboard-header-container"]}>
                <img src={WoneLogoBlack} alt="Wone Logo" />

                <div className={styles["back-button"]}>
                  {actionPrevious && (
                    <img
                      src={BackArrow}
                      alt="Go to previous screen"
                      onClick={handleBackButton}
                    />
                  )}
                </div>
              </div>
            )}
            {children}
            {(actionNext || actionSkip) && (
              <div className={styles["action-container"]}>
                <div className={styles["primary-button-container"]}>
                  <Button
                    style={{
                      visibility: actionNext ? "visible" : "hidden",
                      height: 52,
                    }}
                    variant="primary"
                    type="submit"
                    className="w-100"
                    loading={loading}
                    disabled={disabled}
                    onClick={handleSubmit}
                  >
                    {actionNext}
                  </Button>

                  <Button
                    style={{
                      visibility: actionSkip ? "visible" : "hidden",
                      height: 50,
                    }}
                    variant="secondary"
                    type="submit"
                    className="w-100"
                    loading={loading}
                    disabled={!actionSkip || loading}
                    onClick={handleSkip}
                  >
                    {actionSkip}
                  </Button>
                </div>
              </div>
            )}
            <div className={styles["logout-button-container"]}>
              <Button
                style={{
                  visibility: actionLogout ? "visible" : "hidden",
                  height: 50,
                }}
                variant="secondary"
                type="submit"
                className={styles["btn-logout"]}
                loading={loading}
                disabled={!actionLogout || loading}
                onClick={handleLogout}
              >
                {actionLogout}
              </Button>
            </div>
          </div>
        </Container>
      </div>
      {logoutDialog && (
        <LogoutDialog
          closeLogoutDialog={closeLogoutDialog}
          closeAfterYes={closeAfterYes}
        />
      )}
    </>
  );
};

const Welcome: React.FC<WelcomeProps> = ({ learnerIntro }) => {
  return (
    <div className={styles["welcome-container"]}>
      <div className={styles["welcome-thumb"]}>
        {!learnerIntro?.imageUrl ? (
          <OnboardingLoader />
        ) : (
          <img src={learnerIntro?.imageUrl} alt="" />
        )}
      </div>
      <div className={styles["welcome-description"]}>
        <>
          <h4 dangerouslySetInnerHTML={{ __html: learnerIntro?.titleHtml }} />
          <p>{learnerIntro?.subtitleHtml}</p>
        </>
      </div>
    </div>
  );
};

export const QuestionTime = () => {
  const [timeList, setTimeList] = useState([]);
  const { learner, loading } = useAuth();
  const questionTimeData = learner?.onboarding?.inputs.find(
    (item) => item.id === "woneDayTimings"
  );
  const navigate = useNavigate();
  let data = localStorage.getItem("onboarding");
  const parsedData = JSON?.parse(data);

  useEffect(() => {
    if (parsedData && parsedData?.woneDayTimings) {
      const data = parsedData.woneDayTimings;
      setTimeList(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const capturedData = parsedData
    ? {
        ...parsedData,
        woneDayTimings: timeList,
      }
    : {
        woneDayTimings: timeList,
      };

  const handleSkip = () => {
    navigate("/onboard/profile");
  };

  const handleSubmit = () => {
    localStorage.setItem("onboarding", JSON.stringify(capturedData));
    navigate("/onboard/qdays");
  };

  const handleOnChange = (e) => {
    if (e.target.checked) {
      const items = e.target.value;
      setTimeList([...timeList, items]);
    } else {
      setTimeList((prev) => prev.filter((item) => item !== e.target.value));
    }
  };

  return (
    <OnboardingWrapper
      actionPrevious={true}
      actionNext={questionTimeData?.buttonText}
      actionSkip={questionTimeData?.skipButtonText}
      actionLogout={learner?.onboarding?.intro?.logoutButtonText}
      loading={loading}
      disabled={timeList.length <= 0}
      handleSubmit={handleSubmit}
      handleSkip={handleSkip}
      data={questionTimeData}
    >
      {!questionTimeData ? (
        <OnboardingLoader />
      ) : (
        <>
          <OnboardCard
            titleHtml={questionTimeData?.titleHtml}
            subtitleHtml={questionTimeData?.subtitleHtml}
            progressValue={16.66}
          >
            <Row>
              {questionTimeData?.input?.options?.map((item, index) => {
                return (
                  <Col md={6} key={index}>
                    <FormGroup className={styles["question-options"]} check>
                      <Label className={styles["label-option"]} check>
                        {item?.label}
                      </Label>
                      <input
                        type="checkbox"
                        value={item.value}
                        name={item.value}
                        className={styles["custom-input-checkbox"]}
                        onChange={(e) => handleOnChange(e)}
                        defaultChecked={parsedData?.woneDayTimings?.includes(
                          item.value
                        )}
                      />
                      <span className={styles["checkmark"]}></span>
                    </FormGroup>
                  </Col>
                );
              })}
            </Row>
          </OnboardCard>
        </>
      )}
    </OnboardingWrapper>
  );
};

export const QuestionDays = () => {
  const [daysList, setDaysList] = useState([]);
  const { learner, loading } = useAuth();
  const questionData = learner?.onboarding?.inputs.find(
    (item) => item.id === "woneDays"
  );
  const navigate = useNavigate();
  let data = localStorage.getItem("onboarding");
  const parsedData = JSON?.parse(data);

  useEffect(() => {
    if (parsedData && parsedData?.woneDays) {
      const data = parsedData?.woneDays;
      setDaysList(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const capturedData = parsedData
    ? {
        ...parsedData,
        woneDays: daysList,
      }
    : {
        woneDays: daysList,
      };

  const handleSkip = () => {
    navigate("/onboard/profile");
  };

  const handleSubmit = () => {
    localStorage.setItem("onboarding", JSON.stringify(capturedData));
    navigate("/onboard/qfrequency");
  };

  const handleOnChange = (e) => {
    if (e.target.checked) {
      const items = e.target.value;
      setDaysList([...daysList, items]);
    } else {
      setDaysList((prev) => prev.filter((item) => item !== e.target.value));
    }
  };

  return (
    <OnboardingWrapper
      actionPrevious={true}
      actionNext={questionData?.buttonText}
      actionSkip={questionData?.skipButtonText}
      actionLogout={learner?.onboarding?.intro?.logoutButtonText}
      loading={loading}
      disabled={daysList?.length <= 0}
      handleSubmit={handleSubmit}
      handleSkip={handleSkip}
      data={questionData}
    >
      {!questionData ? (
        <OnboardingLoader />
      ) : (
        <>
          <OnboardCard
            titleHtml={questionData?.titleHtml}
            subtitleHtml={questionData?.subtitleHtml}
            progressValue={32.66}
          >
            <Row>
              {questionData?.input?.options?.map((item, index) => {
                return (
                  <Col md={6} key={index}>
                    <FormGroup className={styles["question-options"]} check>
                      <Label className={styles["label-option"]} check>
                        {item?.label}
                      </Label>
                      <input
                        type="checkbox"
                        value={item?.value}
                        name={item?.value}
                        className={styles["custom-input-checkbox"]}
                        onChange={(e) => handleOnChange(e)}
                        defaultChecked={parsedData?.woneDays?.includes(
                          item?.value
                        )}
                      />
                      <span className={styles["checkmark"]}></span>
                    </FormGroup>
                  </Col>
                );
              })}
            </Row>
          </OnboardCard>
        </>
      )}
    </OnboardingWrapper>
  );
};

export const QuestionFrequency = () => {
  const [frequencyData, setFrequencyData] = useState("");
  const { learner, loading } = useAuth();
  const questionFrequencyData = learner?.onboarding?.inputs.find(
    (item) => item.id === "stressFrequency"
  );
  const navigate = useNavigate();
  let data = localStorage.getItem("onboarding");
  const parsedData = JSON?.parse(data);

  useEffect(() => {
    if (parsedData && parsedData?.stressFrequency) {
      const data = parsedData?.stressFrequency;
      setFrequencyData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const capturedData = parsedData
    ? {
        ...parsedData,
        stressFrequency: frequencyData,
      }
    : {
        stressFrequency: frequencyData,
      };
  const handleSkip = () => {
    navigate("/onboard/profile");
  };

  const handleSubmit = () => {
    localStorage.setItem("onboarding", JSON.stringify(capturedData));
    navigate("/onboard/profile");
  };

  const handleOnChange = (e) => {
    setFrequencyData(e.target.value);
  };

  return (
    <OnboardingWrapper
      actionPrevious={true}
      actionNext={questionFrequencyData?.buttonText}
      actionSkip={questionFrequencyData?.skipButtonText}
      actionLogout={learner?.onboarding?.intro?.logoutButtonText}
      loading={loading}
      disabled={frequencyData?.length <= 0}
      handleSubmit={handleSubmit}
      handleSkip={handleSkip}
      data={questionFrequencyData}
    >
      {!questionFrequencyData ? (
        <OnboardingLoader />
      ) : (
        <>
          <OnboardCard
            titleHtml={questionFrequencyData?.titleHtml}
            subtitleHtml={questionFrequencyData?.subtitleHtml}
            progressValue={48.99}
          >
            <Row>
              {questionFrequencyData?.input?.options?.map((item, index) => {
                return (
                  <Col md={6} key={index}>
                    <FormGroup className={styles["question-options"]} check>
                      <Label className={styles["label-option"]} check>
                        {item?.label}
                      </Label>
                      <input
                        type="radio"
                        value={item?.value}
                        name="Question Hours"
                        className={styles["custom-input-radio"]}
                        onChange={(e) => handleOnChange(e)}
                        defaultChecked={
                          parsedData?.stressFrequency === item?.value
                        }
                      />
                      <span className={styles["checkmark"]}></span>
                    </FormGroup>
                  </Col>
                );
              })}
            </Row>
          </OnboardCard>
        </>
      )}
    </OnboardingWrapper>
  );
};

export const Profile = () => {
  const { learner, loading } = useAuth();
  const profileData = learner?.onboarding?.inputs.find(
    (item) => item.id === "woneProfile"
  );

  const [image, setImage] = useState(defaultImage);
  const [selectedFiles, setSelectedFile] = useState(null);
  const [imageHash, setImageHash] = useState(Date.now());
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [selectGender, setSelectGender] = useState<string>("");
  const [birthdayDate, setBirthdayDate] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const imageChange = (e) => {
    let imageObj = e.target.files[0];
    if (imageObj) {
      if (imageObj.size > 2001094) {
        alert("Maximum 2 MB image size is allowed");
        return false;
      } else {
        setSelectedFile(imageObj);
      }
    }
  };
  let data = localStorage.getItem("onboarding");
  const parsedData = JSON?.parse(data);

  useEffect(() => {
    if (
      parsedData &&
      parsedData?.firstName &&
      parsedData?.lastName &&
      parsedData?.gender &&
      parsedData?.birthday
    ) {
      setFirstName(parsedData?.firstName);
      setLastName(parsedData?.lastName);
      setSelectGender(parsedData?.gender);
      setBirthdayDate(parsedData?.birthday);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const capturedData = parsedData
    ? {
        ...parsedData,
        firstName: firstName,
        lastName: lastName,
        gender: selectGender,
        birthday: birthdayDate,
      }
    : {
        firstName: firstName,
        lastName: lastName,
        gender: selectGender,
        birthday: birthdayDate,
      };

  const handleSkip = () => {
    navigate("/onboard/profile");
  };

  const requiredCheck = (id) => {
    const result = profileData?.inputs.find((item) => item.id === id);
    return result;
  };

  const handleSubmit = () => {
    if (firstName.length <= 0 && requiredCheck("firstName").required) {
      setErrorMessage(
        `Please enter your ${requiredCheck("firstName").label} to proceed`
      );
    } else if (lastName.length <= 0 && requiredCheck("lastName").required) {
      setErrorMessage(
        `Please enter your ${requiredCheck("lastName")?.label} to proceed`
      );
    } else if (selectGender.length <= 0 && requiredCheck("gender").required) {
      setErrorMessage(
        `Please enter your ${requiredCheck("gender")?.label} to proceed`
      );
    } else if (birthdayDate.length <= 0 && requiredCheck("birthday").required) {
      setErrorMessage(
        `Please enter your ${requiredCheck("gender")?.label} to proceed`
      );
    } else {
      localStorage.setItem("onboarding", JSON.stringify(capturedData));
      navigate("/onboard/calendar-invites");
    }
  };

  useEffect(() => {
    handleUploadProfilePic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFiles]);

  const handleUploadProfilePic = async () => {
    if (selectedFiles) {
      let formData = new FormData();
      formData.append("image", selectedFiles);
      formData.append("roleName", "STUDENT");
      let userId = localStorage.getItem("userID");
      let url = `${constant.FILE_UPLOAD_URL}upload_user_image/${userId}`;
      await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((response) => {
          setImage(response?.image_url);
          setImageHash(Date.now());
        })
        .catch((error) => {
          console.log(`Error while uploading ${selectedFiles.name} ${error}`);
        });
    }
  };

  return (
    <OnboardingWrapper
      actionPrevious={true}
      actionNext={profileData?.buttonText}
      actionSkip={profileData?.skipButtonText}
      actionLogout={null}
      loading={loading}
      handleSubmit={handleSubmit}
      handleSkip={handleSkip}
      data={profileData}
    >
      {!profileData ? (
        <OnboardingLoader />
      ) : (
        <>
          <OnboardCard
            titleHtml={profileData?.titleHtml}
            subtitleHtml={profileData?.subtitleHtml}
            progressValue={65.32}
          >
            <div className={styles["onboard-profile"]}>
              <div className={styles["onboard-profile-photo"]}>
                {image !== defaultImage ? (
                  <img
                    src={`${image}?${imageHash}`}
                    className={styles["profile-photo"]}
                    alt="Profile Pic"
                  />
                ) : (
                  <DefaultSvgImg />
                )}
                <input
                  type="file"
                  value=""
                  accept="image/*"
                  title="Click to upload a profile image"
                  onChange={(e) => imageChange(e)}
                />
                {image === defaultImage && (
                  <p>{requiredCheck("upload_profile_image")?.label}</p>
                )}
              </div>
              <div className={styles["onboard-profile-inputs"]}>
                <FirstName
                  data={requiredCheck("firstName")}
                  firstName={firstName}
                  setFirstName={setFirstName}
                  showIcon={true}
                  markRequired={true}
                />
                <LastName
                  data={requiredCheck("lastName")}
                  lastName={lastName}
                  setLastName={setLastName}
                />
                <Gender
                  data={requiredCheck("gender")}
                  setSelectGender={setSelectGender}
                  selectGender={selectGender}
                  showIcon={true}
                  showLabel={false}
                  markRequired={false}
                  floating={false}
                />
                <Birthday
                  data={requiredCheck("birthday")}
                  birthdayDate={birthdayDate}
                  setBirthdayDate={setBirthdayDate}
                />
                {errorMessage && (
                  <p className={styles["error-message"]}>{errorMessage}</p>
                )}
              </div>
            </div>
          </OnboardCard>
        </>
      )}
    </OnboardingWrapper>
  );
};

export const CalendarInvites = () => {
  const navigate = useNavigate();
  const { learner, loading } = useAuth();
  const [createOnboarding, { loading: onboardLoading, error }] =
    useMutation(CREATE_ONBOARDING);

  const calendarData = learner?.onboarding?.inputs.find(
    (item) => item.id === "calendarPermission"
  );
  const calenderRef = useRef<boolean>(true);
  let userData = localStorage.getItem("onboarding");
  const parsedData = JSON?.parse(userData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.innerText === "YES") {
      if (calendarData?.input?.reverseLogic) {
        calenderRef.current = false;
        const capturedData = {
          ...parsedData,
          calendarPermission: false,
        };
        localStorage.setItem("onboarding", JSON.stringify(capturedData));
      } else {
        calenderRef.current = true;
        const capturedData = {
          ...parsedData,
          calendarPermission: true,
        };
        localStorage.setItem("onboarding", JSON.stringify(capturedData));
      }
    } else {
      if (calendarData?.input?.reverseLogic) {
        calenderRef.current = true;
        const capturedData = {
          ...parsedData,
          calendarPermission: true,
        };
        localStorage.setItem("onboarding", JSON.stringify(capturedData));
      } else {
        calenderRef.current = false;
        const capturedData = {
          ...parsedData,
          calendarPermission: false,
        };
        localStorage.setItem("onboarding", JSON.stringify(capturedData));
      }
    }
    onCreateOnboarding();
  };

  const onCreateOnboarding = () => {
    return createOnboarding({
      variables: {
        input: {
          firstName: parsedData?.firstName,
          lastName: parsedData?.lastName,
          gender: parsedData?.gender,
          birthday: parsedData?.birthday,
          woneDays: parsedData?.woneDays,
          woneDayTimings: parsedData?.woneDayTimings,
          stressFrequency: parsedData?.stressFrequency,
          calendarPermission: calenderRef?.current,
        },
        appInfo,
      },
    })
      .then((response) => {
        //localStorage.removeItem("shouldOnboard");
        localStorage.removeItem("onboarding");
        localStorage.setItem("onboardPreparing", "true");
        navigate("/onboard/preparing", { state: response });
      })
      .catch((error) => console.log("createOnboarding error:", error));
  };

  const handleSkip = (e) => {
    e.preventDefault();
    if (calendarData?.input?.reverseLogic) {
      calenderRef.current = true;
      const capturedData = {
        ...parsedData,
        calendarPermission: true,
      };
      localStorage.setItem("onboarding", JSON.stringify(capturedData));
    } else {
      calenderRef.current = false;
      const capturedData = {
        ...parsedData,
        calendarPermission: false,
      };
      localStorage.setItem("onboarding", JSON.stringify(capturedData));
    }
    onCreateOnboarding();
  };
  if (onboardLoading) {
    return (
      <div className={styles["onboard-container"]}>
        <Container>
          <Row>
            <Col>
              <div className={styles["onboard-container-inner"]}>
                <div className={styles["onboard-header-container"]}>
                  <img src={WoneLogoBlack} alt="Wone Logo" />
                </div>
                <div className={styles["card-same-height"]}>
                  <div className={styles["onboard-card-container"]}>
                    <div className={styles["spinner-container"]}>
                      <div
                        className={clsx("spinner-border", styles["spinner"])}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  if (error) {
    const handleReset = () => {
      window.history.go(0);
    };
    return (
      <div className={styles["onboard-container"]}>
        <Container>
          <Row>
            <Col>
              <div className={styles["onboard-container-inner"]}>
                <div className={styles["onboard-header-container"]}>
                  <img src={WoneLogoBlack} alt="Wone Logo" />
                </div>
                <div className={styles["card-same-height"]}>
                  <div className={styles["onboard-card-container"]}>
                    <p>Something went wrong. Please try again.</p>
                  </div>
                </div>
                {error && (
                  <div className={styles["action-container"]}>
                    {!!error && (
                      <Button
                        variant="secondary"
                        type="submit"
                        className={styles["btn-logout"]}
                        loading={loading}
                        disabled={loading}
                        onClick={handleReset}
                      >
                        Reset
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  return (
    <OnboardingWrapper
      actionPrevious={true}
      actionNext={calendarData?.buttonText}
      actionSkip={calendarData?.skipButtonText}
      actionLogout={null}
      loading={loading}
      handleSkip={handleSkip}
      data={calendarData}
    >
      {!calendarData ? (
        <OnboardingLoader />
      ) : (
        <>
          <OnboardCard
            titleHtml={calendarData?.titleHtml}
            subtitleHtml={calendarData?.subtitleHtml}
            progressValue={81.65}
          >
            <div className={styles["calendar-invites"]}>
              <Button
                variant="primary"
                type="submit"
                className=""
                loading={loading}
                disabled={loading}
                onClick={handleSubmit}
              >
                YES
              </Button>

              <Button
                variant="primary"
                type="submit"
                className=""
                loading={loading}
                disabled={loading}
                onClick={handleSubmit}
              >
                NO
              </Button>
            </div>
          </OnboardCard>
        </>
      )}
    </OnboardingWrapper>
  );
};

export const Preparing = () => {
  const { learner, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState<number>(0);
  const [progressText, setProgressText] = useState<string>("");
  const [getReady, setGetReady] = useState<boolean>(false);
  const onboardPreparing = localStorage.getItem("onboardPreparing");
  useEffect(() => {
    if (
      !loading &&
      learner?.onboarding?.animation[0]?.percentageEnd !== undefined
    ) {
      window.onpopstate = () => {
        localStorage.removeItem("shouldOnboard");
        navigate("/user/woneindex");
      };
      setProgress(learner?.onboarding?.animation[0]?.percentageEnd);
      setProgressText(learner?.onboarding?.animation[0]?.textHtml);
      setTimeout(() => {
        setProgress(learner?.onboarding?.animation[1]?.percentageEnd);
        setProgressText(learner?.onboarding?.animation[1]?.textHtml);
        setGetReady(true);
      }, learner?.onboarding?.animation[0].transitionDurationSec * 1000);
    }
  }, [loading, learner?.onboarding?.animation, navigate]);
  if (getReady) {
    setTimeout(() => {
      navigate("/onboard/ready", { state: location });
    }, learner?.onboarding?.animation[1].transitionDurationSec * 1000);
  }
  if (!onboardPreparing) {
    return navigate("/onboard");
  }
  return (
    <OnboardingWrapper
      actionNext={null}
      data={learner?.onboarding?.animation[0]}
    >
      {!learner?.onboarding?.animation[0] ? (
        <OnboardingLoader />
      ) : (
        <>
          <div className={styles["onboarding-preparation"]}>
            <div className={styles["pb-container"]}>
              {
                <ProgressCircularBar
                  progress={progress}
                  size={195}
                  strokeWidth={6}
                  circleOneStroke="#ffffff"
                  circleTwoStroke="#000000"
                  progressStatus={true}
                />
              }
            </div>
            <div className={styles["onboarding-thanks-message"]}>
              <h1 dangerouslySetInnerHTML={{ __html: progressText }} />
            </div>
          </div>
        </>
      )}
    </OnboardingWrapper>
  );
};
export const Ready = () => {
  const { learner } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const onboardingReadyData = location?.state?.state?.data?.learnerOnboarding;
  const onboardPreparing = localStorage.getItem("onboardPreparing");

  const handleSubmit = () => {
    localStorage.removeItem("shouldOnboard");
    localStorage.removeItem("onboardPreparing");
    navigate("/user/woneindex");
  };

  useEffect(() => {
    if (onboardPreparing) {
      localStorage.removeItem("shouldOnboard");
      localStorage.removeItem("onboardPreparing");
    }
  }, [onboardPreparing]);
  if (!onboardPreparing) {
    return navigate("/onboard");
  }
  return (
    <OnboardingWrapper
      actionNext={onboardingReadyData?.welcomeScreen?.buttonText}
      handleSubmit={handleSubmit}
      actionLogout={learner?.onboarding?.intro?.logoutButtonText}
      data={onboardingReadyData}
    >
      <div className={styles["onboarding-ready"]}>
        <div className={styles["svg-wrapper"]}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              transform="translate(1 1)"
              stroke="#212121"
              strokeWidth=".75"
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m14 6-6.875 7L4 9.818" />
            </g>
          </svg>
        </div>

        <div className={styles["onboarding-ready-welcome"]}>
          {
            <h1
              dangerouslySetInnerHTML={{
                __html: onboardingReadyData?.welcomeScreen?.titleHtml,
              }}
            />
          }
          {
            <h6
              dangerouslySetInnerHTML={{
                __html: onboardingReadyData?.welcomeScreen?.subtitleHtml,
              }}
            />
          }
        </div>
      </div>
    </OnboardingWrapper>
  );
};
export const ProgressCircularBar: React.FC<OnboardProgressBar> = ({
  size,
  progress,
  strokeWidth,
  circleOneStroke,
  circleTwoStroke,
  progressStatus,
  shadow,
}) => {
  const circleRef = useRef(null);

  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    if (progress <= 100) {
      const progressOffset = ((100 - progress) / 100) * circumference;
      setOffset(progressOffset);
    }

    circleRef.current.style = "transition: stroke-dashoffset 850ms ease-in-out";
  }, [setOffset, progress, circumference, offset]);

  return (
    <div className={styles["progress-circular-bar"]}>
      <svg
        className={styles["svg"]}
        width={size}
        height={size}
        viewBox={shadow ? "-3 -6 130 130" : null}
      >
        <filter id="dropshadow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          <feOffset dx="2" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <circle
          className={styles["svg-circle-bg"]}
          stroke={circleOneStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth="6"
        />
        <circle
          transform={`rotate(-90, ${center},${center})`}
          className={styles["svg-circle"]}
          ref={circleRef}
          stroke={circleTwoStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          filter={shadow ? "url(#dropshadow)" : null}
        />
      </svg>
      <text
        textAnchor="middle"
        x={`${center}`}
        y={`${center + 10}`}
        className={styles["svg-circle-text"]}
      >
        {progressStatus ? `${progress}` : null}
      </text>
    </div>
  );
};

const OnboardCard: React.FC<OnboardCardProps> = ({
  titleHtml,
  subtitleHtml,
  progressValue,
  children,
}) => {
  return (
    <div className={styles["card-same-height"]}>
      <div className={styles["onboard-card-container"]}>
        <Progress
          className={styles["progress-bar"]}
          value={progressValue}
          barClassName={styles["custom-progress"]}
        />
        <h1
          className={styles["onboard-title"]}
          dangerouslySetInnerHTML={{ __html: titleHtml }}
        />
        {!!subtitleHtml && (
          <p
            className={styles["onboard-sub-title"]}
            dangerouslySetInnerHTML={{ __html: subtitleHtml }}
          />
        )}
        <div className={styles["onboard-children"]}>{children}</div>
      </div>
    </div>
  );
};

export const OnboardingLoader: React.FC = () => {
  return <Spinner animation="border" role="status" />;
};

export const DefaultSvgImg: React.FC = () => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(.25 .4)" fill="none" fillRule="evenodd">
        <path d="M0 0h24v24H0z" />
        <path
          d="M21 13v4a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h4"
          stroke="#323232"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m3 13.001 1.295-1.295a2.411 2.411 0 0 1 3.41 0h0L12 16.001M7.004 21l6.294-6.294a2.411 2.411 0 0 1 3.41 0l3.939 3.94"
          stroke="#323232"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          stroke="#323232"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          cx="18"
          cy="6"
          r="4"
        />
        <path
          stroke="#323232"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.75 6.375 18 5.125l1.25 1.25"
        />
      </g>
    </svg>
  );
};
const Onboard: React.FC = () => {
  const { learner, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/onboard/qtimes");
  };

  const handleSkip = () => {
    navigate("/onboard/profile");
  };

  return (
    <OnboardingWrapper
      actionPrevious={false}
      actionNext={learner?.onboarding?.intro?.buttonText}
      actionSkip={learner?.onboarding?.intro?.skipButtonText}
      actionLogout={learner?.onboarding?.intro?.logoutButtonText}
      loading={loading}
      handleSubmit={handleSubmit}
      handleSkip={handleSkip}
      data={learner?.onboarding}
    >
      {!learner?.onboarding?.intro ? (
        <OnboardingLoader />
      ) : (
        <Welcome learnerIntro={learner?.onboarding?.intro} />
      )}
    </OnboardingWrapper>
  );
};

export default Onboard;

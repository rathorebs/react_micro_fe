import React, { useEffect, useState, useRef } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button } from "reactstrap";

import { logAnalyticsEvent } from "../../utility/FirebaseAnalytics";
import Page from "../Page";
import { useAuth } from "../../providers/auth";

import { PILLAR_LIST } from "../../utility/graphQl/query";

import ProgressCircularBar from "../../components/commons/ProgressCircularBar";

import GrahamImage from "../../Assets/images/onboarding/graham.jpg";
import WelcomeImage from "../../Assets/images/onboarding/welcome-image.png";
import UserDetailsImage from "../../Assets/images/onboarding/user-details.png";
import PillarImage from "../../Assets/images/onboarding/pillar.png";
import PillarChoiceEnergy from "../../Assets/images/onboarding/pillar-choice-energy.png";
import PillarChoiceResilience from "../../Assets/images/onboarding/pillar-choice-resilience.png";
import PillarChoiceActivity from "../../Assets/images/onboarding/pillar-choice-activity.png";
import HoursImage from "../../Assets/images/onboarding/hours.jpg";
import InjuriesImage from "../../Assets/images/onboarding/injuries.png";
import CalendarImage from "../../Assets/images/onboarding/calendar_invites.svg";
import CheckCircleIcon from "../../Assets/icon/check-circle.svg";

import "../common/styles.scss";

const BackgroundWrapper = ({ children }) => {
  return (
    <div className="Onboarding-Container">
      <div className="Onboarding-Wrapper">
        <div className="container">{children}</div>
      </div>
    </div>
  );
};

const StepperProgress = ({ step, maxStep, hide, ...rest }) => {
  const progressPercent = `${(step / maxStep) * 100}%`;
  const visibility = hide ? "hidden" : "";

  return (
    <div className="StepperProgress" style={{ visibility }} {...rest}>
      <div
        className="StepperProgress-done"
        style={{
          opacity: 1,
          width: progressPercent,
        }}
      ></div>
    </div>
  );
};

const Welcome = (props) => {
  return (
    <div className="Welcome">
      <div className="HeadImage">
        <img className="WelcomeImage" src={WelcomeImage} alt="" />
        <img className="PersonalCoachImage" src={GrahamImage} alt="" />
      </div>
      <h1>Welcome!</h1>
      <p className="InfoMessage">
        Hi! My name is Graham and I’m your personal coach. I’m going to design a
        holistic health programme based on your preferences, health needs and
        lifestyle. Let me first ask you some questions to customise your
        experience!
      </p>
      <Button onClick={props.onNext}>Sure, thanks</Button>
    </div>
  );
};

const UserDetails = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onData({
      firstName: event.target.firstName.value.trim(),
      lastName: event.target.lastName.value.trim(),
    });
    props.onNext();
  };

  const handleChange = (event) => {
    props.onData({
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form
      className="UserDetails"
      onSubmit={handleSubmit}
      onChange={handleChange}
    >
      <img height="194" src={UserDetailsImage} alt="" />
      <h1>What’s your name?</h1>
      <input
        required
        type="text"
        name="firstName"
        placeholder="First name"
        pattern=".*\S+.*"
        title="This field is required."
        defaultValue={props.data.firstName}
      />
      <input
        required
        type="text"
        name="lastName"
        placeholder="Last name"
        pattern=".*\S+.*"
        title="This field is required."
        defaultValue={props.data.lastName}
      />
      <Button type="submit">Next</Button>
    </form>
  );
};

const Pillar = ({ pillarList, onData, onNext }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onData({ pillarName: event.target.value });
    onNext();
  };

  const options = pillarList?.map((pillar) => {
    let imgSrc = PillarChoiceEnergy;
    if (pillar.name === "Energy") {
      imgSrc = PillarChoiceEnergy;
    } else if (pillar.name === "Resilience") {
      imgSrc = PillarChoiceResilience;
    } else if (pillar.name === "Activity") {
      imgSrc = PillarChoiceActivity;
    }

    return {
      value: pillar.name,
      name: pillar.name,
      description: pillar.description,
      imgSrc,
    };
  });

  return (
    <form className="Pillar" onChange={handleSubmit}>
      <img height="126" src={PillarImage} alt="" />
      <h1>What brings you here?</h1>
      <p>
        Choose one option to get started. Later, you’ll get a breakdown of all 3
        areas.
      </p>
      <ul className="row">
        <div className="col-12 pl-3 pr-3">
          {options == null && "Loading..."}
          {options != null &&
            options.map((option) => (
              <li key={option.value}>
                <input
                  type="radio"
                  id={`pillarChoice${option.value}`}
                  name="pillarName"
                  value={option.value}
                />
                <label htmlFor={`pillarChoice${option.value}`}>
                  <div>
                    <h2>{option.name}</h2>
                    <p>{option.description}</p>
                  </div>
                  <img
                    height="70"
                    src={option.imgSrc}
                    alt={`${option.name} pillar`}
                  />
                </label>
              </li>
            ))}
        </div>
      </ul>
    </form>
  );
};

const Hours = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onData({ wellbeingHours: event.target.wellbeingHours.value });
    props.onNext();
  };

  const handleChange = (event) => {
    props.onData({
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form className="Hours" onSubmit={handleSubmit} onChange={handleChange}>
      <img height="119" src={HoursImage} alt="" />
      <h1>How many hours per week do you want to spend on your wellbeing?</h1>
      <p>
        We recommend starting with at least 2 hours so you can drive behaviour
        change.
      </p>
      <select name="wellbeingHours" defaultValue={props.data.wellbeingHours}>
        <option value={1}>1 hour</option>
        <option value={2}>2 hours</option>
        <option value={3}>3 hours</option>
        <option value={4}>4 hours</option>
        <option value={5}>5 hours</option>
        <option value={6}>6 hours</option>
        <option value={7}>7 hours</option>
        <option value={8}>8 hours</option>
        <option value={9}>9 hours</option>
        <option value={10}>10 hours</option>
      </select>
      <Button type="submit">Next</Button>
      <Button type="button" onClick={props.onNext}>
        Skip for now
      </Button>
    </form>
  );
};

const Injuries = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onData({ injuries: event.target.injuries.value });
    props.onNext();
  };

  const handleChange = (event) => {
    props.onData({
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form className="Injuries" onSubmit={handleSubmit} onChange={handleChange}>
      <img height="119" src={InjuriesImage} alt="" />
      <h1>Do you have any injuries or health conditions?</h1>
      <p>
        Tell us about you so our practitioners can provide the support you need.
        This information will not be shared with your Company.
      </p>
      <textarea
        required
        name="injuries"
        placeholder="Write here..."
        defaultValue={props.data.injuries}
      />
      <Button type="submit">Next</Button>
      <Button type="button" onClick={props.onNext}>
        Skip for now
      </Button>
    </form>
  );
};

const CalendarInvites = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.nativeEvent.submitter.value === "true") {
      props.onData({
        isPermissionToSendCalendarInvites: true,
      });
    } else {
      props.onData({
        isPermissionToSendCalendarInvites: false,
      });
    }
    props.onCreateOnboarding();
  };

  return (
    <form className="calendar-invites" onSubmit={handleSubmit}>
      <img height="119" src={CalendarImage} alt="" />
      <h1>Can we send you calendar invites?</h1>
      <p>
        Our live sessions will appear in your calendar so you can bock out time
        in your day to focus on you.
      </p>

      <Button type="submit" name="CalendarInvites" value={true}>
        Yes
      </Button>
      <Button type="submit" name="CalendarInvites" value={false}>
        No
      </Button>
    </form>
  );
};

const progress = [10, 30, 60, 75, 100];

const Preparing = ({ onReady }) => {
  const [progressIndex, setProgressIndex] = useState(0);

  useEffect(() => {
    const nextProgressIndex = progressIndex + 1;
    const timeout = 2500;

    if (nextProgressIndex < progress.length) {
      setTimeout(() => setProgressIndex(nextProgressIndex), timeout);
    } else {
      setTimeout(() => onReady(), timeout);
    }
  }, [progressIndex, onReady]);

  const percentage = progress[progressIndex];

  return (
    <div className="Preparing">
      <div className="HeadImage">
        <img className="WelcomeImage" src={WelcomeImage} alt="" />
        <img className="PersonalCoachImage" src={GrahamImage} alt="" />
      </div>
      <h1>Preparing your custom plan...</h1>
      <ProgressCircularBar
        progress={percentage}
        size={120}
        strokeWidth={8}
        circleOneStroke="#ffffff"
        circleTwoStroke="#5582a7"
        progressStatus={true}
      />
      <p className="one">Pause.</p>
      <p className="two">Take a deep breath.</p>
      <p className="three">Look around you.</p>
      <p className="four">What are you grateful for today?</p>
    </div>
  );
};

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleReset = () => {
    navigate(0);
  };

  return (
    <div className="Error">
      <h1>We're sorry!</h1>
      <p>Something went wrong...</p>
      <Button onClick={handleReset}>Reset</Button>
    </div>
  );
};

const Ready = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/user/sessions");
  };

  const isCompanyUser =
    localStorage.getItem("companyName") &&
    localStorage.getItem("companyName") !== "N/A";

  return (
    <div className="Onboarding-Ready-Container">
      <div className="Onboarding-Ready-Wrapper">
        <div className="container">
          <div className="Ready">
            <h1>Your custom plan is ready!</h1>
            <p>
              Begin your journey to optimal health. Join our movement to make
              every step we walk on this earth a miracle.
            </p>
            <p className="ListTitle">
              {isCompanyUser
                ? "With your corporate account you’ll have:"
                : "Subscribe to enjoy:"}
            </p>
            <ul>
              <li>
                <img src={CheckCircleIcon} alt="Check circle" />
                <div>
                  <h3>Private &amp; Group Sessions</h3>
                  <p>
                    Live online sessions to engage with different practices and
                    new learnings
                  </p>
                </div>
              </li>
              <li>
                <img src={CheckCircleIcon} alt="Check circle" />
                <div>
                  <h3>Personalised Analytics</h3>
                  <p>
                    To design a custom health plan and help you reach your
                    wellbeing goals
                  </p>
                </div>
              </li>
              <li>
                <img src={CheckCircleIcon} alt="Check circle" />
                <div>
                  <h3>Expert Content</h3>
                  <p>
                    A library of recordings, articles and tools to deepen your
                    wellbeing
                  </p>
                </div>
              </li>
            </ul>
            <Button onClick={handleStart}>Start my journey</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CREATE_ONBOARDING = gql`
  mutation CreateOnboarding(
    $studentdetailID: ID!
    $firstName: String!
    $lastName: String!
    $pillarName: String!
    $wellbeingHours: Int
    $injuries: String
    $isPermissionToSendCalendarInvites: Boolean
  ) {
    createOnboarding(
      input: {
        studentdetailID: $studentdetailID
        firstName: $firstName
        lastName: $lastName
        pillarName: $pillarName
        wellbeingHours: $wellbeingHours
        injuries: $injuries
        isPermissionToSendCalendarInvites: $isPermissionToSendCalendarInvites
      }
    ) {
      ok
      onboarding {
        firstName
        lastName
        plans {
          name
          displayPhrase
        }
      }
      studentDetail {
        userdetailObj {
          userObj {
            id
            firstName
            lastName
            username
            email
          }
          photo
          role {
            id
            name
          }
          studentdetail {
            id
            availableCredits
            isSubscribed
            subscriptionExipiryDate
            location {
              id
              name
            }
            company {
              id
              name
            }
            plans {
              id
              name
              displayPhrase
            }
            pillar {
              name
              displayPhrase
            }
            onboarding {
              id
            }
          }
          teacherdetail {
            id
          }
        }
      }
    }
  }
`;

const steps = [
  {
    component: Welcome,
    route: "/onboard",
    title: "Onboard",
  },
  {
    component: UserDetails,
    route: "/onboard/details",
    title: "Details - Onboard",
  },
  {
    component: Pillar,
    route: "/onboard/pillar",
    title: "Pillar - Onboard",
  },
  {
    component: Hours,
    route: "/onboard/hours",
    title: "Hours - Onboard",
  },
  {
    component: Injuries,
    route: "/onboard/injuries",
    title: "Injuries - Onboard",
  },
  {
    component: CalendarInvites,
    route: "/onboard/calendar-invites",
    title: "Calendar Invites - Onboard",
  },
];

const getStepIndex = (location) => {
  const pathname = location.pathname.replace(/\/$/, "");
  let stepIndex = steps.findIndex((step) => step.route === pathname);

  if (stepIndex === -1) {
    stepIndex = 0;
  }

  return stepIndex;
};

const initOnboarding = () => {
  const onboarding = {
    firstName: null,
    lastName: null,
    pillarName: null,
    wellbeingHours: null,
    injuries: null,
  };

  const onboardingSnapshot = localStorage.getItem("onboarding");
  if (onboardingSnapshot) {
    try {
      return {
        ...onboarding,
        ...JSON.parse(onboardingSnapshot),
      };
    } catch (err) {
      console.error("Could not parse onboardingSnapshot due to", err);
    }
  }

  return onboarding;
};

const Onboard = () => {
  // TODO: There's a bug here. Pages shouldn't render twice
  const navigate = useNavigate();
  const location = useLocation();

  const { handleUser } = useAuth();

  const [preparing, setPreparing] = useState(false);

  const studentdetailID = localStorage.getItem("studentID");

  const [createOnboarding, { data, loading, error }] =
    useMutation(CREATE_ONBOARDING);

  const { data: { pillarList } = {}, error: pillarListError } =
    useQuery(PILLAR_LIST);

  const [onboarding, setOnboarding] = useState(initOnboarding);

  const onBoardRef = useRef();

  const [stepIndex, setStepIndex] = useState(() => getStepIndex(location));

  useEffect(() => {
    localStorage.setItem("onboarding", JSON.stringify(onboarding));
  }, [onboarding]);

  useEffect(() => setStepIndex(getStepIndex(location)), [location]);

  useEffect(() => {
    if (loading) {
      setPreparing(true);
    }
  }, [loading]);

  const handleNext = () => {
    const nextIndex = stepIndex + 1;
    if (nextIndex >= steps.length) {
      throw new Error("No next step");
    }

    navigate(steps[nextIndex].route);
  };

  const handleReady = () => {
    setPreparing(false);
  };

  const handleData = (newData) => {
    onBoardRef.current = newData;
    setOnboarding({
      ...onboarding,
      ...newData,
    });
  };

  const handleCreateOnboarding = () => {
    if (!onboarding.firstName || !onboarding.lastName) {
      navigate("/onboard/details");
      return;
    } else if (onboarding.pillarName == null) {
      navigate("/onboard/pillar");
      return;
    }

    return createOnboarding({
      variables: {
        studentdetailID: studentdetailID,
        firstName: onboarding.firstName,
        lastName: onboarding.lastName,
        pillarName: onboarding.pillarName,
        wellbeingHours: parseInt(onboarding.wellbeingHours),
        injuries: onboarding.injuries,
        isPermissionToSendCalendarInvites:
          onBoardRef.current.isPermissionToSendCalendarInvites,
      },
    })
      .then((res) => {
        const {
          createOnboarding: {
            studentDetail: { userdetailObj },
          },
        } = res.data;

        const user = {
          id: userdetailObj.userObj.id,
          firstName: userdetailObj.userObj.firstName,
          lastName: userdetailObj.userObj.lastName,
          username: userdetailObj.userObj.username,
          email: userdetailObj.userObj.email,
          userdetail: userdetailObj,
        };

        const companyName =
          user.userdetail?.studentdetail?.company?.name || "NA";

        logAnalyticsEvent("onboarding_complete", {
          user_id: user.id,
          user_id_wone: user.id,
          company_name: companyName,
        });

        localStorage.removeItem("shouldOnboard");
        localStorage.removeItem("onboarding");

        handleUser(user);
      })
      .catch((error) => console.log("createOnboarding error:", error));
  };

  const handleStartJourney = () => {
    navigate("/user/sessions");
  };

  if (loading || preparing) {
    window.history.pushState("", "", "/onboard/preparing");
    return (
      <Page title="Preparing - Onboard">
        <BackgroundWrapper>
          <Preparing onReady={handleReady} />
        </BackgroundWrapper>
      </Page>
    );
  } else if (error || pillarListError) {
    window.history.pushState("", "", "/onboard/error");
    return (
      <Page title="Error - Onboard">
        <BackgroundWrapper>
          <ErrorPage />
        </BackgroundWrapper>
      </Page>
    );
  } else if (data) {
    window.history.pushState("", "", "/onboard/ready");
    return (
      <Page title="Ready - Onboard">
        <Ready />
      </Page>
    );
  } else if (!localStorage.getItem("shouldOnboard")) {
    return <Navigate to={{ pathname: "/" }} />;
  }

  const maxStep = steps.length - 1;

  return (
    <BackgroundWrapper>
      <StepperProgress
        step={stepIndex}
        maxStep={maxStep}
        hide={stepIndex === 0}
      />
      <Routes>
        <Route exact path={steps[0].route}>
          <Page title={steps[0].title}>
            <Welcome
              data={onboarding}
              onNext={handleNext}
              onData={handleData}
              onCreateOnboarding={handleCreateOnboarding}
              onStartJourney={handleStartJourney}
            />
          </Page>
        </Route>
        <Route exact path={steps[1].route}>
          <Page title={steps[1].title}>
            <UserDetails
              data={onboarding}
              onNext={handleNext}
              onData={handleData}
              onCreateOnboarding={handleCreateOnboarding}
              onStartJourney={handleStartJourney}
            />
          </Page>
        </Route>
        <Route exact path={steps[2].route}>
          <Page title={steps[2].title}>
            <Pillar
              data={onboarding}
              pillarList={pillarList}
              onNext={handleNext}
              onData={handleData}
              onCreateOnboarding={handleCreateOnboarding}
              onStartJourney={handleStartJourney}
            />
          </Page>
        </Route>
        <Route exact path={steps[3].route}>
          <Page title={steps[3].title}>
            <Hours
              data={onboarding}
              onNext={handleNext}
              onData={handleData}
              onCreateOnboarding={handleCreateOnboarding}
              onStartJourney={handleStartJourney}
            />
          </Page>
        </Route>
        <Route exact path={steps[4].route}>
          <Page title={steps[4].title}>
            <Injuries
              data={onboarding}
              onNext={handleNext}
              onData={handleData}
              onCreateOnboarding={handleCreateOnboarding}
              onStartJourney={handleStartJourney}
            />
          </Page>
        </Route>
        <Route exact path={steps[5].route}>
          <Page title={steps[5].title}>
            <CalendarInvites
              data={onboarding}
              onNext={handleNext}
              onData={handleData}
              onCreateOnboarding={handleCreateOnboarding}
              onStartJourney={handleStartJourney}
            />
          </Page>
        </Route>
        <Navigate to="/onboard" />
      </Routes>
    </BackgroundWrapper>
  );
};

export default Onboard;

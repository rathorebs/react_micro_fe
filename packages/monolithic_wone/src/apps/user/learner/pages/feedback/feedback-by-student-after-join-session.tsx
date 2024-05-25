import React, { useState, useRef, Fragment } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { LEARNER_SUBMIT_AFTER_GROUP_SESSION_FEEDBACK } from "utility/graphQl/mutation";
import { LEARNER_AFTER_GROUP_SESSION_FEEDBACK_FORM } from "utility/graphQl/query";
import InputRange from "react-input-range";
import { Button } from "apps/user/common/components/button";
import ZigZagIcon from "Assets/icon/biometrics.svg";
import { useNavigate } from "react-router-dom";

import "react-input-range/lib/css/index.css";
import {
  FirstName as InputField,
  Gender as InputSelect,
} from "apps/user/common/components/fields/inputs";
import useQueryParams from "components/commons/hooks/useQueryParams";
import appInfo from "utility/app-info";

import styles from "./feedback.module.scss";
import {
  PageError,
  PageLoading,
} from "apps/user/learner/components/page-container";

interface FeedbackByStudentAfterJoinSessionProps {
  onAfterVideoFeedbackSubmitted: () => void;
  sessionId: string;
  type: "RECORDING" | "LIVE";
  sessionType: string;
}
const FeedbackByStudentAfterJoinSession: React.FC<
  FeedbackByStudentAfterJoinSessionProps
> = ({ onAfterVideoFeedbackSubmitted, sessionId, type }) => {
  const query = useQueryParams();
  const navigate = useNavigate();
  const sessionIdValue = query.get("sessionId") || sessionId;
  const sessionTitle = query.get("sessionTitle");
  const [messageIndex, setMessageIndex] = useState(0);
  const [rangeInputValue, setRangeInputValue] = useState(null);
  const [feedbackInput, setFeedbackInput] = useState("");
  const [feedbackSelectInput, setFeedbackSelectInput] = useState("");
  const feedbackFormData = useRef([]);
  const [skipLoading, setSkipLoading] = useState(false);

  const {
    loading: queryLoading,
    error,
    data,
  } = useQuery(LEARNER_AFTER_GROUP_SESSION_FEEDBACK_FORM, {
    fetchPolicy: "no-cache",
    onError(error) {
      console.error("Error while fetching session feedback form page", error);
    },
    variables: {
      appInfo,
      groupSessionId: sessionIdValue,
    },
  });
  const [submitAfterGroupSessionFeedback, { loading }] = useMutation(
    LEARNER_SUBMIT_AFTER_GROUP_SESSION_FEEDBACK
  );

  document.title = !!sessionTitle
    ? `Feedback - ${sessionTitle} - Sessions`
    : `Feedback`;

  if (queryLoading) {
    return (
      <div className={styles["custom-loader-style"]}>
        <PageLoading />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles["custom-loader-style"]}>
        <PageError />
      </div>
    );
  }

  const { learnerAfterGroupSessionFeedbackForm } = data;

  const handleNext = (id, value) => {
    feedbackFormData.current.push({ id: id, value: value ? value : "" });
    const messagesLength = learnerAfterGroupSessionFeedbackForm.messages.length;

    if (messagesLength > 1) {
      setFeedbackInput("");
      setFeedbackSelectInput("");
      setRangeInputValue(null);
    }
    if (messagesLength - 1 > messageIndex) {
      setMessageIndex((previous) => previous + 1);
    } else {
      submitAfterGroupSessionFeedback({
        variables: {
          appInfo: appInfo,
          groupSessionId: sessionIdValue,
          input: feedbackFormData.current,
          type: type === "RECORDING" ? "RECORDING" : "LIVE",
        },
      }).then((res) => {
        const companyName = localStorage.getItem("companyName");
        if (
          companyName === "Walking on Earth" ||
          companyName === "WONE Friends & Family"
        ) {
          const typeformFeedbackInputJSON = localStorage.getItem(
            "typeformFeedbackInputJSON"
          );
          if (typeformFeedbackInputJSON) {
            const typeformFeedbackInput = JSON.parse(typeformFeedbackInputJSON);
            const urlParams = new URLSearchParams(
              typeformFeedbackInput
            ).toString();
            window.location.href = `https://walkingonearth.typeform.com/to/CvLqfqNq?${urlParams}`;
          }
        } else if (onAfterVideoFeedbackSubmitted) {
          onAfterVideoFeedbackSubmitted();
        } else {
          navigate("/user/schedule");
        }
        localStorage.removeItem("typeformFeedbackInputJSON");
      });
    }
  };
  const handleSkip = () => {
    setSkipLoading(true);
    submitAfterGroupSessionFeedback({
      variables: {
        appInfo: appInfo,
        groupSessionId: sessionIdValue,
        input: feedbackFormData.current,
        type: type === "RECORDING" ? "RECORDING" : "LIVE",
      },
    }).then((res) => {
      const companyName = localStorage.getItem("companyName");
      if (
        companyName === "Walking on Earth" ||
        companyName === "WONE Friends & Family"
      ) {
        const typeformFeedbackInputJSON = localStorage.getItem(
          "typeformFeedbackInputJSON"
        );
        if (typeformFeedbackInputJSON) {
          const typeformFeedbackInput = JSON.parse(typeformFeedbackInputJSON);
          const urlParams = new URLSearchParams(
            typeformFeedbackInput
          ).toString();
          window.location.href = `https://walkingonearth.typeform.com/to/CvLqfqNq?${urlParams}`;
        }
      } else if (onAfterVideoFeedbackSubmitted) {
        onAfterVideoFeedbackSubmitted();
      } else {
        navigate("/user/schedule");
      }
      setSkipLoading(false);
      localStorage.removeItem("typeformFeedbackInputJSON");
    });
  };
  let disable = false;
  if (
    learnerAfterGroupSessionFeedbackForm?.messages[messageIndex].input
      ?.__typename === "RangeInput" &&
    (rangeInputValue === null || rangeInputValue === "") &&
    learnerAfterGroupSessionFeedbackForm?.messages[messageIndex].input.required
  ) {
    disable = true;
  } else if (
    learnerAfterGroupSessionFeedbackForm?.messages[messageIndex].input
      ?.__typename === "TextInput" &&
    feedbackInput === "" &&
    learnerAfterGroupSessionFeedbackForm?.messages[messageIndex].input.required
  ) {
    disable = true;
  } else if (
    learnerAfterGroupSessionFeedbackForm?.messages[messageIndex].input
      ?.__typename === "SelectInput" &&
    feedbackSelectInput === "" &&
    learnerAfterGroupSessionFeedbackForm?.messages[messageIndex].input.required
  ) {
    disable = true;
  }
  return (
    <div>
      {" "}
      <div className={styles["feedback-begin-session"]}>
        <div className={styles["main-container"]}>
          <h1>
            {learnerAfterGroupSessionFeedbackForm?.messages[messageIndex].title}
          </h1>
          {learnerAfterGroupSessionFeedbackForm && (
            <Fragment>
              <div className={styles["feedback-container"]}>
                <div className={styles["feedback-profile-data"]}>
                  <div className={styles["profile-thumb"]}>
                    <img
                      src={
                        learnerAfterGroupSessionFeedbackForm?.messages[
                          messageIndex
                        ].senderAvatarUrl
                      }
                      alt={
                        learnerAfterGroupSessionFeedbackForm?.messages[
                          messageIndex
                        ].senderName
                      }
                    />
                  </div>
                  <div className={styles["profile-desc"]}>
                    <h6>
                      {
                        learnerAfterGroupSessionFeedbackForm?.messages[
                          messageIndex
                        ].senderName
                      }
                    </h6>
                  </div>
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      learnerAfterGroupSessionFeedbackForm?.messages[
                        messageIndex
                      ].textHtml,
                  }}
                />
              </div>
              {learnerAfterGroupSessionFeedbackForm?.messages[messageIndex]
                .input?.__typename === "RangeInput" && (
                <div className={styles["stress-container"]}>
                  <div className={styles["stress-state"]}>
                    <InputRange
                      value={
                        rangeInputValue !== null
                          ? rangeInputValue
                          : learnerAfterGroupSessionFeedbackForm?.messages[
                              messageIndex
                            ].input?.mid
                      }
                      onChange={(value) => setRangeInputValue(value)}
                      minValue={
                        learnerAfterGroupSessionFeedbackForm?.messages[
                          messageIndex
                        ].input?.min
                      }
                      maxValue={
                        learnerAfterGroupSessionFeedbackForm?.messages[
                          messageIndex
                        ].input?.max
                      }
                      step={
                        learnerAfterGroupSessionFeedbackForm?.messages[
                          messageIndex
                        ].input.max?.step
                      }
                      formatLabel={(value) => ``}
                    />

                    <div className={styles["stress-state-label"]}>
                      <span>
                        {
                          learnerAfterGroupSessionFeedbackForm?.messages[
                            messageIndex
                          ].input?.minLabel
                        }
                      </span>
                      <span>
                        {
                          learnerAfterGroupSessionFeedbackForm?.messages[
                            messageIndex
                          ].input?.maxLabel
                        }
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </Fragment>
          )}
        </div>
        <div className={styles["biometrics-button-container"]}>
          <div className={styles["button-container"]}>
            {learnerAfterGroupSessionFeedbackForm?.messages[messageIndex].input
              ?.__typename === "TextInput" && (
              <div className={styles["stress-container"]}>
                {/* Feedback field but having same styling and functionality like FirstName */}
                <InputField
                  data={
                    learnerAfterGroupSessionFeedbackForm?.messages[messageIndex]
                      .input
                  }
                  firstName={feedbackInput}
                  setFirstName={setFeedbackInput}
                  showIcon={false}
                  markRequired={false}
                  InputClassName={styles["feedback-form-input"]}
                  LabelClassName={styles["feedback-form-label"]}
                />
              </div>
            )}

            {learnerAfterGroupSessionFeedbackForm?.messages[messageIndex].input
              ?.__typename === "SelectInput" && (
              <div className={styles["stress-container"]}>
                {/* Feedback Select field but having same styling and functionality like Gender */}
                <InputSelect
                  data={
                    learnerAfterGroupSessionFeedbackForm?.messages[messageIndex]
                      .input
                  }
                  selectGender={feedbackSelectInput}
                  setSelectGender={setFeedbackSelectInput}
                  InputClassName={styles["feedback-form-input"]}
                  LabelClassName={styles["feedback-form-label"]}
                  showIcon={true}
                  showLabel={false}
                  markRequired={false}
                  floating={false}
                />
              </div>
            )}
            {learnerAfterGroupSessionFeedbackForm?.biometricsBubble && (
              <div className={styles["session-biometric"]}>
                <div className={styles["biometric-header"]}>
                  <img src={ZigZagIcon} alt={"icon"} />
                  <h2 className={styles["label"]}>
                    {
                      learnerAfterGroupSessionFeedbackForm?.biometricsBubble
                        ?.title
                    }
                  </h2>
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      learnerAfterGroupSessionFeedbackForm?.biometricsBubble
                        ?.contentHtml,
                  }}
                />
              </div>
            )}
            <div className={styles["button-container"]}>
              <Button
                variant="primary"
                type="submit"
                className="w-100"
                loading={!skipLoading && loading}
                disabled={disable}
                onClick={() =>
                  handleNext(
                    learnerAfterGroupSessionFeedbackForm?.messages[messageIndex]
                      .input.id,
                    feedbackInput || feedbackSelectInput || rangeInputValue
                  )
                }
              >
                {
                  learnerAfterGroupSessionFeedbackForm?.messages[messageIndex]
                    .buttonText
                }
              </Button>
              {learnerAfterGroupSessionFeedbackForm?.messages[messageIndex]
                .skipButtonText && (
                <Button
                  variant="secondary"
                  type="submit"
                  className="w-100"
                  loading={skipLoading && loading}
                  //disabled={disable}
                  onClick={() => handleSkip()}
                >
                  {
                    learnerAfterGroupSessionFeedbackForm?.messages[messageIndex]
                      .skipButtonText
                  }
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackByStudentAfterJoinSession;

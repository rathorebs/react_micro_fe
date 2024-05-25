import React, { Fragment, useRef, useState } from "react";
import InputRange from "react-input-range";
import { Button } from "apps/user/common/components/button";
import ZigZagIcon from "Assets/icon/biometrics.svg";
import "react-input-range/lib/css/index.css";
import {
  FirstName as InputField,
  Gender as InputSelect,
} from "apps/user/common/components/fields/inputs";
import { LEARNER_SUBMIT_BEFORE_GROUP_SESSION_FEEDBACK } from "utility/graphQl/mutation";
import { LEARNER_BEFORE_GROUP_SESSION_FEEDBACK_FORM } from "utility/graphQl/query";
import { useMutation, useQuery } from "@apollo/client";
import appInfo from "utility/app-info";
import styles from "./feedback.module.scss";
interface FeedbackByStudentBeforeVideoProps {
  onBeforeVideoFeedbackSubmitted?: () => void;
  handleVideoCall?: () => void;
  sessionId: string;
  type?: "RECORDING" | "LIVE";
  sessionType?: string;
  learnerBeforeGroupSessionFeedbackForm?: any;
}
const FeedbackByStudentBeforeVideo: React.FC<
  FeedbackByStudentBeforeVideoProps
> = ({
  onBeforeVideoFeedbackSubmitted,
  sessionId,
  type,
  learnerBeforeGroupSessionFeedbackForm,
  handleVideoCall,
}) => {
  // const { sessionId } = props;
  const [messageIndex, setMessageIndex] = useState(0);
  const [rangeInputValue, setRangeInputValue] = useState(null);
  const [feedbackInput, setFeedbackInput] = useState("");
  const [feedbackSelectInput, setFeedbackSelectInput] = useState("");
  const [skipLoading, setSkipLoading] = useState(false);
  const [
    learnerBeforeGroupSessionFeedback,
    setLearnerBeforeGroupSessionFeedback,
  ] = useState(learnerBeforeGroupSessionFeedbackForm);
  const feedbackFormData = useRef([]);
  const [submitBeforeGroupSessionFeedback, { loading }] = useMutation(
    LEARNER_SUBMIT_BEFORE_GROUP_SESSION_FEEDBACK
  );

  useQuery(LEARNER_BEFORE_GROUP_SESSION_FEEDBACK_FORM, {
    fetchPolicy: "no-cache",
    onCompleted(response) {
      setLearnerBeforeGroupSessionFeedback(
        response?.learnerBeforeGroupSessionFeedbackForm
      );
    },
    onError(error) {
      console.error(
        "Error while fetching learner before group session feedback form",
        error
      );
    },
    variables: {
      appInfo: appInfo,
      groupSessionId: sessionId,
    },
  });

  const handleNext = (id, value) => {
    feedbackFormData.current.push({ id: id, value: value ? value : "" });
    const messagesLength = learnerBeforeGroupSessionFeedback?.messages.length;
    if (messagesLength > 1) {
      setFeedbackInput("");
      setFeedbackSelectInput("");
      setRangeInputValue(null);
    }

    if (messagesLength - 1 > messageIndex) {
      setMessageIndex((previous) => previous + 1);
    } else {
      submitBeforeGroupSessionFeedback({
        variables: {
          appInfo: appInfo,
          groupSessionId: sessionId,
          input: feedbackFormData.current,
          type: type === "RECORDING" ? "RECORDING" : "LIVE",
        },
      }).then((res) => {
        if (handleVideoCall) {
          handleVideoCall();
        }
        if (onBeforeVideoFeedbackSubmitted) {
          onBeforeVideoFeedbackSubmitted();
        }
        localStorage.setItem("isBeforeSessionFeedbackSubmitted", "true");
      });
    }
  };

  const handleSkip = () => {
    setSkipLoading(true);
    submitBeforeGroupSessionFeedback({
      variables: {
        appInfo: appInfo,
        groupSessionId: sessionId,
        input: feedbackFormData.current,
        type: type === "RECORDING" ? "RECORDING" : "LIVE",
      },
    }).then((res) => {
      if (handleVideoCall) {
        handleVideoCall();
      }
      if (onBeforeVideoFeedbackSubmitted) {
        onBeforeVideoFeedbackSubmitted();
      }
      setSkipLoading(false);
      localStorage.setItem("isBeforeSessionFeedbackSubmitted", "true");
    });
  };

  let disable = false;
  if (
    learnerBeforeGroupSessionFeedback?.messages[messageIndex].input
      ?.__typename === "RangeInput" &&
    (rangeInputValue === null || rangeInputValue === "") &&
    learnerBeforeGroupSessionFeedback?.messages[messageIndex].input.required
  ) {
    disable = true;
  } else if (
    learnerBeforeGroupSessionFeedback?.messages[messageIndex].input
      ?.__typename === "TextInput" &&
    feedbackInput === "" &&
    learnerBeforeGroupSessionFeedback?.messages[messageIndex].input.required
  ) {
    disable = true;
  } else if (
    learnerBeforeGroupSessionFeedback?.messages[messageIndex].input
      ?.__typename === "SelectInput" &&
    feedbackSelectInput === "" &&
    learnerBeforeGroupSessionFeedback?.messages[messageIndex].input.required
  ) {
    disable = true;
  }
  return (
    <div>
      <div className={styles["feedback-begin-session"]}>
        <div className={styles["main-container"]}>
          <h1>
            {learnerBeforeGroupSessionFeedback?.messages[messageIndex].title}
          </h1>
          {learnerBeforeGroupSessionFeedback && (
            <Fragment>
              <div className={styles["feedback-container"]}>
                <div className={styles["feedback-profile-data"]}>
                  <div className={styles["profile-thumb"]}>
                    <img
                      src={
                        learnerBeforeGroupSessionFeedback?.messages[
                          messageIndex
                        ].senderAvatarUrl
                      }
                      alt={
                        learnerBeforeGroupSessionFeedback?.messages[
                          messageIndex
                        ].senderName
                      }
                    />
                  </div>
                  <div className={styles["profile-desc"]}>
                    <h6>
                      {
                        learnerBeforeGroupSessionFeedback?.messages[
                          messageIndex
                        ].senderName
                      }
                    </h6>
                  </div>
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      learnerBeforeGroupSessionFeedback?.messages[messageIndex]
                        .textHtml,
                  }}
                />
              </div>
              {learnerBeforeGroupSessionFeedback?.messages[messageIndex].input
                ?.__typename === "RangeInput" && (
                <div className={styles["stress-container"]}>
                  <div className={styles["stress-state"]}>
                    <InputRange
                      value={
                        rangeInputValue !== null
                          ? rangeInputValue
                          : learnerBeforeGroupSessionFeedback?.messages[
                              messageIndex
                            ].input?.mid
                      }
                      onChange={(value) => setRangeInputValue(value)}
                      minValue={
                        learnerBeforeGroupSessionFeedback?.messages[
                          messageIndex
                        ].input?.min
                      }
                      maxValue={
                        learnerBeforeGroupSessionFeedback?.messages[
                          messageIndex
                        ].input?.max
                      }
                      step={
                        learnerBeforeGroupSessionFeedback?.messages[
                          messageIndex
                        ].input.max?.step
                      }
                      formatLabel={(value) => ``}
                    />

                    <div className={styles["stress-state-label"]}>
                      <span>
                        {
                          learnerBeforeGroupSessionFeedback?.messages[
                            messageIndex
                          ].input?.minLabel
                        }
                      </span>
                      <span>
                        {
                          learnerBeforeGroupSessionFeedback?.messages[
                            messageIndex
                          ].input?.maxLabel
                        }
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {learnerBeforeGroupSessionFeedback?.messages[messageIndex].input
                ?.__typename === "TextInput" && (
                <div className={styles["stress-container"]}>
                  {/* Feedback field but having same styling and functionality like FirstName */}
                  <InputField
                    data={
                      learnerBeforeGroupSessionFeedback?.messages[messageIndex]
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

              {learnerBeforeGroupSessionFeedback?.messages[messageIndex].input
                ?.__typename === "SelectInput" && (
                <div className={styles["stress-container"]}>
                  {/* Feedback Select field but having same styling and functionality like Gender */}
                  <InputSelect
                    data={
                      learnerBeforeGroupSessionFeedback?.messages[messageIndex]
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
            </Fragment>
          )}
        </div>
        <div className={styles["biometrics-button-container"]}>
          {learnerBeforeGroupSessionFeedback?.biometricsBubble && (
            <div className={styles["session-biometric"]}>
              <div className={styles["biometric-header"]}>
                <img src={ZigZagIcon} alt={"icon"} />
                <h2 className={styles["label"]}>
                  {learnerBeforeGroupSessionFeedback?.biometricsBubble?.title}
                </h2>
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    learnerBeforeGroupSessionFeedback?.biometricsBubble
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
                  learnerBeforeGroupSessionFeedback?.messages[messageIndex]
                    .input.id,
                  feedbackInput || feedbackSelectInput || rangeInputValue
                )
              }
            >
              {
                learnerBeforeGroupSessionFeedback?.messages[messageIndex]
                  .buttonText
              }
            </Button>

            {learnerBeforeGroupSessionFeedback?.messages[messageIndex]
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
                  learnerBeforeGroupSessionFeedback?.messages[messageIndex]
                    .skipButtonText
                }
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackByStudentBeforeVideo;

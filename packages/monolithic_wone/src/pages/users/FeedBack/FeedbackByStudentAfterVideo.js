import React, { useState } from "react";
import extremeHappy from "../../../Assets/extremeHappy.svg";
import happy from "../../../Assets/happy.svg";
import neutral from "../../../Assets/neutral.svg";
import sad from "../../../Assets/sad.svg";
import extremeSad from "../../../Assets/extremeSad.svg";
import ZigZagIcon from "Assets/icon/biometrics.svg";

const EMOJI_ARR = [extremeSad, sad, neutral, happy, extremeHappy];
const FeedbackByStudentAfterVideo = ({
  dataCRL,
  setButtonDisabled,
  handleVideoCallThird,
  setMoodAfterFeedback,
  isFeedbackByStudentAfterVideo,
  onAfterVideoFeedbackSubmitted,
}) => {
  const [emojis, setEmoji] = useState(EMOJI_ARR);
  const [isNext, setisNext] = useState(false);
  const [expectations, setexpectations] = useState([]);

  const handleEmojiClick = (item, index) => {
    const _arr = !isNext ? [item] : EMOJI_ARR;
    setexpectations(dataCRL?.classRatingList);
    setEmoji(_arr);
    setisNext(!isNext);
    setMoodAfterFeedback(index + 1);
    setButtonDisabled(isNext);
  };

  const handleExpectationsClick = (item) => {
    setexpectations([item]);
    handleVideoCallThird(item.id, item.name);
  };

  const showBiometricsBubble = localStorage.getItem("showBiometricsBubble");

  return (
    <>
      {!onAfterVideoFeedbackSubmitted && showBiometricsBubble === "true" && (
        <div className="session-biometric">
          <div className="biometric-header">
            <img src={ZigZagIcon} alt={"icon"} />
            <h2 className="label">We are analysing your heart rate</h2>
          </div>
          <p>
            You'll see your heart rate readings from the session on the track
            screen shortly
          </p>
        </div>
      )}
      <div className="d-flex align-items-end message-box">
        <div className="FeedbackByStudentAvatar" />
        <div className="FeedbackByStudentAfterVideo-teacher-message">
          <p>
            Well done for prioritising your wellbeing today. Close your eyes and
            take a deep breath. Listen to your body.
            <strong className="d-block">How are you feeling now?</strong>
          </p>
        </div>
      </div>
      {
        <div className="FeedbackByStudentAfterVideo-student-emoji">
          {emojis &&
            emojis.map((item, index) => {
              return (
                <div
                  key={index}
                  className="moods-emoji"
                  onClick={() => handleEmojiClick(item, index)}
                >
                  <img src={item} alt="" />
                </div>
              );
            })}
        </div>
      }
      {(isNext || !isFeedbackByStudentAfterVideo) && (
        //isNext &&
        <>
          <div className="d-flex align-items-end message-box">
            <div className="FeedbackByStudentAvatar" />
            <div className="FeedbackByStudentAfterVideo-teacher-message">
              <p>
                Thanks for letting me know!{" "}
                <strong>How did you find your class?</strong>
              </p>
            </div>
          </div>
          {!!isFeedbackByStudentAfterVideo && (
            <div className="FeedbackByStudentAfterVideo-student-expectations">
              {expectations &&
                expectations.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={`expectations`}
                      onClick={() => handleExpectationsClick(item)}
                    >
                      {item.name}
                    </div>
                  );
                })}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default FeedbackByStudentAfterVideo;

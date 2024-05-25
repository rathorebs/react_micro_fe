import React, { useLayoutEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LEARNER_UPDATE_HOURS_PER_WEEK } from "utility/graphQl/mutation";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button } from "apps/user/common/components/button";
import appInfo from "utility/app-info";
import IncrementIcon from "Assets/incrementbutton.svg";
import DecrementIcon from "Assets/decrementbutton.svg";
import styles from "./styles.module.scss";

interface WeeklyGoalModalProps {
  isOpen?: boolean;
  goalValue?: number;
  goalData?: {
    value: number;
    input: {
      label: string;
      max: number;
      min: number;
    };
  };
  onClick?: () => void;
  setGoalValue?: (value) => void;
  setMinValue?: (value) => void;
  setMaxValue?: (value) => void;
  setProgressValue?: (value) => void;
}

const WeeklyGoalModal = ({
  isOpen,
  goalData,
  onClick,
  goalValue,
  setGoalValue,
  setMinValue,
  setMaxValue,
  setProgressValue,
}: WeeklyGoalModalProps) => {
  const [hours, setHours] = useState(null);
  const [goalSet, { loading }] = useMutation(LEARNER_UPDATE_HOURS_PER_WEEK);

  useLayoutEffect(() => {
    if (isOpen) {
      setHours(goalValue);
    }
  }, [isOpen, goalValue]);

  const handleHours = (type) => {
    if (type === "increment") {
      if (hours < goalData.input.max && hours >= goalData.input.min) {
        setHours((prev) => prev + 1);
      }
    } else {
      if (hours <= goalData.input.max && hours > goalData.input.min) {
        setHours((prev) => prev - 1);
      }
    }
  };

  const handleGoal = () => {
    goalSet({
      variables: {
        value: hours,
        appInfo,
      },
    })
      .then((res) => {
        const data =
          res.data.learnerUpdateHoursPerWeek.learner.screens.profile.goals
            .hoursPerWeek;
        setGoalValue(data.value);
        setMinValue(data.minValue);
        setMaxValue(data.maxValue);
        setProgressValue(data.progressValue);
        onClick();
      })
      .catch((err) => {
        console.error(err, "Error while set weekly goal");
      });
  };

  return (
    <Modal
      className={styles["weekly-goal-modal"]}
      contentClassName={styles["weekly-goal-modal-content"]}
      isOpen={isOpen}
      toggle={onClick}
    >
      <ModalHeader
        className={styles["weekly-goal-modal-header"]}
        toggle={onClick}
      >
        {goalData?.input?.label}
      </ModalHeader>
      <ModalBody>
        <div className={styles["weekly-goal-modal-content"]}>
          <div className={styles["decrement-button"]}>
            <img
              onClick={() => handleHours("decrement")}
              src={DecrementIcon}
              alt="decrement-icon"
            />
          </div>
          <div className={styles["value"]}>
            <h1>{hours}</h1>
            <p>hours</p>
          </div>
          <div className={styles["increment-button"]}>
            <img
              onClick={() => handleHours("increment")}
              src={IncrementIcon}
              alt="increment-icon"
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter className={styles["modal-footer"]}>
        <Button loading={loading} disabled={loading} onClick={handleGoal}>
          Set goal
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default WeeklyGoalModal;

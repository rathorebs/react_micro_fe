import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Button } from "apps/user/common/components/button";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import { useAuth } from "providers/auth";
import styles from "./take-a-breath.module.scss";

interface TakeABreathProps {
  refetchLearnerScreenIndex: () => void;
}

const TakeABreath = ({ refetchLearnerScreenIndex }: TakeABreathProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const { learner, refetchLearner } = useAuth();
  const breathData = learner?.screens?.index?.exercise;

  const handleToggle = () => {
    setIsOpen(false);
    refetchLearner();
    refetchLearnerScreenIndex();
  };

  return (
    <Modal
      className={styles["take-breath-modal"]}
      contentClassName={styles["take-breath-modal-content"]}
      isOpen={breathData && isOpen}
      style={{ width: "auto", maxWidth: "342px" }}
    >
      <ModalHeader
        className={styles["header"]}
        toggle={handleToggle}
      ></ModalHeader>
      <ModalBody className={styles["content-body"]}>
        <div className={styles["content"]}>
          <p className={styles["title"]}>{breathData?.title}</p>
          <p className={styles["sub-title"]}>{breathData?.subTitle}</p>
          <div className={styles["video-container"]}>
            <Video
              className={"take-a-breath-video"}
              autoPlay={false}
              muted={false}
              controls={["PlayPause", "Seek", "Time", "Volume", "Fullscreen"]}
              poster={breathData?.videoThumbnailUrl}
            >
              <source src={breathData?.videoUrl} type="video/mp4" />
            </Video>
          </div>
        </div>
      </ModalBody>
      <ModalFooter className={styles["modal-footer"]}>
        <div className={styles["footer"]}>
          <Button onClick={handleToggle} variant="primary">
            {breathData?.buttonText}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default TakeABreath;

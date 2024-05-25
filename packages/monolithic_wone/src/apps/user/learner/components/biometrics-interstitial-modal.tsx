import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import InterstitialCardImage from "Assets/interstitial-card.png";
import { Button } from "apps/user/common/components/button";
import appInfo from "utility/app-info";
import { useMutation } from "@apollo/client";
import {
  LEARNER_BIOMETRICS_MODAL_DONT_ASK_AGAIN,
  LEARNER_BIOMETRICS_MODAL_TELL_ME_MORE,
  LEARNER_BIOMETRICS_MODAL_REMIND_ME_LATER,
} from "utility/graphQl/mutation";
import { useAuth } from "providers/auth";

import styles from "./biometrics-interstitial-modal.module.scss";

interface BiometricsInterstitialModalProps {
  setBiometricsConnectDeviceModalOpen: (value) => void;
}

const BiometricsInterstitialModal = ({
  setBiometricsConnectDeviceModalOpen,
}: BiometricsInterstitialModalProps) => {
  const { learner } = useAuth();
  const { modal } = learner?.biometrics;
  const [errorMessage, setErrorMessage] = useState(null);
  const [dontAskAgain] = useMutation(LEARNER_BIOMETRICS_MODAL_DONT_ASK_AGAIN);
  const [tellMeMore, { loading: tellMeMoreLoading }] = useMutation(
    LEARNER_BIOMETRICS_MODAL_TELL_ME_MORE
  );
  const [remindMeLater, { loading: remindMeLaterLoading }] = useMutation(
    LEARNER_BIOMETRICS_MODAL_REMIND_ME_LATER
  );

  const handledontAskAgain = () => {
    dontAskAgain({
      variables: {
        appInfo,
      },
    }).catch((error) => {
      setErrorMessage("Sorry, something went wrong. Please try again");
      console.error(
        error,
        "Error while calling learner-biometrics-modal-dont-ask-again"
      );
    });
  };

  const handleTellMeMore = () => {
    tellMeMore({
      variables: {
        appInfo,
      },
    })
      .then((res) => {
        setBiometricsConnectDeviceModalOpen(true);
      })
      .catch((error) => {
        setErrorMessage("Sorry, something went wrong. Please try again");
        console.error(
          error,
          "Error while calling learner-biometrics-modal-remind-me-later"
        );
      });
  };

  const handleRemindMeLater = () => {
    remindMeLater({
      variables: {
        appInfo,
      },
    }).catch((error) => {
      setErrorMessage("Sorry, something went wrong. Please try again");
      console.error(
        error,
        "Error while calling learner-biometrics-modal-remind-me-later"
      );
    });
  };

  return (
    <Modal
      className={styles["interstitial-modal"]}
      contentClassName={styles["interstitial-modal-content"]}
      isOpen={learner.biometrics.modal}
      style={{ width: "auto", maxWidth: "358px" }}
    >
      <ModalHeader
        className={styles["header"]}
        toggle={handledontAskAgain}
      ></ModalHeader>
      <ModalBody className={styles["content-body"]}>
        <div className={styles["content"]}>
          <h1 className={styles["title"]}>{modal.title}</h1>
          <p
            className={styles["sub-title"]}
            dangerouslySetInnerHTML={{ __html: modal.contentHtml }}
          />
          <div>
            <img
              className={styles["image"]}
              src={InterstitialCardImage}
              alt="intertitials-card"
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter className={styles["modal-footer"]}>
        {errorMessage && (
          <p className={styles["error-message"]}>{errorMessage}</p>
        )}
        <div className={styles["footer"]}>
          <Button onClick={handleTellMeMore} loading={tellMeMoreLoading}>
            {modal.tellMeMoreButtonText}
          </Button>
          <Button
            onClick={handleRemindMeLater}
            loading={remindMeLaterLoading}
            className={styles["remind-later"]}
            variant="secondary"
          >
            {modal.remindMeLaterButtonText}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default BiometricsInterstitialModal;

import React, { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import Tile from "components/tile";
import BiometricIcon from "Assets/healthMedicineHeartbeatHeart.svg";
import BiometricsDeviceConnectionModal from "./biometrics-device-connection-modal";
import { LearnerBiometricsHowItWorks } from "apps/user/learner/api/types";
import { Button } from "apps/user/common/components/button";

import styles from "./styles.module.scss";

interface HowItWorksProps {
  howItWorks: LearnerBiometricsHowItWorks;
}

const HowItWorks = ({ howItWorks }: HowItWorksProps) => {
  const [open, setOpen] = useState("");
  const [isOpenBiometrics, setIsOpenBiometrics] = useState(false);

  const toggle = (id?: string) => {
    if (open === id) {
      setOpen("");
    } else {
      setOpen(id);
    }
  };

  const { title, headingTitle, headingContentHtml, sections, callToAction } =
    howItWorks;

  return (
    <div className={styles["how-it-works"]}>
      <h2 className={styles["title"]}>{title}</h2>
      <div className={styles["content"]}>
        <div className={styles["header"]}>
          <h1 className={styles["heading"]}>{headingTitle}</h1>
          <div
            className={styles["sub-heading"]}
            dangerouslySetInnerHTML={{
              __html: headingContentHtml,
            }}
          />
        </div>
        {callToAction && (
          <div className={styles["connect-button"]}>
            <Tile>
              <img src={BiometricIcon} alt="biometric-icon" />
              <p>{callToAction.title}</p>
              <Button onClick={() => setIsOpenBiometrics(true)} loading={false}>
                {callToAction.buttonText}
              </Button>
            </Tile>
          </div>
        )}

        <div className={styles["sections"]}>
          {sections.map((item) => {
            return (
              <div className={styles["sections-item"]} key={item.title}>
                <p className={styles["title"]}>{item.title}</p>
                <div>
                  <Accordion
                    flush
                    open={open}
                    {...{
                      toggle: toggle,
                    }}
                    className={styles["accordion-main"]}
                  >
                    {item.items.map((ele, index) => {
                      return (
                        <AccordionItem key={ele.title + index}>
                          <AccordionHeader
                            targetId={ele.title + index}
                            className={styles["accordion-header"]}
                          >
                            {ele.title}
                          </AccordionHeader>
                          <AccordionBody
                            accordionId={ele.title + index}
                            className={styles["accordion-content"]}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: ele.contentHtml,
                              }}
                            />
                          </AccordionBody>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <BiometricsDeviceConnectionModal
        isOpen={isOpenBiometrics}
        setIsOpen={setIsOpenBiometrics}
      />
    </div>
  );
};

export default HowItWorks;

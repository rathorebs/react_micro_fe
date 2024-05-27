import React, { useState } from "react";
import ManageDevicesModal from "./manage-devices-modal";
import {
  LearnerBiometricsProviders,
  LearnerBiometricsProvider,
  LearnerBiometrics,
} from "apps/user/learner/api/types";
import BiometricsDeviceConnectionModal from "./biometrics-device-connection-modal";
import { Button } from "apps/user/common/components/button";

import styles from "./styles.module.scss";
interface DeviceTileProps {
  handleOpen: (value, item) => void;
  data: LearnerBiometricsProvider;
}

interface ManageDevicesProps {
  provider: LearnerBiometricsProviders;
  hasHealthData: LearnerBiometrics["hasHealthData"];
}

const DeviceTile = ({ handleOpen, data }: DeviceTileProps) => {
  return (
    <div className={styles["content"]}>
      <p>{data.name}</p>
      <Button
        loading={false}
        onClick={() => handleOpen("remove-device", data)}
        className={styles["button-remove"]}
      >
        Remove
      </Button>
    </div>
  );
};

const NoConnectedDevice = () => {
  return (
    <div className={styles["no-device"]}>
      <h2>No connected device found</h2>
      <p>
        Link your wearable device with WONE in the app to start tracking
        biometric results
      </p>
    </div>
  );
};

const ManageDevices = ({ provider, hasHealthData }: ManageDevicesProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBiometrics, setIsOpenBiometrics] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleOpen = (value, item) => {
    setModalData({
      type: value,
      item: item,
    });
    setIsOpen(true);
  };

  const { title, providers } = provider;

  return (
    <div className={styles["manage-devices"]}>
      <h1 className={styles["title"]}>{title}</h1>
      <div
        className={
          providers.length > 0
            ? styles["device-container"]
            : styles["no-device-container"]
        }
      >
        {providers.length > 0 ? (
          providers.map((item) => (
            <DeviceTile key={item.id} handleOpen={handleOpen} data={item} />
          ))
        ) : (
          <NoConnectedDevice />
        )}
      </div>
      <div className={styles["footer-buttons"]}>
        <Button
          loading={false}
          variant={providers.length > 0 ? "disabled" : "primary"}
          disabled={providers.length > 0 && true}
          className={styles["source-device"]}
          onClick={() => setIsOpenBiometrics(true)}
        >
          CONNECT DEVICE
        </Button>
        {hasHealthData && (
          <Button
            loading={false}
            variant={"secondary"}
            onClick={() => handleOpen("remove-data", null)}
            className={styles["delete-button"]}
          >
            Delete health data
          </Button>
        )}
      </div>
      <ManageDevicesModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalData={modalData}
        setModalData={setModalData}
      />
      <BiometricsDeviceConnectionModal
        isOpen={isOpenBiometrics}
        setIsOpen={setIsOpenBiometrics}
      />
    </div>
  );
};

export default ManageDevices;

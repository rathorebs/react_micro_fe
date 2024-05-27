import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import constant from "Constant";
import BiometricWearableDevice from "./BiometricWearableDevice";
import BiometricDeviceList from "./BiometricDeviceList";
import BiometricCustomDeviceList from "./BiometricCustomDevice";
import BiometricTellUsMore from "./BiometricTellsUsMore";
import { useAuth } from "providers/auth";
import { VITAL_CREATE_USER } from "utility/graphQl/query";
import "./biometrics.scss";
const VITAL_GET_PROVIDERS = gql`
  query VitalGetProviders($platform: String!) {
    vitalGetProviders(platform: $platform) {
      name
      slug
      description
      logo
      authType
      supportedResources
    }
  }
`;

export const BiometricsConnectDialog = ({ biometricsConnectDialog }) => {
  const [deviceListDialog, setDeviceListDialog] = useState(false);
  const [customDeviceDialog, setCustomDeviceDialog] = useState(false);
  const [tellUsMoreDialog, setTellUsMoreDialog] = useState(false);
  const [wearableDevice, setWearableDevice] = useState(true);
  const [vitalProvidersList, setVitalProvidersList] = useState(null);
  const [vitalData, setVitalData] = useState({});
  const [vitalCreateUser] = useMutation(VITAL_CREATE_USER);
  let { handleUser } = useAuth();
  useQuery(VITAL_GET_PROVIDERS, {
    fetchPolicy: "no-cache",
    onCompleted(response) {
      setVitalProvidersList(response.vitalGetProviders);
    },
    onError(error) {
      console.error("Error while getting the vital providers list", error);
      toast.error(
        `Error while getting the vital providers list ${error.message}`
      );
    },
    variables: {
      platform: constant.APP_PLATFORM,
    },
  });

  const handleDeviceSubmit = (e) => {
    vitalCreateUser({})
      .then((response) => {
        handleUser(response.data.vitalCreateUser.user);
        setDeviceListDialog(true);
        setWearableDevice(false);
      })
      .catch((error) => {
        console.error("Error while creating the vital user", error);
        toast.error(`Error while creating the vital user ${error.message}`);
      });
  };

  const closeDeviceListDialog = () => {
    setDeviceListDialog(false);
  };

  const responseCallback = (response) => {
    setVitalData(response);
  };
  const closeCustomDeviceListDialog = (value) => {
    setCustomDeviceDialog(value);
  };

  const closeTellUsMoreDialog = (value) => {
    setTellUsMoreDialog(value);
  };

  return (
    <>
      {wearableDevice && (
        <BiometricWearableDevice
          biometricsConnectDialog={biometricsConnectDialog}
          handleDeviceSubmit={handleDeviceSubmit}
        />
      )}

      {vitalProvidersList && deviceListDialog && (
        <BiometricDeviceList
          deviceList={vitalProvidersList}
          closeDeviceListDialog={closeDeviceListDialog}
          responseCallback={responseCallback}
          closeTellUsMoreDialog={closeTellUsMoreDialog}
          closeCustomDeviceListDialog={closeCustomDeviceListDialog}
          biometricsConnectDialog={biometricsConnectDialog}
        />
      )}

      {customDeviceDialog && (
        <BiometricCustomDeviceList
          closeCustomDeviceListDialog={closeCustomDeviceListDialog}
          biometricsConnectDialog={biometricsConnectDialog}
        />
      )}
      {tellUsMoreDialog && (
        <BiometricTellUsMore
          biometricsConnectDialog={biometricsConnectDialog}
          vitalData={vitalData}
        />
      )}
    </>
  );
};

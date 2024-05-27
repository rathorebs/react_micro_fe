import React, { useEffect } from "react";
import withRouter, { Router } from "utility/with-router";

import Logo from "Assets/images/wone_logo_thin.svg";
import LogoAzureAd from "Assets/images/azure_ad.png";

import BluePattern from "apps/wone-generator/assets/patterns/blue.json";
import { usePatternBackground } from "providers/pattern-background";

import styles from "./sign-in.module.scss";

export type AutoStoreProps = {
  router: Router;
};

const AutoStore: React.FC<AutoStoreProps> = ({ router: { location } }) => {
  const { onChangeColors } = usePatternBackground();

  useEffect(() => {
    onChangeColors(BluePattern.color.pattern.value);
  }, [onChangeColors]);

  return (
    <div className={styles["auto-store-container"]}>
      <div className={styles["auto-store-child"]}>
        <img src={Logo} alt="WONE Logo" />
        <h3 className={styles["heading"]}>At wone with your health</h3>

        <p className={styles["sub-heading"]}>
          Sign into your Autostore corporate account using your work email to
          access WONE.
        </p>
        <a
          href={process.env.REACT_APP_SIGN_IN_WITH_AZURE_AD_URL}
          className={styles["button-azure-ad"]}
        >
          <img
            src={LogoAzureAd}
            alt="Azure AD Logo"
            className={styles["logo-agure-ad"]}
          />
          <span>Sign in with Azure AD</span>
        </a>
      </div>
    </div>
  );
};

export default withRouter(AutoStore);

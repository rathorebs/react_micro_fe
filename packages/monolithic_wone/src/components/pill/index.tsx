import React from "react";
import clsx from "clsx";
import { Badge } from "reactstrap";

import styles from "./styles.module.scss";
import { PillarLabel } from "apps/user/learner/api/types";

interface PillProps {
  pillarLabel: PillarLabel;
}

export const PillarPill = ({ pillarLabel }: PillProps) => {
  const pillar = (pillarLabel.charAt(0).toUpperCase() +
    pillarLabel.toLowerCase().slice(1)) as "Energy" | "Resilience" | "Activity";

  return (
    <Badge className={clsx(styles["pill"], styles[pillar.toLocaleLowerCase()])}>
      {pillar}
    </Badge>
  );
};

interface ServicePillProps {
  service: string;
}

export const ServicePill = ({ service }: ServicePillProps) => (
  <Badge className={clsx(styles["pill"], styles[service.toLocaleLowerCase()])}>
    {service}
  </Badge>
);

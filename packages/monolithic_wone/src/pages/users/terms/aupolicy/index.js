import React, { useEffect, useState } from "react";
import Terms from "../index";
import AUPolicyPage from "./aupolicy.md";
import "../terms.styles.scss";
const AUPolicy = () => {
  const [policyData, setPolicyData] = useState(null);
  useEffect(() => {
    fetch(AUPolicyPage)
      .then((res) => res.text())
      .then((res) => setPolicyData(res));
  }, []);

  return (
    <Terms>
      <div
        className="aupolicy-container"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: policyData }}
      />
    </Terms>
  );
};

export default AUPolicy;
